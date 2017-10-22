// @flow
import { verifyPrivateKey } from '../core/wallet'
import { sendEvent, clearTransactionEvent } from './transactions'
import { getAccountFromWIFKey } from 'neon-js'
import commNode from '../ledger/ledger-comm-node'
import { BIP44_PATH } from '../core/constants'
import asyncWrap from '../core/asyncHelper'
import { ledgerNanoSGetPublicKey, ledgerNanoSCreateSignatureAsynch, ledgerNanoSFromWif } from '../ledger/ledgerNanoS'

// Constants
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_DECRYPTING = 'SET_DECRYPTING'
export const SET_KEYS = 'SET_KEYS'
export const HARDWARE_DEVICE_INFO = 'HARDWARE_DEVICE_INFO'
export const HARDWARE_PUBLIC_KEY_INFO = 'HARDWARE_PUBLIC_KEY_INFO'
export const HARDWARE_PUBLIC_KEY = 'HARDWARE_PUBLIC_KEY'

// Actions
export function login (wif: string) {
  return {
    type: LOGIN,
    wif: wif
  }
}

export function ledgerNanoSGetLogin () {
  // process.stdout.write('ledgerNanoSGetLogin ledgerNanoSCreateSignatureAsynch "' + JSON.stringify(ledgerNanoSCreateSignatureAsynch) + '"\n')
  // process.stdout.write('ledgerNanoSGetLogin ledgerNanoSFromWif "' + JSON.stringify(ledgerNanoSFromWif) + '"\n')
  return {
    type: LOGIN,
    ledgerNanoS: true,
    signingFunction: ledgerNanoSCreateSignatureAsynch,
    wif: ledgerNanoSFromWif,
    address: ledgerNanoSGetPublicKey
  }
}

export function logout () {
  return {
    type: LOGOUT
  }
}

export function decrypting (bool: boolean) {
  return {
    type: SET_DECRYPTING,
    state: bool
  }
}

export function setKeys (keys: any) {
  return {
    type: SET_KEYS,
    keys
  }
}

export function hardwareDeviceInfo (hardwareDeviceInfo: string) {
  return {
    type: HARDWARE_DEVICE_INFO,
    hardwareDeviceInfo
  }
}

export function hardwarePublicKeyInfo (hardwarePublicKeyInfo: string) {
  return {
    type: HARDWARE_PUBLIC_KEY_INFO,
    hardwarePublicKeyInfo
  }
}

export function hardwarePublicKey (hardwarePublicKey: string) {
  return {
    type: HARDWARE_PUBLIC_KEY,
    hardwarePublicKey
  }
}

