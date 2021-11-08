// @flow
import Neon, { rpc, tx, sc, u, api, wallet } from '@cityofzion/neon-js-next'
import { u as ncU, tx as ncTx } from '@cityofzion/neon-core'
import {
  setBlockExpiry,
  addFees,
} from '@cityofzion/neon-js-next/lib/experimental/helpers'
// eslint-disable-next-line
import { JsonRpcRequest, JsonRpcResponse } from '@json-rpc-tools/utils'
import { ContractParam } from '@cityofzion/neon-core/lib/sc'
import { WitnessScope } from '@cityofzion/neon-core/lib/tx/components/WitnessScope'
import { HexString } from '@cityofzion/neon-core/lib/u'
import { Account } from '@cityofzion/neon-core/lib/wallet'

type Signer = {
  scope: WitnessScope,
  allowedContracts?: string[],
  allowedGroups?: string[],
}

type ContractInvocation = {
  scriptHash: string,
  operation: string,
  args: any[],
  abortOnFail?: boolean,
  signer?: Signer,
}
class N3Helper {
  rpcAddress: string

  constructor(rpcAddress: string) {
    this.rpcAddress = rpcAddress
  }

  static getMagicOfRpcAddress = async (rpcAddress: string): Promise<number> => {
    const resp: any = await new rpc.RPCClient(rpcAddress).execute(
      Neon.create.query({
        method: 'getversion',
        params: [],
        id: 1,
        jsonrpc: '2.0',
      }),
    )
    return resp.network
  }

  rpcCall = async (
    account: any,
    request: JsonRpcRequest,
    isHardwareLogin?: boolean,
    signingFunction?: () => void,
    showInfoNotification?: () => void,
    hideNotification?: () => void,
  ): Promise<JsonRpcResponse> => {
    let result: any

    if (request.method === 'invokefunction') {
      if (!account) {
        throw new Error('No account')
      }

      result = await this.multiInvoke(account, request.params)
      // result = await this.contractInvoke(
      //   isHardwareLogin,
      //   signingFunction,
      //   showInfoNotification,
      //   hideNotification,
      //   account,
      //   request.params[0],
      //   request.params[1],
      //   ...N3Helper.getInnerParams(request.params),
      // )
    } else if (request.method === 'testInvoke') {
      result = await this.multiTestInvoke(account, request.params)
    } else {
      const { jsonrpc, ...queryLike } = request
      result = await new rpc.RPCClient(this.rpcAddress).execute(
        Neon.create.query({ ...queryLike, jsonrpc: '2.0' }),
      )
    }

    return {
      id: request.id,
      jsonrpc: '2.0',
      result,
    }
  }

  multiTestInvoke = async (
    account: Account,
    calls: ContractInvocation[],
  ): Promise<any> => {
    const sb = Neon.create.scriptBuilder()

    calls.forEach(c => {
      sb.emitContractCall({
        scriptHash: c.scriptHash,
        operation: c.operation,
        args: N3Helper.convertParams(c.args),
      })

      if (c.abortOnFail) {
        sb.emit(0x39)
      }
    })

    const script = sb.build()
    return new rpc.RPCClient(this.rpcAddress).invokeScript(
      Neon.u.HexString.fromHex(script),
      [N3Helper.buildSigner(account, calls)],
    )
  }

  multiInvoke = async (
    account: Account,
    calls: ContractInvocation[],
  ): Promise<any> => {
    const sb = Neon.create.scriptBuilder()
    const networkMagic = await N3Helper.getMagicOfRpcAddress(this.rpcAddress)

    calls.forEach(c => {
      sb.emitContractCall({
        scriptHash: c.scriptHash,
        operation: c.operation,
        args: N3Helper.convertParams(c.args),
      })

      if (c.abortOnFail) {
        sb.emit(0x39)
      }
    })

    const script = sb.build()

    const rpcClient = new rpc.RPCClient(this.rpcAddress)

    const currentHeight = await rpcClient.getBlockCount()

    const trx = new tx.Transaction({
      script: Neon.u.HexString.fromHex(script),
      validUntilBlock: currentHeight + 100,
      signers: [N3Helper.buildSigner(account, calls)],
    })

    // eslint-disable-next-line
    console.log(trx)

    await Neon.experimental.txHelpers.addFees(trx, {
      rpcAddress: this.rpcAddress,
      networkMagic,
      account,
    })

    trx.sign(account, networkMagic)

    return rpcClient.sendRawTransaction(trx)
  }

