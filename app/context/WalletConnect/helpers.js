// @flow
import Neon, { rpc, sc } from '@cityofzion/neon-js-next'
// eslint-disable-next-line
import { Account } from '@cityofzion/neon-core/lib/wallet'
import { JsonRpcRequest, JsonRpcResponse } from '@json-rpc-tools/utils'

export class N3Helper {
  rpcAddress: string

  constructor(rpcAddress?: string = 'https://testnet1.neo.coz.io:443') {
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
    account: Account,
    request: JsonRpcRequest,
  ): Promise<JsonRpcResponse> => {
    let result: any

    if (request.method === 'invokefunction') {
      if (!account) {
        throw new Error('No account')
      }

      result = await this.contractInvoke(
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
    account: Account,
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
      return await contract.invoke(operation, convertedArgs)
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
              ? sc.ContractParam.hash160(Neon.u.HexString.fromHex(a.value))
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
