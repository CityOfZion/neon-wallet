import { getAccountFromWIFKey, getPublicKeyEncoded, getAccountFromPublicKey } from 'neon-js'

import { ledgerNanoSGetPublicKey } from './ledgerNanoS'

// Constants
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_DECRYPTING = 'SET_DECRYPTING'
export const SET_KEYS = 'SET_KEYS'

// Actions
export function login (wif) {
  return {
    type: LOGIN,
    wif: wif
  }
}

export function ledgerNanoSGetLogin () {
  return {
    type: LOGIN,
    ledgerNanoS: true,
    publicKey: ledgerNanoSGetPublicKey
  }
}

export function logout () {
  return {
    type: LOGOUT
  }
}

export function decrypting (bool) {
  return {
    type: SET_DECRYPTING,
    state: bool
  }
}

export function setKeys (keys) {
  return {
    type: SET_KEYS,
    keys
  }
}

// Reducer that manages account state (account now = private key)
export default (state = {wif: null, address: null, loggedIn: false, redirectUrl: null, decrypting: false, accountKeys: []}, action) => {
  switch (action.type) {
    case LOGIN:
      let loadAccount
      try {
        if (action.ledgerNanoS) {
          loadAccount = getAccountFromPublicKey(getPublicKeyEncoded(action.publicKey))
        } else {
          loadAccount = getAccountFromWIFKey(action.wif)
        }
      } catch (e) {
        process.stdout.write('error loadAccount "' + e + '" "' + e.message + '" \n')
        console.log(e.stack)
        loadAccount = -1
      }
      process.stdout.write('interim loadAccount "' + loadAccount + '" \n')
      if (loadAccount === -1 || loadAccount === -2 || loadAccount === undefined) {
        return {...state, wif: action.wif, loggedIn: false}
      }
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
