// @flow
import { getAccountFromWIFKey } from 'neon-js'
import { verifyPrivateKey } from '../core/wallet'
import { sendEvent, clearTransactionEvent } from './transactions'

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

export function decrypting (bool: Boolean) {
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

export const onWifChange = (history: Object, wif: string) => (dispatch: DispatchType) => {
  if (verifyPrivateKey(wif)) {
    dispatch(login(wif))
    history.push('/dashboard')
  } else {
    dispatch(sendEvent(false, 'That is not a valid private key'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  }
}

// Reducer that manages account state (account now = private key)
export default (state: Object = {wif: null, address: null, loggedIn: false, redirectUrl: null, decrypting: false, accountKeys: []}, action: Object) => {
  switch (action.type) {
    case LOGIN:
      let loadAccount: Object | number
      try {
        loadAccount = getAccountFromWIFKey(action.wif)
      } catch (e) { loadAccount = -1 }
      if (loadAccount === -1 || loadAccount === -2 || loadAccount === undefined) {
        return {...state, wif: action.wif, loggedIn: false}
      }
      // $FlowFixMe
      return {...state, wif: action.wif, address: loadAccount.address, loggedIn: true, decrypting: false}
    case LOGOUT:
      return {...state, 'wif': null, address: null, 'loggedIn': false, decrypting: false}
    case SET_DECRYPTING:
      return {...state, decrypting: action.state}
    case SET_KEYS:
      return {...state, accountKeys: action.keys}
    default:
      return state
  }
}
