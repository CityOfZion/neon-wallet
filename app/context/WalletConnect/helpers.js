// @flow
import Neon, { rpc, api } from '@cityofzion/neon-js-next'
// eslint-disable-next-line
import { JsonRpcResponse } from '@json-rpc-tools/utils'
import { type SessionRequest } from './WalletConnectContext'
import { NeonInvoker } from '@cityofzion/neon-invoker'
import { NeonSigner } from '@cityofzion/neon-signer'
import { ContractInvocationMulti } from '@cityofzion/neo3-invoker'
import { wallet } from '@cityofzion/neon-core'



class N3Helper {
  rpcAddress: string
  networkMagic: number 
  invoker: NeonInvoker
  signer: NeonSigner
  account: wallet.Account | undefined

  constructor(rpcAddress: string, networkMagic: number, invoker: NeonInvoker, signer: NeonSigner, account?: wallet.Account) {
    this.invoker = invoker
    this.signer = signer
    this.rpcAddress = rpcAddress
    this.networkMagic = networkMagic
    this.account = account
  }

  static init = async (
    rpcAddress: string,
    networkMagic?: number,
    account?: wallet.Account
  ): Promise<N3Helper> => {
    const invoker = await NeonInvoker.init(rpcAddress, account)
    const signer = new NeonSigner(account)

    return new N3Helper(
      rpcAddress,
      networkMagic || (await N3Helper.getMagicOfRpcAddress(rpcAddress)),
      invoker,
      signer,
      account
    )
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
    sessionRequest: SessionRequest,
    isHardwareLogin?: boolean,
    signingFunction?: () => void,
    showInfoNotification?: ({ message: string }) => any,
    hideNotification?: (id: string) => void,
  ): Promise<JsonRpcResponse> => {

    let result: any
    const {
      params: { request },
    } = sessionRequest

    if (this.account === undefined) throw new Error("No Account");
    if (
      request.method === 'multiInvoke' ||
      request.method === 'invokeFunction'
    ) {
      result = await this.multiInvoke(request.params, isHardwareLogin, signingFunction, showInfoNotification, hideNotification)
    }
    if (
      request.method === 'multiTestInvoke' ||
      request.method === 'testInvoke'
    ) {
      result = await this.multiTestInvoke(request.params)
      result.isTest = true
    }
    if (request.method === 'signMessage') {

      result = await this.signer.signMessage(request.params)
    }
    if (request.method === 'verifyMessage') {
      result = await this.signer.verifyMessage(request.params)
    }
    return {
      id: sessionRequest.id,
      jsonrpc: '2.0',
      result,
      isMessage:
        request.method === 'signMessage' || request.method === 'verifyMessage',
    }
  }

  multiTestInvoke = async (
    cim: ContractInvocationMulti,
  ): Promise<any> => {
    if(this.account === undefined) throw new Error("no Account");
    return await this.invoker.testInvoke(cim)
  }

  multiInvoke = async (
    cim: ContractInvocationMulti,
    isHardwareLogin?: boolean,
    signingFunction?: () => void,
    showInfoNotification?: (*) => void,
    hideNotification?: (*) => void,
  ): Promise<any> => {
    if(this.account === undefined) throw new Error("No Account");
    
    if (!isHardwareLogin) {
      return await this.invoker.invokeFunction(cim)
    } else {
      const facade = await api.NetworkFacade.fromConfig({
        node: this.rpcAddress,
      })
      const signingConfig = {
        signingCallback: signingFunction,
      }
      const script = NeonInvoker.buildScriptBuilder(cim)
      const rpcClient = new rpc.RPCClient(this.rpcAddress)
      const currentHeight = await rpcClient.getBlockCount()
      const tx = this.invoker.buildTransaction(
        script,
        currentHeight + 100,
        cim.signers,
      )

      let notificationId
      if (showInfoNotification)
        notificationId = showInfoNotification({
          message: 'Please sign the transaction on your hardware device',
          autoDismiss: 0,
        })

      if (hideNotification && notificationId) hideNotification(notificationId)

      const systemFeeOverride = await this.invoker.overrideNetworkFeeOnTransaction(
        tx,
        this.invoker.rpcConfig,
        cim,
      )
      const networkFeeOverride = await this.invoker.overrideSystemFeeOnTransaction(
        tx,
        this.invoker.rpcConfig,
        cim,
      )

      await NeonInvoker.addFeesToTransaction(tx, {
        ...this.invoker.rpcConfig,
        systemFeeOverride,
        networkFeeOverride
      })

      const signedTrx = await facade.sign(tx, signingConfig)
      return await this.invoker.sendTransaction(signedTrx)
    }
  }
}

export default N3Helper
