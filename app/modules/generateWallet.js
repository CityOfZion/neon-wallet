// @flow
import storage from 'electron-json-storage'
import { generateEncryptedWif, getAccountFromWIFKey, generatePrivateKey, getWIFFromPrivateKey, encryptWIF, encryptWifAccount } from 'neon-js'
import { showErrorNotification, showInfoNotification, hideNotification, showSuccessNotification } from './notifications'
import { validatePassphrase, checkMatchingPassphrases } from '../core/wallet'
import asyncWrap from '../core/asyncHelper'

// Constants
export const NEW_WALLET_KEYS = 'NEW_WALLET_KEYS'
export const NEW_WALLET = 'NEW_WALLET'
export const SET_GENERATING = 'SET_GENERATING'
export const RESET_KEY = 'RESET_KEY'

// Actions
export function newWalletKeys (passphrase: string) {
  return {
    type: NEW_WALLET_KEYS,
    payload: { passphrase }
  }
}

export function newWallet (account: Object) {
  return {
    type: NEW_WALLET,
    payload: {
      wif: account.wif,
      address: account.address,
      passphrase: account.passphrase,
      encryptedWif: account.encryptedWif
    }
  }
}

export function generating (generating: boolean) {
  return {
    type: SET_GENERATING,
    payload: { generating }
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
  return storage.get('keys', (error, data) => {
    data[keyName] = passphraseKey
    dispatch(showSuccessNotification({ message: `Saved key as ${keyName}` }))
    storage.set('keys', data)
  })
}

export const generateWalletFromWif = (passphrase: string, passphrase2: string, wif: string) => async (dispatch: DispatchType): Promise<*> => {
  const dispatchError = (message: string) => dispatch(showErrorNotification({ message }))

  if (checkMatchingPassphrases(passphrase, passphrase2)) {
    return dispatchError('Passphrases do not match')
  } else if (validatePassphrase(passphrase)) {
    const infoNotificationId = dispatch(showInfoNotification({ message: 'Generating encoded key...', autoDismiss: 0 }))
    setTimeout(async () => {
      try {
        const [_err, result] = await asyncWrap(encryptWifAccount(wif, passphrase)) // eslint-disable-line
        dispatch(hideNotification(infoNotificationId))
        return dispatch(newWallet(result))
      } catch (e) {
        return dispatchError('The private key is not valid')
      }
    }, 500)
  } else {
    return dispatchError('Please choose a longer passphrase')
  }
}

export const generateNewWallet = (passphrase: string, passphrase2: string) => async (dispatch: DispatchType): Promise<*> => {
  const dispatchError = (message: string) => dispatch(showErrorNotification({ message }))

  if (checkMatchingPassphrases(passphrase, passphrase2)) {
    return dispatchError('Passphrases do not match')
  } else if (validatePassphrase(passphrase)) {
    const infoNotificationId = dispatch(showInfoNotification({ message: 'Generating encoded key...', autoDismiss: 0 }))
    setTimeout(async () => {
      try {
        const [_err, result] = await asyncWrap(generateEncryptedWif(passphrase)) //eslint-disable-line
        dispatch(hideNotification(infoNotificationId))
        return dispatch(newWallet(result))
      } catch (e) {
        return dispatchError('An error occured while trying to generate a new wallet')
      }
    }, 500)
  } else {
    return dispatchError('Please choose a longer passphrase')
  }
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
    case NEW_WALLET_KEYS: {
      const { passphrase } = action.payload
      const newPrivateKey = generatePrivateKey()
      const newWif = getWIFFromPrivateKey(newPrivateKey)
      const encryptedWif = encryptWIF(newWif, passphrase)
      const loadAccount = getAccountFromWIFKey(newWif)
      return {
        ...state,
        wif: newWif,
        address: loadAccount.address,
        passphrase,
        encryptedWif
      }
    }
    case NEW_WALLET: {
      const { passphrase, wif, address, encryptedWif } = action.payload
      return {
        ...state,
        wif,
        address,
        passphrase,
        encryptedWif,
        generating: false
      }
    }
    case SET_GENERATING: {
      const { generating } = action.payload
      return {
        ...state,
        generating
      }
    }
    case RESET_KEY: {
      return { ...initialState }
    }
    default:
      return state
  }
}
