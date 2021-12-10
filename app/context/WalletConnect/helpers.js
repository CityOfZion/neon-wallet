// @flow
import Neon, { rpc, tx, sc, u, api, wallet } from '@cityofzion/neon-js-next'
import { u as ncU, tx as ncTx } from '@cityofzion/neon-core'
import {
  setBlockExpiry,
  addFees,
} from '@cityofzion/neon-js-next/lib/experimental/helpers'
// eslint-disable-next-line
import { JsonRpcRequest, JsonRpcResponse } from '@json-rpc-tools/utils'

type WitnessScope = {
  None: 0,
  /**
   * CalledByEntry means that this condition must hold: EntryScriptHash == CallingScriptHash
   * No params is needed, as the witness/permission/signature given on first invocation will automatically expire if entering deeper internal invokes
   * This can be default safe choice for native NEO/GAS (previously used on Neo 2 as "attach" mode)
   */
  CalledByEntry: 1,
  /**
   * Custom hash for contract-specific
   */
  CustomContracts: 16,
  /**
   * Custom pubkey for group members, group can be found in contract manifest
   */
  CustomGroups: 32,
  /**
   * Global allows this witness in all contexts (default Neo2 behavior)
   * This cannot be combined with other flags
   */
  Global: 128,
}

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

type ContractInvocationMulti = {
  signer: Signer[],
  invocations: ContractInvocation[],
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
    return resp.protocol.network
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
    if (request.method === 'multiInvoke' || request.method === 'invoke') {
      result = await this.multiInvoke(account, request.params)
    } else if (
      request.method === 'multiTestInvoke' ||
      request.method === 'testInvoke'
    ) {
      result = await this.multiTestInvoke(account, request.params)
      result.isTest = true
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

  multiTestInvoke = async (
    account: any,
    cim: ContractInvocationMulti,
  ): Promise<any> => {
    const sb = Neon.create.scriptBuilder()

    cim.invocations.forEach(c => {
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
      N3Helper.buildMultipleSigner(account, cim.signer),
    )
  }

  multiInvoke = async (
    account: any,
    cim: ContractInvocationMulti,
  ): Promise<any> => {
    const sb = Neon.create.scriptBuilder()
    const networkMagic = await N3Helper.getMagicOfRpcAddress(this.rpcAddress)

    cim.invocations.forEach(c => {
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
      signers: N3Helper.buildMultipleSigner(account, cim.signer),
    })

    await Neon.experimental.txHelpers.addFees(trx, {
      rpcAddress: this.rpcAddress,
      networkMagic,
      account,
    })

    trx.sign(account, networkMagic)

    return rpcClient.sendRawTransaction(trx)
  }

  static buildSigner(account: any, signerEntry?: Signer) {
    const signer = new tx.Signer({
      account: account.scriptHash,
    })

    signer.scopes = signerEntry && signerEntry.scope
    if (signerEntry && signerEntry.allowedContracts) {
      signer.allowedContracts = signerEntry.allowedContracts.map(ac =>
        Neon.u.HexString.fromHex(ac),
      )
    }
    if (signerEntry && signerEntry.allowedGroups) {
      signer.allowedGroups = signerEntry.allowedGroups.map(ac =>
        Neon.u.HexString.fromHex(ac),
      )
    }

    return signer
  }

  static buildMultipleSigner(account: any, signers: Signer[]) {
    return !signers.length
      ? [N3Helper.buildSigner(account)]
      : // $FlowFixMe
        signers.map(s => N3Helper.buildSigner(account, s))
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

  static convertError(e: any) {
    return { error: { message: e.message, ...e } }
  }
}

export default N3Helper