  contractInvoke = async (
    isHardwareLogin?: boolean,
    signingFunction?: () => void,
    showInfoNotification?: (*) => void,
    hideNotification?: (*) => void,
    account: any,
    scriptHash: string,
    operation: string,
    ...args: any[]
  ): Promise<any> => {
    const networkMagic = await N3Helper.getMagicOfRpcAddress(this.rpcAddress)
    const contract = new Neon.experimental.SmartContract(
      Neon.u.HexString.fromHex(scriptHash),
      {
        networkMagic,
        rpcAddress: this.rpcAddress,
        account,
      },
    )

    const convertedArgs = N3Helper.convertParams(args)
    try {
      if (isHardwareLogin) {
        const signingConfig = {
          signingCallback: signingFunction,
        }
        const facade = await api.NetworkFacade.fromConfig({
          node: this.rpcAddress,
        })
        const builder = new sc.ScriptBuilder()
        try {
          builder.emitAppCall(
            Neon.u.HexString.fromHex(scriptHash).toString(),
            operation,
            convertedArgs,
          )
        } catch (e) {
          console.error({ e })
        }
        const transaction = new tx.Transaction()
        // add script as neon-core HexString class
        transaction.script = ncU.HexString.fromHex(builder.build())
        await setBlockExpiry(transaction, {
          rpcAddress: this.rpcAddress,
          blocksTillExpiry: 100,
        }).catch(console.error)
        // add signers as neon-core Signer class array
        transaction.signers = [
          new ncTx.Signer({
            account: account.scriptHash,
            scopes: 'CalledByEntry',
          }),
        ]
        transaction.systemFee = 0
        transaction.networkFee = 0
        transaction.witnesses = [
          new ncTx.Witness({
            verificationScript: wallet.getVerificationScriptFromPublicKey(
              account.publicKey,
            ),
            invocationScript: '',
          }),
        ]
        await addFees(transaction, {
          rpcAddress: this.rpcAddress,
          account,
          networkMagic,
        }).catch(console.error)

        // re-add script as neon-js HexString class
        transaction.script = u.HexString.fromHex(builder.build())

        // re-add signers as neon-core Signer class array
        transaction.signers = [
          new tx.Signer({
            account: account.scriptHash,
            scopes: 'CalledByEntry',
          }),
        ]

        let notificationId

        if (showInfoNotification)
          notificationId = showInfoNotification({
            message: 'Please sign the transaction on your hardware device',
            autoDismiss: 0,
          })

        const signedTx = await facade
          .sign(transaction, signingConfig)
          .catch(console.error)

        if (hideNotification && notificationId) hideNotification(notificationId)

        return new rpc.NeoServerRpcClient(this.rpcAddress).sendRawTransaction(
          signedTx,
        )
      }
      return contract.invoke(operation, convertedArgs)
    } catch (e) {
      return N3Helper.convertError(e)
    }
  }

  testInvoke = async (
    scriptHash: string,
    operation: string,
    ...args: any[]
  ): Promise<any> => {
    const networkMagic = await N3Helper.getMagicOfRpcAddress(this.rpcAddress)
    const contract = new Neon.experimental.SmartContract(
      Neon.u.HexString.fromHex(scriptHash),
      {
        networkMagic,
        rpcAddress: this.rpcAddress,
      },
    )

    const convertedArgs = N3Helper.convertParams(args)

    try {
      return await contract.testInvoke(operation, convertedArgs)
    } catch (e) {
      return N3Helper.convertError(e)
    }
  }

  static convertParams(args: any[]): any[] {
    return args.map(
      a =>
        // eslint-disable-next-line
        a.value === undefined
          ? a
          : // eslint-disable-next-line
            a.type === 'Address'
            ? sc.ContractParam.hash160(a.value)
            : // eslint-disable-next-line
              a.type === 'ScriptHash'
              ? sc.ContractParam.hash160(a.value)
              : a.type === 'Array'
                ? sc.ContractParam.array(...N3Helper.convertParams(a.value))
                : a,
    )
  }

  static buildSigner(
    account: Account,
    call: ContractInvocation | ContractInvocation[],
  ) {
    const signer = new tx.Signer({
      account: account.scriptHash,
    })

    if (Array.isArray(call)) {
      signer.scopes = WitnessScope.None
      const allowedContractsSet = new Set()
      const allowedGroupsSet = new Set()
      call.forEach(c => {
        signer.scopes = Math.max(
          signer.scopes,
          (c.signer && c.signer.scope) || WitnessScope.CalledByEntry,
        )
        // eslint-disable-next-line
        c.signer &&
          c.signer.allowedContracts &&
          c.signer.allowedContracts.forEach(ac => {
            allowedContractsSet.add(Neon.u.HexString.fromHex(ac))
          })
        // eslint-disable-next-line
        c.signer &&
          c.signer.allowedGroups &&
          c.signer.allowedGroups.forEach(ac => {
            allowedGroupsSet.add(Neon.u.HexString.fromHex(ac))
          })
      })
      if (allowedContractsSet.size) {
        signer.allowedContracts = Array.from(allowedContractsSet)
      }
      if (allowedGroupsSet.size) {
        signer.allowedGroups = Array.from(allowedGroupsSet)
      }
    } else {
      signer.scopes =
        (call.signer && call.signer.scope) || WitnessScope.CalledByEntry
      if (call.signer && call.signer.allowedContracts) {
        signer.allowedContracts = call.signer.allowedContracts.map(ac =>
          Neon.u.HexString.fromHex(ac),
        )
      }
      if (call.signer && call.signer.allowedGroups) {
        signer.allowedGroups = call.signer.allowedGroups.map(ac =>
          Neon.u.HexString.fromHex(ac),
        )
      }
    }

    return signer
  }

  static getInnerParams(p: any[]) {
    let params: any[] = []
    if (p.length > 2) {
      // eslint-disable-next-line
      params = p[2]
    }
    return params
  }

  static convertError(e: any) {
    return { error: { message: e.message, ...e } }
  }
}

export default N3Helper
