// @flow
import { u } from '@cityofzion/neon-js'
import Neon, {
  rpc,
  tx,
  sc,
  api,
  wallet,
  u as uNext,
} from '@cityofzion/neon-js-next'
// eslint-disable-next-line
import { JsonRpcRequest, JsonRpcResponse } from '@json-rpc-tools/utils'
import { randomBytes } from 'crypto'
import { type SessionRequest } from './WalletConnectContext'

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
  scopes: WitnessScope,
  allowedContracts?: string[],
  allowedGroups?: string[],
}

type ContractInvocation = {
  scriptHash: string,
  operation: string,
  args: any[],
  abortOnFail?: boolean,
}

export type ContractInvocationMulti = {
  signers: Signer[],
  invocations: ContractInvocation[],
  extraSystemFee?: number,
  systemFeeOverride?: number,
  extraNetworkFee?: number,
  networkFeeOverride?: number,
}

type SignedMessage = {
  publicKey: string,
  data: string,
  salt: string,
  messageHex: string,
}

type SignMessagePayload = {
  message: string,
  version: number,
}

class N3Helper {
  rpcAddress: string

  networkMagic: number

  constructor(rpcAddress: string, networkMagic: number) {
    this.rpcAddress = rpcAddress
    this.networkMagic = networkMagic
  }

  static init = async (
    rpcAddress: string,
    networkMagic?: number,
  ): Promise<N3Helper> =>
    new N3Helper(
      rpcAddress,
      networkMagic || (await N3Helper.getMagicOfRpcAddress(rpcAddress)),
    )

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

    if (
      request.method === 'multiInvoke' ||
      request.method === 'invokeFunction'
    ) {
      result = await this.multiInvoke(
        account,
        request.params,
        isHardwareLogin,
        signingFunction,
        showInfoNotification,
        hideNotification,
      )
    }
    if (
      request.method === 'multiTestInvoke' ||
      request.method === 'testInvoke'
    ) {
      result = await this.multiTestInvoke(account, request.params)
      result.isTest = true
    }
    if (request.method === 'signMessage') {
      if (!account) {
        throw new Error('No account')
      }
      result = this.signMessage(account, request.params)
    }
    if (request.method === 'verifyMessage') {
      result = this.verifyMessage(request.params)
    }

    if (request.method === 'traverseIterator') {
      result = await new rpc.RPCClient(this.rpcAddress).traverseIterator(
        ...request.params,
      )
    }

    if (request.method === 'getWalletInfo') {
      result = {
        isLedger: isHardwareLogin ?? false,
      }
    }

    if (request.method === 'getNetworkVersion') {
      const response = await new rpc.RPCClient(this.rpcAddress).getVersion()
      result = {
        rpcAddress: this.rpcAddress,
        ...response,
      }
    }

    if (request.method === 'getapplicationlog') {
      result = await new rpc.RPCClient(this.rpcAddress).getApplicationLog(
        request.params[0],
      )
    } else if (!result) {
      const { jsonrpc, ...queryLike } = request
      result = await new rpc.RPCClient(this.rpcAddress).execute(
        Neon.create.query({ ...queryLike, jsonrpc: '2.0' }),
      )
    }

    if (request.method === 'getWalletInfo') {
      result = {
        isLedger: isHardwareLogin ?? false,
      }
    }

    return {
      id: sessionRequest.id,
      jsonrpc: '2.0',
      result,
      isMessage:
        request.method === 'signMessage' || request.method === 'verifyMessage',
    }
  }

  signMessage = (
    account: any,
    message: string | SignMessagePayload,
  ): SignedMessage => {
    if (typeof message === 'string') {
      return this.signMessageLegacy(account, message)
    }
    if (message.version === 1) {
      return this.signMessageLegacy(account, message.message)
    }
    if (message.version === 2) {
      return this.signMessageNew(account, message.message)
    }

    throw new Error('Invalid signMessage version')
  }

  signMessageLegacy = (account: any, message: string): SignedMessage => {
    const salt = randomBytes(16).toString('hex')
    const parameterHexString = u.str2hexstring(salt + message)
    const lengthHex = u.num2VarInt(parameterHexString.length / 2)
    const messageHex = `010001f0${lengthHex}${parameterHexString}0000`

    return {
      publicKey: account.publicKey,
      data: wallet.sign(messageHex, account.privateKey),
      salt,
      messageHex,
    }
  }

  signMessageNew = (account: any, message: string): SignedMessage => {
    const salt = randomBytes(16).toString('hex')
    const messageHex = u.str2hexstring(message)

    return {
      publicKey: account.publicKey,
      data: wallet.sign(messageHex, account.privateKey, salt),
      salt,
      messageHex,
    }
  }

  verifyMessage = (verifyArgs: SignedMessage): boolean =>
    wallet.verify(verifyArgs.messageHex, verifyArgs.data, verifyArgs.publicKey)

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
      N3Helper.buildMultipleSigner(account, cim.signers),
    )
  }

  multiInvoke = async (
    account: any,
    cim: ContractInvocationMulti,
    isHardwareLogin?: boolean,
    signingFunction?: () => void,
    showInfoNotification?: (*) => void,
    hideNotification?: (*) => void,
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

    let trx = new tx.Transaction({
      script: Neon.u.HexString.fromHex(script),
      validUntilBlock: currentHeight + 100,
      signers: N3Helper.buildMultipleSigner(account, cim.signers),
    })

    trx.witnesses = [
      new tx.Witness({
        verificationScript: wallet.getVerificationScriptFromPublicKey(
          account.publicKey,
        ),
        invocationScript: '',
      }),
    ]

    const feeConfig = {
      rpcAddress: this.rpcAddress,
      networkMagic,
      account,
      systemFeeOverride: undefined,
      networkFeeOverride: undefined,
    }

    if (cim.extraNetworkFee) {
      feeConfig.networkFeeOverride = (await Neon.experimental.txHelpers.calculateNetworkFee(
        trx,
        account,
        feeConfig,
      )).add(cim.extraNetworkFee)
    }

    if (cim.extraSystemFee) {
      feeConfig.systemFeeOverride = (await Neon.experimental.txHelpers.getSystemFee(
        trx.script,
        feeConfig,
        trx.signers,
      )).add(cim.extraSystemFee)
    }

    await Neon.experimental.txHelpers.addFees(trx, feeConfig)

    if (isHardwareLogin) {
      const facade = await api.NetworkFacade.fromConfig({
        node: this.rpcAddress,
      })
      const signingConfig = {
        signingCallback: signingFunction,
      }

      let notificationId
      if (showInfoNotification)
        notificationId = showInfoNotification({
          message: 'Please sign the transaction on your hardware device',
          autoDismiss: 0,
        })

      trx = await facade.sign(trx, signingConfig).catch(console.error)

      if (hideNotification && notificationId) hideNotification(notificationId)
    } else {
      trx.sign(account, networkMagic)
    }

    return rpcClient.sendRawTransaction(trx)
  }

  static buildSigner(account: any, signerEntry?: Signer) {
    const signer = new tx.Signer({
      account: account.scriptHash,
    })

    signer.scopes = signerEntry
      ? signerEntry.scopes
      : tx.WitnessScope.CalledByEntry
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

  static buildMultipleSigner(account: any, signers: Signer[] = []) {
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
