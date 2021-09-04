// @flow
import * as neonJs from '@cityofzion/neon-js-next'
import * as n3ledger from '@cityofzion/neon-ledger-next'
import type { Transaction } from '@cityofzion/neon-js-next'
import LedgerNode from '@ledgerhq/hw-transport-node-hid'
import { cloneDeep } from 'lodash-es'

const VALID_STATUS = 0x9000
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
  TX_PARSE_ERR:
    'Error parsing transaction. Make sure your NEO3 Ledger app version is up to date',
}

/**
 * Evaluates Transport Error thrown and rewrite the error message to be more user friendly.
 * @param {Error} err
 * @return {Error}
 */
const evalTransportError = error => {
  const err = cloneDeep(error)
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

  /**
   * Initialises by listing devices and trying to find a ledger device connected. Throws an error if no ledgers detected or unable to connect.
   * @return {Promise<NeonLedger3>}
   */
  static async init() {
    const supported = await LedgerNode.isSupported()
    if (!supported) {
      throw new Error(MESSAGES.NOT_SUPPORTED)
    }
    const paths = await NeonLedger3.list()
    if (paths.length === 0) throw new Error(MESSAGES.NOT_CONNECTED)
    if (paths[0]) {
      let ledger = new NeonLedger3(paths[0])
      ledger = await ledger.open()
      const appName = await ledger.getAppName()
      if (appName !== 'NEO3') throw new Error(MESSAGES.APP_CLOSED)
      return ledger
    }
    return null
  }

  static async list(): Promise<(?string)[]> {
    return LedgerNode.list()
  }

  /**
   * Opens an connection with the selected ledger.
   * @return {Promise<NeonLedger>}this
   */
  async open(): Promise<NeonLedger3> {
    try {
      this.device = await LedgerNode.open(this.path)
      return this
    } catch (err) {
      throw evalTransportError(err)
    }
  }

  /**
   * Closes the connection between the Ledger and the wallet.
   * @return {Promise<void>}}
   */
  close(): Promise<void> {
    if (this.device) return this.device.close()
    return Promise.resolve()
  }

  async getAppName(): Promise<string> {
    try {
      return await n3ledger.getAppName(this.device)
    } catch (e) {
      return null
    }
  }

  async getPublicKeys(
    acct: number = 0,
    unencodedPublicKeys: Array<{ account: number, key: string }> = [],
    batchSize: number = 5,
  ) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < batchSize; i++) {
      const pair = await this.getPublicKey(acct + i)
      unencodedPublicKeys.push(pair)
    }
    return unencodedPublicKeys
  }

  /**
   * Retrieves the public key of an account from the Ledger.
   * @param {number} [acct] - Account that you want to retrieve the public key from.
   * @return {{account: number, key: string }}
   */
  async getPublicKey(
    acct: number = 0,
  ): Promise<{ account: number, key: string }> {
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

  /**
   * Sends an message with params over to the Ledger.
   * @param {string} params - params as a hexstring
   * @param {string} msg - Message as a hexstring
   * @param {number[]} statusList - Statuses to return
   * @return {Promise<Buffer>} return value decoded to ASCII string
   */
  async send(
    params: string,
    msg: string,
    statusList: number[],
  ): Promise<Buffer> {
    if (params.length !== 8) throw new Error('params requires 4 bytes')
    // $FlowFixMe
    const [cla, ins, p1, p2] = params.match(/.{1,2}/g).map(i => parseInt(i, 16))
    try {
      return await this.device.send(
        cla,
        ins,
        p1,
        p2,
        Buffer.from(msg, 'hex'),
        statusList,
      )
    } catch (err) {
      throw evalTransportError(err)
    }
  }

  /**
   * Gets the ECDH signature of the data from Ledger using acct
   * @param {string} data - unsigned transaction
   * @param {number} magic - network magic
   * @param {number} [acct]
   * @return {Promise<string>}
   */
  async getSignature(
    data: string,
    magic: number,
    acct: number = 0,
  ): Promise<string> {
    return n3ledger.getSignature(this.device, data, n3ledger.BIP44(acct), magic)
  }
}

export const getPublicKeys = async (
  acct: number = 0,
): Promise<Array<{ account: number, key: string }>> => {
  const ledger = await NeonLedger3.init()
  try {
    return await ledger.getPublicKeys(acct)
  } finally {
    await ledger.close()
  }
}

export const getStartInfo = async () => {
  const ledger = await NeonLedger3.init()

  try {
    return await Promise.all([
      ledger.getDeviceInfo(),
      ledger.getPublicKey(),
    ]).then(([deviceInfo, publicKey]) => ({ deviceInfo, publicKey }))
  } finally {
    await ledger.close()
  }
}

/**
 * Signs a transaction with Ledger. Returns the whole transaction string
 * @param {Transaction} tx - Transaction object
 * @param {{network: number, witnessIndex: number}} details - signing details
 * @param {number} acct - The account to sign with.
 * @return {string} Signature as a hexstring.
 */
export const signWithLedger = async (
  tx: Transaction,
  details: { network: number, witnessIndex: number },
  acct: number = 0,
): Promise<string> => {
  const ledger = await NeonLedger3.init()
  try {
    const publicKey = await ledger.getPublicKey(acct)
    const scriptHashLedger = neonJs.wallet.getScriptHashFromPublicKey(
      publicKey.key,
    )
    const scriptHashWitness = neonJs.wallet.getScriptHashFromVerificationScript(
      tx.witnesses[details.witnessIndex].verificationScript.toString(),
    )
    if (scriptHashLedger !== scriptHashWitness) {
      throw new Error(
        `Requested signature from ${neonJs.wallet.getAddressFromScriptHash(
          scriptHashWitness,
          neonJs.CONST.ADDR_VERSION, // TODO: can we get this value from else where? Not sure if we support every having a different one
        )} but signing with ledger key of ${neonJs.wallet.getAddressFromScriptHash(
          scriptHashLedger,
          neonJs.CONST.ADDR_VERSION, // TODO: same check as above
        )}.`,
      )
    }
    return await ledger.getSignature(tx.serialize(false), details.network, acct)
  } finally {
    await ledger.close()
  }
}
