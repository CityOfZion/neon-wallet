// @flow
import storage from 'electron-json-storage'
import { generateEncryptedWif, getAccountFromWIFKey, generatePrivateKey, getWIFFromPrivateKey, encryptWIF, encryptWifAccount } from 'neon-js'
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

export const generateNewWallet = (passphrase: string, passphrase2: string, wif?: string) => (dispatch: DispatchType): Promise<*> => {
  return new Promise((resolve, reject) => {
    const rejectNewWallet = (error) => {
      dispatch(sendEvent(false, error))
      setTimeout(() => clearTransactionEvent(), 5000)
      reject(new Error(error))
    }
    if (passphrase !== passphrase2) {
      rejectNewWallet('Passphrases do not match')
    }
    if (validatePassphrase(passphrase)) {
      dispatch(sendEvent(true, 'Generating encoded key...'))
      setTimeout(() => {
        const encryptFn = wif ? encryptWifAccount(wif, passphrase) : generateEncryptedWif(passphrase)
        try {
          encryptFn.then((result) => {
            dispatch(newWallet(result))
            dispatch(clearTransactionEvent())
            resolve()
          })
        } catch (e) {
          rejectNewWallet(wif ? 'The private key is not valid' : 'An error occured while trying to generate a new wallet')
        }
      }, 500)
    } else {
      rejectNewWallet('Please choose a longer passphrase')
    }
  })
}

const initialState = {
  wif: null,
  address: null,
  passphrase: null,
  encryptedWif: null,
  generating: false
}

// Reducer used for state necessary to generating a wallet
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case NEW_WALLET_KEYS:
      const newPrivateKey = generatePrivateKey()
      const newWif = getWIFFromPrivateKey(newPrivateKey)
      const encryptedWif = encryptWIF(newWif, action.passphrase)
      const loadAccount = getAccountFromWIFKey(newWif)
      return { ...state, wif: newWif, address: loadAccount.address, passphrase: action.passphrase, encryptedWif }
    case NEW_WALLET:
      return { ...state, wif: action.wif, address: action.address, passphrase: action.passphrase, encryptedWif: action.encryptedWif, generating: false }
    case SET_GENERATING:
      return { ...state, generating: action.state }
    case RESET_KEY:
      return { ...initialState }
    default:
      return state
  }
}
