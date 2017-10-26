// @flow
import { getAccountFromWIFKey, decryptWIF } from 'neon-js'
import { verifyPrivateKey, validatePassphrase } from '../core/wallet'
import { sendEvent, clearTransactionEvent } from './transactions'
import { ROUTES } from '../core/constants'

// Constants
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_DECRYPTING = 'SET_DECRYPTING'
export const SET_KEYS = 'SET_KEYS'

// Actions
export function login (wif: string) {
  return {
    type: LOGIN,
    wif: wif
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
    dispatch(sendEvent(false, 'Passphrase too short'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return null
  }
  dispatch(sendEvent(true, 'Decrypting encoded key...'))
  const wrongPassphraseOrEncryptedKeyError = () => {
    dispatch(sendEvent(false, 'Wrong passphrase or invalid encrypted key'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  }
  setTimeout(() => {
    try {
      decryptWIF(wif, passphrase).then((wif) => {
        dispatch(login(wif))
        history.push(ROUTES.DASHBOARD)
        dispatch(clearTransactionEvent())
      }).catch(() => {
        wrongPassphraseOrEncryptedKeyError()
      })
    } catch (e) {
      wrongPassphraseOrEncryptedKeyError()
    }
  }, 500)
}

export const loginWithPrivateKey = (wif: string, history: Object, route?: RouteType) => (dispatch: DispatchType) => {
  if (verifyPrivateKey(wif)) {
    dispatch(login(wif))
    history.push(route || ROUTES.DASHBOARD)
  } else {
    dispatch(sendEvent(false, 'That is not a valid private key'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  }
}

const initialState = {
  wif: null,
  address: null,
  loggedIn: false,
  redirectUrl: null,
  accountKeys: []
}

// Reducer that manages account state (account now = private key)
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOGIN:
      let loadAccount: Object | number
      try {
        loadAccount = getAccountFromWIFKey(action.wif)
      } catch (e) { loadAccount = -1 }
      if (loadAccount === -1 || loadAccount === -2 || loadAccount === undefined) {
        return {
          ...state,
          wif: action.wif,
          loggedIn: false
        }
      }
      return {
        ...state,
        wif: action.wif,
        // $FlowFixMe
        address: loadAccount.address,
        loggedIn: true,
        decrypting: false
      }
    case LOGOUT:
      return {
        ...state,
        wif: null,
        address: null,
        loggedIn: false
      }
    case SET_KEYS:
      return {
        ...state,
        accountKeys: action.keys
      }
    default:
      return state
  }
}
