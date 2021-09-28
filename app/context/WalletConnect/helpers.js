import Neon, { rpc, sc } from '@cityofzion/neon-js'
import { Account } from '@cityofzion/neon-core/lib/wallet'
import { JsonRpcRequest, JsonRpcResponse } from '@json-rpc-tools/utils'

export class N3Helper {
  constructor(rpcAddress: string, networkMagic: number) {
    this.rpcAddress = rpcAddress
    this.networkMagic = networkMagic
  }

  rpcCall = async (
    account: Account,
    request: JsonRpcRequest,
  ): Promise<JsonRpcResponse> => {
    let result: any
    if (request.method === 'invokefunction') {
      let params: any[] = []
      if (request.params.length > 2) {
        params = request.params[2]
      }
      result = await this.contractInvoke(
        account,
        request.params[0],
        request.params[1],
        ...params,
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

  convertParams = (args: any[]): any[] =>
    args.map(
      a =>
        a.value === undefined
          ? a
          : a.type === 'Address'
            ? sc.ContractParam.hash160(a.value)
            : a.type === 'ScriptHash'
              ? sc.ContractParam.hash160(Neon.u.HexString.fromHex(a.value))
              : a.type === 'Array'
                ? sc.ContractParam.array(...this.convertParams(a.value))
                : a,
    )

  contractInvoke = async (
    account: Account,
    scriptHash: string,
    operation: string,
    ...args: any[]
  ) => {
    const contract = new Neon.experimental.SmartContract(
      Neon.u.HexString.fromHex(scriptHash),
      {
        networkMagic: this.networkMagic,
        rpcAddress: this.rpcAddress,
        account: account,
      },
    )

    const convertedArgs = this.convertParams(args)

    let resp
    try {
      resp = await contract.invoke(operation, convertedArgs)
    } catch (e) {
      console.log(e)
      resp = { error: { message: e.message, ...e } }
    }

    return resp
  }
}
