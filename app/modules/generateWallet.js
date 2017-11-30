// @flow
import storage from 'electron-json-storage'
import { wallet } from 'neon-js'

import { showErrorNotification, showInfoNotification, hideNotification, showSuccessNotification } from './notifications'

import { validatePassphraseLength } from '../core/wallet'
import { ROUTES } from '../core/constants'

// Constants
export const NEW_WALLET = 'NEW_WALLET'
export const RESET_KEY = 'RESET_KEY'

// Actions

export function newWallet (account: Object) {
  return {
    type: NEW_WALLET,
    payload: {
      wif: account.wif,
      address: account.address,
      passphrase: account.passphrase,
      encryptedWIF: account.encryptedWIF
    }
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

export const generateNewWallet = (passphrase: string, passphrase2: string, wif?: string, history: Object) => (dispatch: DispatchType) => {
  const dispatchError = (message: string) => {
    dispatch(showErrorNotification({ message }))
    return false
  }

  if (passphrase !== passphrase2) {
    return dispatchError('Passphrases do not match')
  } else if (!validatePassphraseLength(passphrase)) {
    return dispatchError('Please choose a longer passphrase')
  } else if (wif && !wallet.isWIF(wif)) {
    return dispatchError('The private key is not valid')
  } else {
    const infoNotificationId = dispatch(showInfoNotification({ message: 'Generating encoded key...', autoDismiss: 0 }))
    setTimeout(() => {
      try {
        const account = new wallet.Account(wif || wallet.generatePrivateKey())
        const { WIF, address } = account
        const encryptedWIF = wallet.encrypt(WIF, passphrase)

        dispatch(hideNotification(infoNotificationId))
        dispatch(newWallet({
          wif: WIF,
          address,
          passphrase,
          encryptedWIF
        }))
        history.push(ROUTES.DISPLAY_WALLET_KEYS)
        return true
      } catch (e) {
        return dispatchError('An error occured while trying to generate a new wallet')
      }
    }, 500)
  }
}

// state getters
export const getWIF = (state: Object) => state.generateWallet.wif
export const getAddress = (state: Object) => state.generateWallet.address
export const getPassphrase = (state: Object) => state.generateWallet.passphrase
export const getEncryptedWIF = (state: Object) => state.generateWallet.encryptedWIF

const initialState = {
  wif: null,
  address: null,
  passphrase: null,
  encryptedWIF: null
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case NEW_WALLET: {
      const { passphrase, wif, address, encryptedWIF } = action.payload
      return {
        ...state,
        wif,
        address,
        passphrase,
        encryptedWIF
      }
    }
    case RESET_KEY: {
      return { ...initialState }
    }
    default:
      return state
  }
}
