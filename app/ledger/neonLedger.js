// @flow
import { tx, wallet } from 'neon-js'
import type {Transaction} from 'neon-js'
import LedgerNode from '@ledgerhq/hw-transport-node-hid'
import asyncWrap from '../core/asyncHelper'

const VALID_STATUS = [0x9000]

const BIP44 = (acct = 0) => {
  const acctNumber = acct.toString(16)
  return '8000002C' +
    '80000378' +
    '80000000' +
    '00000000' +
    '0'.repeat(8 - acctNumber.length) + acctNumber
}

export default class NeonLedger {
  path: string
  device: any

  constructor (path: string) {
    this.path = path
  }

  /**
   * Initialises by listing devices and trying to find a ledger device connected. Throws an error if no ledgers detected or unable to connect.
   * @return this
   */
  static async init () {
    const paths = await NeonLedger.list()
    if (paths.length === 0) throw new Error('USB Error: No device found.')
    const ledger = new NeonLedger(paths[0])
    try {
      return ledger.open()
    } catch (err) {
      throw new Error('USB Error: Login to NEO App and try again.')
    }
  }

  static async list () {
    return LedgerNode.list()
  }

  /**
   * Opens an connection with the selected ledger.
   * @return this
   */
  async open () {
    this.device = await LedgerNode.open(this.path)
    return this
  }

  /**
   * Closes the connection between the Ledger and the wallet.
   * @return this
   */
  async close () {
    return this.device.close()
  }

  /**
   * Retrieves the public key of an account from the Ledger.
   * @param {number} [acct] - Account that you want to retrieve the public key from.
   * @return {string} Public Key (Unencoded)
   */
  async getPublicKey (acct: number = 0): Promise<string> {
    const res = await this.send('80040000', BIP44(acct), VALID_STATUS)
    return res.toString('hex').substring(0, 130)
  }

  /**
   * Sends an message with params over to the Ledger.
   * @param {string} params - params as a hexstring
   * @param {string} msg - Message as a hexstring
   * @param {number[]} statusList - Statuses to return
   * @return {Promise<Buffer>} return value decoded to ASCII string
   */
  async send (params: string, msg: string, statusList: number[]): Promise<Buffer> {
    if (params.length !== 8) throw new Error(`params requires 4 bytes`)
    // $FlowFixMe
    const [cla, ins, p1, p2] = params.match(/.{1,2}/g).map(i => parseInt(i, 16))
    return this.device.send(cla, ins, p1, p2, Buffer.from(msg, 'hex'), statusList)
  }

  /**
   * Gets the ECDH signature of the data from Ledger using acct
   * @param {string} data
   * @param {number} [acct]
   * @return {Promise<string>}
   */
  async getSignature (data: string, acct: number = 0): Promise<string> {
    data += BIP44(acct)
    let response = null
    const chunks = data.match(/.{1,510}/g) || []
    if (!chunks.length) throw new Error(`Invalid data provided: ${data}`)
    for (let i = 0; i < chunks.length; i++) {
      const p = i === chunks.length - 1 ? '80' : '00'
      // $FlowFixMe
      const chunk = chunks[i]
      const params = `8002${p}00`
      let [err, res] = await asyncWrap(this.send(params, chunk, VALID_STATUS))
      if (err) {
        const errCode = p === '00' ? '0' : '1'
        console.log(`Signature Reponse An error occurred[${errCode}]:`, err)
        throw new Error(`An error occurred[${errCode}]: ${err}`)
      }
      response = res
    }
    if (response === 0x9000) {
      throw new Error(`No more data but Ledger did not return signature!`)
    }
    // $FlowFixMe
    return assembleSignature(response.toString('hex'))
  }
}

const assembleSignature = (response: string): string => {
  let rLenHex = response.substring(6, 8)
  let rLen = parseInt(rLenHex, 16) * 2
  let rStart = 8
  let rEnd = rStart + rLen

  while ((response.substring(rStart, rStart + 2) === '00') && ((rEnd - rStart) > 64)) {
    rStart += 2
  }

  let r = response.substring(rStart, rEnd)
  let sLenHex = response.substring(rEnd + 2, rEnd + 4)
  let sLen = parseInt(sLenHex, 16) * 2
  let sStart = rEnd + 4
  let sEnd = sStart + sLen

  while ((response.substring(sStart, sStart + 2) === '00') && ((sEnd - sStart) > 64)) {
    sStart += 2
  }

  let s = response.substring(sStart, sEnd)

  while (r.length < 64) {
    r = '00' + r
  }

  while (s.length < 64) {
    s = '00' + s
  }

  return r + s
}

export const getPublicKey = async (acct: number = 0): Promise<string> => {
  const ledger = await NeonLedger.init()
  try {
    return await ledger.getPublicKey(acct)
  } finally {
    await ledger.close()
  }
}

export const getDeviceInfo = async () => {
  const ledger = await NeonLedger.init()
  try {
    return await ledger.device.device.getDeviceInfo()
  } finally {
    await ledger.close()
  }
}

/**
 * Signs a transaction with Ledger. Returns the whole transaction string
 * @param {Transaction|string} unsignedTx - hexstring or Transaction object
 * @param {number} acct - The account to sign with.
 * @return {string} Transaction as a hexstring.
 */
export const signWithLedger = async (unsignedTx: Transaction | string, acct: number = 0): Promise<string> => {
  const ledger = await NeonLedger.init()
  try {
    const data = typeof unsignedTx !== 'string' ? tx.serializeTransaction(unsignedTx, false) : unsignedTx
    const publicKey = await ledger.getPublicKey(acct)
    const invocationScript = '40' + await ledger.getSignature(data, acct)
    const verificationScript = wallet.getVerificationScriptFromPublicKey(publicKey)
    const txObj = tx.deserializeTransaction(data)
    txObj.scripts.push({ invocationScript, verificationScript })
    return tx.serializeTransaction(txObj)
  } finally {
    await ledger.close()
  }
}

export const legacySignWithLedger = async (unsignedTx: Transaction | string, publicKeyEncoded: string, acct: number = 0): Promise<string> => {
  const ledger = await NeonLedger.init()
  try {
    const data = typeof unsignedTx !== 'string' ? tx.serializeTransaction(unsignedTx, false) : unsignedTx
    const invocationScript = '40' + await ledger.getSignature(data, acct)
    const verificationScript = wallet.getVerificationScriptFromPublicKey(publicKeyEncoded)
    const txObj = tx.deserializeTransaction(data)
    txObj.scripts.push({ invocationScript, verificationScript })
    return tx.serializeTransaction(txObj)
  } finally {
    await ledger.close()
  }
}
