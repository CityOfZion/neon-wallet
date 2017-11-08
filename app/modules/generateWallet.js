// @flow
import storage from 'electron-json-storage'
import { generateEncryptedWif, getAccountFromWIFKey, generatePrivateKey, getWIFFromPrivateKey, encryptWIF, encryptWifAccount } from 'neon-js'
import { showErrorNotification, showInfoNotification, hideNotification } from './notification'
import { validatePassphrase, checkMatchingPassphrases } from '../core/wallet'

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
    dispatch(showInfoNotification({ message: `Saved key as ${keyName}` }))
    storage.set('keys', data)
  })
}

export const generateWalletFromWif = (passphrase: string, passphrase2: string, wif: string) => (dispatch: DispatchType): Promise<*> => {
  return new Promise((resolve, reject) => {
    const rejectPromise = (error) => {
      dispatch(showErrorNotification({ message: error }))
      reject(new Error(error))
    }

    if (checkMatchingPassphrases(passphrase, passphrase2)) {
      rejectPromise('Passphrases do not match')
    } else if (validatePassphrase(passphrase)) {
      dispatch(showInfoNotification({ message: 'Generating encoded key...', dismissible: false }))
      setTimeout(() => {
        try {
          encryptWifAccount(wif, passphrase).then((result) => {
            dispatch(hideNotification({ noAnimation: true }))
            dispatch(newWallet(result))
            resolve()
          })
        } catch (e) {
          rejectPromise('The private key is not valid')
        }
      }, 500)
    } else {
      rejectPromise('Please choose a longer passphrase')
    }
  })
}

export const generateNewWallet = (passphrase: string, passphrase2: string) => (dispatch: DispatchType): Promise<*> => {
  return new Promise((resolve, reject) => {
    const rejectPromise = (error) => {
      dispatch(showErrorNotification({ message: error }))
      reject(new Error(error))
    }

    if (checkMatchingPassphrases(passphrase, passphrase2)) {
      rejectPromise('Passphrases do not match')
    } else if (validatePassphrase(passphrase)) {
      dispatch(showInfoNotification({ message: 'Generating encoded key...', dismissible: false }))
      setTimeout(() => {
        try {
          generateEncryptedWif(passphrase).then((result) => {
            dispatch(hideNotification({ noAnimation: true }))
            dispatch(newWallet(result))
            // dispatch(showSuccessNotification({ message: 'Wallet created successfully' }))
            resolve()
          })
        } catch (e) {
          rejectPromise('An error occured while trying to generate a new wallet')
        }
      }, 500)
    } else {
      rejectPromise('Please choose a longer passphrase')
    }
  })
}

// state getters
export const getWif = (state) => state.generateWallet.wif
export const getAddress = (state) => state.generateWallet.address
export const getPassphrase = (state) => state.generateWallet.passphrase
export const getEncryptedWif = (state) => state.generateWallet.encryptedWif
export const getGenerating = (state) => state.generateWallet.generating

const initialState = {
  wif: null,
  address: null,
  passphrase: null,
  encryptedWif: null,
  generating: false
}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case NEW_WALLET_KEYS:
      const newPrivateKey = generatePrivateKey()
      const newWif = getWIFFromPrivateKey(newPrivateKey)
      const encryptedWif = encryptWIF(newWif, action.passphrase)
      const loadAccount = getAccountFromWIFKey(newWif)
      return {
        ...state,
        wif: newWif,
        address: loadAccount.address,
        passphrase: action.passphrase,
        encryptedWif
      }
    case NEW_WALLET:
      return {
        ...state,
        wif: action.wif,
        address: action.address,
        passphrase: action.passphrase,
        encryptedWif: action.encryptedWif,
        generating: false
      }
    case SET_GENERATING:
      return {
        ...state,
        generating: action.state
      }
    case RESET_KEY:
      return { ...initialState }
    default:
      return state
  }
}
