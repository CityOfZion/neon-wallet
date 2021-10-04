// @flow
import Neon, { rpc, tx, sc, u, api, wallet } from '@cityofzion/neon-js-next'
import { u as ncU, tx as ncTx } from '@cityofzion/neon-core'
import {
  setBlockExpiry,
  addFees,
} from '@cityofzion/neon-js-next/lib/experimental/helpers'
// eslint-disable-next-line
import { JsonRpcRequest, JsonRpcResponse } from '@json-rpc-tools/utils'

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
  ): Promise<JsonRpcResponse> => {
    let result: any

    if (request.method === 'invokefunction') {
      if (!account) {
        throw new Error('No account')
      }

      result = await this.contractInvoke(
        isHardwareLogin,
        signingFunction,
        account,
        request.params[0],
        request.params[1],
        ...N3Helper.getInnerParams(request.params),
      )
    } else if (request.method === 'testInvoke') {
      result = await this.testInvoke(
        request.params[0],
        request.params[1],
        ...N3Helper.getInnerParams(request.params),
      )
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

        const signedTx = await facade
          .sign(transaction, signingConfig)
          .catch(console.error)

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