export const onWifChange = (history: Object, wif: string) => (dispatch: DispatchType) => {
  if (verifyPrivateKey(wif)) {
    dispatch(login(wif))
    history.push('/dashboard')
  } else {
    dispatch(sendEvent(false, 'That is not a valid private key'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  }
}

export const ledgerNanoSGetInfoAsync = () => async (dispatch: DispatchType) => {
  dispatch(hardwareDeviceInfo('Looking for USB Devices'))
  // process.stdout.write('started ledgerNanoSGetInfoAsync  \n')
  let [err, result] = await asyncWrap(commNode.list_async())
  if (err) return dispatch(hardwareDeviceInfo(`Finding USB Error: ${err}`))
  if (result.length === 0) {
    // process.stdout.write('getLedgerDeviceInfo "No device found"\n')
    return dispatch(hardwareDeviceInfo('USB Failure: No device found'))
  } else {
    let [err, comm] = await asyncWrap(commNode.create_async())
    if (err) return dispatch(hardwareDeviceInfo(`Finding USB Error: ${err}`))

    const deviceInfo = comm.device.getDeviceInfo()
    // process.stdout.write('getLedgerDeviceInfo success  "' + ledgerNanoSGetDeviceInfo + '"\n')
    comm.device.close()
    dispatch(hardwareDeviceInfo(`Found USB ${deviceInfo.manufacturer} ${deviceInfo.product}`))
  }
  // process.stdout.write('success ledgerNanoSGetInfoAsync  \n')
  // process.stdout.write('started getPublicKeyInfo  \n')
  [err, result] = await asyncWrap(commNode.list_async())
  if (result.length === 0) {
    // process.stdout.write('getPublicKeyInfo "No device found"\n')
    dispatch(hardwarePublicKeyInfo('App Failure: No device found'))
  } else {
    let [err, comm] = await asyncWrap(commNode.create_async())
    if (err) return dispatch(hardwarePublicKeyInfo(`Public Key Comm Init Error: ${err}`))

    let message = Buffer.from(`8004000000${BIP44_PATH}hex`)
    const validStatus = [0x9000]
    let [error, response] = await asyncWrap(comm.exchange(message.toString('hex'), validStatus))
    if (error) {
      comm.device.close() // NOTE: do we need this close here - what about the other errors that do not have it at the moment
      // process.stdout.write('getPublicKeyInfo comm.exchange error reason ' + err + '\n')
      if (error === 'Invalid status 28160') {
        return dispatch(hardwarePublicKeyInfo('NEO App does not appear to be open, request for private key returned error 28160.'))
      } else {
        return dispatch(hardwarePublicKeyInfo(`Public Key Comm Messaging Error: ${error}`))
      }
    }
    comm.device.close()
    // process.stdout.write('getPublicKey success  "' + ledgerNanoSGetPublicKey + '"\n')
    // process.stdout.write('getPublicKeyInfo success  "' + ledgerNanoSGetPublicKeyInfo + '"\n')
    dispatch(hardwarePublicKey(response.substring(0, 130)))
    return dispatch(hardwarePublicKeyInfo('App Found, Public Key Available'))
  }
  // process.stdout.write('success getPublicKeyInfo  \n')
}

// Reducer that manages account state (account now = private key)
export default (state: Object = {wif: null, address: null, loggedIn: false, redirectUrl: null, decrypting: false, accountKeys: [], signingFunction: () => {}, publicKey: null, hardwareDeviceInfo: null, hardwarePublicKeyInfo: null}, action: Object) => {
  switch (action.type) {
    case LOGIN:
      // process.stdout.write('interim action "' + JSON.stringify(action) + '"\n')
      // process.stdout.write('interim action.wif "' + JSON.stringify(action.wif) + '" signingFunction "' + JSON.stringify(action.signingFunction) + '"\n')
      let loadAccount: Object | number
      try {
        if (action.wif instanceof Function) {
          loadAccount = action.wif()
        } else {
          loadAccount = getAccountFromWIFKey(action.wif)
        }
      } catch (e) {
        // process.stdout.write('error loadAccount "' + e + '" "' + e.message + '" \n')
        console.log(e.stack)
        loadAccount = -1
      }
      // process.stdout.write('interim loadAccount "' + JSON.stringify(loadAccount) + '" \n')
      if (loadAccount === -1 || loadAccount === -2 || loadAccount === undefined || !loadAccount.address) {
        return {...state, wif: action.wif, loggedIn: false}
      }
      return {...state, wif: action.wif, address: loadAccount.address, loggedIn: true, decrypting: false, signingFunction: action.signingFunction}
    case LOGOUT:
      return {...state, 'wif': null, address: null, 'loggedIn': false, decrypting: false}
    case SET_DECRYPTING:
      return {...state, decrypting: action.state}
    case SET_KEYS:
      return {...state, accountKeys: action.keys}
    case HARDWARE_DEVICE_INFO:
      return {...state, hardwareDeviceInfo: action.hardwareDeviceInfo}
    case HARDWARE_PUBLIC_KEY_INFO:
      return {...state, hardwarePublicKeyInfo: action.hardwarePublicKeyInfo}
    case HARDWARE_PUBLIC_KEY:
      return {...state, publicKey: action.publicKey}
    default:
      return state
  }
}
