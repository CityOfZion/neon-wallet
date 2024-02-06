import * as neonCore from '@cityofzion/neon-core'
import * as neonJs from '@cityofzion/neon-js'
import * as n3ledger from '@cityofzion/neon-ledger'
import TransportWebHID from '@ledgerhq/hw-transport-webhid'
// import LedgerNode2 from '@ledgerhq/hw-transport-node-hid-noevents'
// import nodeLedger from '@ledgerhq/hw-transport-node-hid'
import LedgerNode from '@ledgerhq/hw-transport-webhid'

import 'core-js/actual'

// const VALID_STATUS = 0x9000
const MSG_TOO_BIG = 0x6d08
const APP_CLOSED = 0x6e00
const APP_CLOSED_V2 = 0x6e01
const TX_DENIED = 0x6985
const TX_PARSE_ERR = 0x6d07

export const MESSAGES = {
  NOT_SUPPORTED: 'Your computer does not support the ledger',
  NOT_CONNECTED: 'Connect and unlock your Ledger device',
  APP_CLOSED: 'Navigate to the NEO3 app on your Ledger device',
  MSG_TOO_BIG: 'Your transaction is too big for the Ledger to sign',
  TX_DENIED: 'You have denied the transaction on your ledger',
  TX_PARSE_ERR: 'Error parsing transaction. Make sure your NEO3 Ledger app version is up to date',
}

const evalTransportError = (error: any) => {
  const err = error
  switch (err.statusCode) {
    case APP_CLOSED:
    case APP_CLOSED_V2:
      err.message = MESSAGES.APP_CLOSED
      break
    case MSG_TOO_BIG:
      err.message = MESSAGES.MSG_TOO_BIG
      break
    case TX_DENIED:
      err.message = MESSAGES.TX_DENIED
      break
    case TX_PARSE_ERR:
      err.message = MESSAGES.TX_PARSE_ERR
      break
    default:
  }
  return err
}

export default class NeonLedger3 {
  path: string

  device: any

  constructor(path: string) {
    this.path = path
  }

  static async init() {
    const supported = await LedgerNode.isSupported()
    if (!supported) {
      throw new Error(MESSAGES.NOT_SUPPORTED)
    }

    console.log('createaadfasFDASD')
    const transport = await TransportWebHID.request()
    console.log('poscreate')
    console.log(transport)
    console.log('pre getname')
    const aaaaaaaa = await n3ledger.getAppName(transport)
    console.log(aaaaaaaa)
    // console.log('1123213123')
    const paths = await LedgerNode.list()
    console.log(paths)
    // console.log('inicio')
    // const aaa = await LedgerNode.openConnected()
    // console.log(aaa)
    // console.log('rrrrrrrr')
    // const bbb = await LedgerNode.request()
    // console.log('oooooooo')
    // console.log(bbb)
    // console.log('yyyyyyyyy')
    // const aaaaa = await n3ledger.getDevicePaths(nodeLedger)
    // const paths = await NeonLedger3.list()
    const path =
      'IOService:/AppleACPIPlatformExpert/PCI0@0/AppleACPIPCI/XHC1@14/XHC1@14000000/HS03@14300000/USB2.0 Hub             @14300000/AppleUSB20Hub@14300000/AppleUSB20HubPort@14310000/Nano S@14310000/Nano S@0/AppleUserUSBHostHIDDevice'
    // if (!paths || paths.length === 0) throw new Error(MESSAGES.NOT_CONNECTED)
    if (path) {
      const ledger = new NeonLedger3(path)
      await ledger.open()
      const appName = await ledger.getAppName()
      if (appName !== 'NEO N3' && appName !== 'NEO -DN3') {
        throw new Error(MESSAGES.APP_CLOSED)
      }
      return ledger
    }
    return null
  }

