// @flow
import storage from 'electron-json-storage'
import { generateEncryptedWif, getAccountFromWIFKey, generatePrivateKey, getWIFFromPrivateKey, encryptWIF } from 'neon-js'
import { sendEvent, clearTransactionEvent } from './transactions'
import { validatePassphrase } from '../core/wallet'

// Constants
export const NEW_WALLET_KEYS = 'NEW_WALLET_KEYS'
export const NEW_WALLET = 'NEW_WALLET'
export const SET_GENERATING = 'SET_GENERATING'
export const RESET_KEY = 'RESET_KEY'

// Actions
export function newWalletKeys (passphrase: string) {
  return {
    type: NEW_WALLET_KEYS,
    passphrase
  }
}

export function newWallet (account: Object) {
  return {
    type: NEW_WALLET,
    wif: account.wif,
    address: account.address,
    passphrase: account.passphrase,
    encryptedWif: account.encryptedWif
  }
}

export function generating (bool: string) {
  return {
    type: SET_GENERATING,
    state: bool
  }
}

export function resetKey () {
  return {
    type: RESET_KEY
  }
}

export const saveKey = (keyName: string, passphraseKey: string) => (dispatch: DispatchType) => {
  if (!keyName) { return null }

  // eslint-disable-next-line
  storage.get('keys', (error, data) => {
    data[keyName] = passphraseKey
    dispatch(sendEvent(true, `Saved key as ${keyName}`))
    storage.set('keys', data)
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  })
}

export const generateNewWallet = (passphrase: string, passphrase2: string) => (dispatch: DispatchType) => {
  if (!passphrase || !passphrase2) return false

  if (passphrase !== passphrase2) {
    dispatch(sendEvent(false, 'Passphrases do not match'))
    setTimeout(() => clearTransactionEvent(), 5000)
    return null
  }
  if (validatePassphrase(passphrase)) {
    // TODO: for some reason this blocks, so giving time to processes the earlier
    // dispatch to display "generating" text, should fix this in future
    dispatch(sendEvent(true, 'Generating encoded key...'))
    setTimeout(() => {
      generateEncryptedWif(passphrase).then((result) => {
        dispatch(newWallet(result))
        dispatch(clearTransactionEvent())
      })
    }, 500)
    return true
  } else {
    dispatch(sendEvent(false, 'Please choose a longer passphrase'))
    setTimeout(() => clearTransactionEvent(), 5000)
    return false
  }
}

// Reducer used for state necessary to generating a wallet
export default (state: Object = { wif: null, address: null, passphrase: null, encryptedWif: null, generating: false }, action: Object) => {
  switch (action.type) {
    case NEW_WALLET_KEYS:
      const newPrivateKey = generatePrivateKey()
      const newWif = getWIFFromPrivateKey(newPrivateKey)
      const encryptedWif = encryptWIF(newWif, action.passphrase)
      const loadAccount = getAccountFromWIFKey(newWif)
      return {...state, wif: newWif, address: loadAccount.address, passphrase: action.passphrase, encryptedWif}
    case NEW_WALLET:
      return {...state, wif: action.wif, address: action.address, passphrase: action.passphrase, encryptedWif: action.encryptedWif, generating: false}
    case SET_GENERATING:
      return {...state, generating: action.state}
    case RESET_KEY:
      return {wif: null, address: null, passphrase: null, encryptedWif: null, generating: false}
    default:
      return state
  }
}
