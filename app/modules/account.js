// @flow
import { verifyPrivateKey, validatePassphrase } from '../core/wallet'
import { getAccountFromWIFKey, getPublicKeyEncoded, getAccountFromPublicKey, decryptWIF } from 'neon-js'
import commNode from '../ledger/ledger-comm-node'
import { BIP44_PATH, ROUTES } from '../core/constants'
import asyncWrap from '../core/asyncHelper'
import { ledgerNanoSCreateSignatureAsync } from '../ledger/ledgerNanoS'
import { showErrorNotification, showInfoNotification, clearNotification } from './notification'

// Constants
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
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
  return {
    type: LOGIN,
    signingFunction: ledgerNanoSCreateSignatureAsync
  }
}

export function logout () {
  return {
    type: LOGOUT
  }
}

export function setKeys (keys: any) {
  return {
    type: SET_KEYS,
    keys
  }
}

export const loginNep2 = (passphrase: string, wif: string, history: Object) => (dispatch: DispatchType) => {
  if (!validatePassphrase(passphrase)) {
    dispatch(showErrorNotification({ message: 'Passphrase too short' }))
  }
  dispatch(showInfoNotification({ message: 'Decrypting encoded key...' }))
  const wrongPassphraseOrEncryptedKeyError = () => {
    dispatch(showErrorNotification({ message: 'Wrong passphrase or invalid encrypted key' }))
  }
  setTimeout(() => {
    try {
      decryptWIF(wif, passphrase).then((wif) => {
        dispatch(login(wif))
        history.push(ROUTES.DASHBOARD)
        dispatch(clearNotification())
      }).catch(() => {
        wrongPassphraseOrEncryptedKeyError()
      })
    } catch (e) {
      wrongPassphraseOrEncryptedKeyError()
    }
  }, 500)
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

export function hardwarePublicKey (publicKey: string) {
  return {
    type: HARDWARE_PUBLIC_KEY,
    publicKey
  }
}

export const loginWithPrivateKey = (wif: string, history: Object, route?: RouteType) => (dispatch: DispatchType) => {
  if (verifyPrivateKey(wif)) {
    dispatch(login(wif))
    history.push(route || ROUTES.DASHBOARD)
  } else {
    dispatch(showErrorNotification({ message: 'That is not a valid private key' }))
  }
}

// Reducer that manages account state (account now = private key)
export const ledgerNanoSGetInfoAsync = () => async (dispatch: DispatchType) => {
  dispatch(hardwareDeviceInfo('Looking for USB Devices'))
  // console.log('started ledgerNanoSGetInfoAsync')
  let [err, result] = await asyncWrap(commNode.list_async())
  if (err) return dispatch(hardwareDeviceInfo(`Finding USB Error: ${err}`))
  if (result.length === 0) {
    // console.log('getLedgerDeviceInfo "No device found"')
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
  [err, result] = await asyncWrap(commNode.list_async())
  if (result.length === 0) {
    // process.stdout.write('getPublicKeyInfo "No device found"\n')
    dispatch(hardwarePublicKeyInfo('App Failure: No device found'))
  } else {
    let [err, comm] = await asyncWrap(commNode.create_async())
    if (err) return dispatch(hardwarePublicKeyInfo(`Public Key Comm Init Error: ${err}`))

    let message = Buffer.from(`8004000000${BIP44_PATH}`, 'hex')
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

const initialState = {
  wif: null,
  address: null,
  loggedIn: false,
  redirectUrl: null,
  accountKeys: [],
  signingFunction: null,
  publicKey: null,
  hardwareDeviceInfo: null,
  hardwarePublicKeyInfo: null
}

// Reducer that manages account state (account now = private key)
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOGIN:
      // process.stdout.write('interim action "' + JSON.stringify(action) + '"\n')
      // process.stdout.write('interim action.wif "' + JSON.stringify(action.wif) + '" signingFunction "' + JSON.stringify(action.signingFunction) + '"\n')
      let loadAccount: Object | number
      try {
        if (action.signingFunction) {
          const publicKeyEncoded = getPublicKeyEncoded(state.publicKey)
          loadAccount = getAccountFromPublicKey(publicKeyEncoded)
        } else {
          loadAccount = getAccountFromWIFKey(action.wif)
        }
      } catch (e) {
        // process.stdout.write('error loadAccount "' + e + '" "' + e.message + '" \n')
        console.log(e.stack)
        loadAccount = -1
      }
      // process.stdout.write('interim loadAccount "' + JSON.stringify(loadAccount) + '" \n')
      if (typeof loadAccount !== 'object') {
        return {
          ...state,
          wif: action.wif,
          loggedIn: false
        }
      }
      return {
        ...state,
        wif: action.wif,
        address: loadAccount.address,
        loggedIn: true,
        signingFunction: action.signingFunction
      }
    case LOGOUT:
      return {
        ...state,
        wif: null,
        address: null,
        loggedIn: false,
        signingFunction: null,
        publicKey: null
      }
    case SET_KEYS:
      return {
        ...state,
        accountKeys: action.keys
      }
    case HARDWARE_DEVICE_INFO:
      return {
        ...state,
        hardwareDeviceInfo: action.hardwareDeviceInfo
      }
    case HARDWARE_PUBLIC_KEY_INFO:
      return {
        ...state,
        hardwarePublicKeyInfo: action.hardwarePublicKeyInfo
      }
    case HARDWARE_PUBLIC_KEY:
      return {
        ...state,
        publicKey: action.publicKey
      }
    default:
      return state
  }
}