  static async list(): Promise<string[] | null> {
    console.log('aqui')
    console.log(navigator)
    console.log(navigator.userAgent)
    const aaa = navigator.hid.getDevices()
    console.log(aaa)
    return LedgerNode.list()
  }

  async open(): Promise<NeonLedger3> {
    try {
      console.log('open')
      console.log(LedgerNode)
      this.device = await window.ledger.openLedger(this.path)
      console.log('posopen')
      return this
    } catch (err) {
      console.log('err')
      console.log(err)
      throw evalTransportError(err)
    }
  }

  close(): Promise<void> {
    if (this.device) return this.device.close()
    return Promise.resolve()
  }

  async getAppName(): Promise<string | null> {
    try {
      return await n3ledger.getAppName(this.device)
    } catch (e) {
      return null
    }
  }

  async getPublicKeys(
    acct: number = 0,
    unencodedPublicKeys: Array<{ account: number; key: string }> = [],
    batchSize: number = 5
  ) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < batchSize; i++) {
      const pair = await this.getPublicKey(acct + i)
      unencodedPublicKeys.push(pair)
    }
    return unencodedPublicKeys
  }

  async getPublicKey(acct: number = 0): Promise<{ account: number; key: string }> {
    try {
      const key = await n3ledger.getPublicKey(this.device, n3ledger.BIP44(acct))
      return { account: acct, key }
    } catch (err) {
      throw evalTransportError(err)
    }
  }

  getDeviceInfo() {
    try {
      return this.device.device.getDeviceInfo()
    } catch (err) {
      throw evalTransportError(err)
    }
  }

  async send(params: string, msg: string, statusList: number[]): Promise<Buffer> {
    if (params.length !== 8) throw new Error('params requires 4 bytes')
    // $FlowFixMe
    const [cla, ins, p1, p2] = params.match(/.{1,2}/g)?.map(i => parseInt(i, 16)) ?? []
    try {
      return await this.device.send(cla, ins, p1, p2, Buffer.from(msg, 'hex'), statusList)
    } catch (err) {
      throw evalTransportError(err)
    }
  }

  async getSignature(data: string, magic: number, acct: number = 0): Promise<string> {
    return n3ledger.getSignature(this.device, data, n3ledger.BIP44(acct), magic)
  }
}

export const getPublicKeys = async (acct: number = 0): Promise<Array<{ account: number; key: string }>> => {
  const ledger = await NeonLedger3.init()
  if (!ledger) {
    return []
  }
  try {
    return await ledger.getPublicKeys(acct)
  } finally {
    await ledger.close()
  }
}

export const getStartInfo = async () => {
  const ledger = await NeonLedger3.init()
  if (!ledger) {
    return
  }

  try {
    const [deviceInfo, publicKey] = await Promise.all([ledger.getDeviceInfo(), ledger.getPublicKey()])
    return { deviceInfo, publicKey }
  } finally {
    await ledger.close()
  }
}
export const signWithLedger = async (
  tx: neonCore.tx.Transaction,
  details: { network: number; witnessIndex: number },
  acct: number = 0
): Promise<string> => {
  const ledger = await NeonLedger3.init()
  if (!ledger) {
    return ''
  }
  try {
    const publicKey = await ledger.getPublicKey(acct)
    const scriptHashLedger = neonJs.wallet.getScriptHashFromPublicKey(publicKey.key)
    const scriptHashWitness = neonCore.wallet.getScriptHashFromVerificationScript(
      tx.witnesses[details.witnessIndex].verificationScript.toString()
    )
    if (scriptHashLedger !== scriptHashWitness) {
      throw new Error(
        `Requested signature from ${neonJs.wallet.getAddressFromScriptHash(
          scriptHashWitness
        )} but signing with ledger key of ${neonJs.wallet.getAddressFromScriptHash(scriptHashLedger)}.`
      )
    }
    return await ledger.getSignature(tx.serialize(false), details.network, acct)
  } finally {
    await ledger.close()
  }
}
