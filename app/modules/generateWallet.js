// @flow
import storage from 'electron-json-storage'
import { wallet } from 'neon-js'
import { isEmpty } from 'lodash'

import { showErrorNotification, showInfoNotification, hideNotification, showSuccessNotification } from './notifications'

import { validatePassphraseLength } from '../core/wallet'
import { ROUTES, DEFAULT_WALLET } from '../core/constants'
import { Account } from '../core/schemas'

// Constants
export const NEW_WALLET_ACCOUNT = 'NEW_WALLET_ACCOUNT'
export const RESET_WALLET_ACCOUNT = 'RESET_WALLET_ACCOUNT'

// Actions

export function newWalletAccount (account: Object) {
  return {
    type: NEW_WALLET_ACCOUNT,
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
    type: RESET_WALLET_ACCOUNT
  }
}

// Utils
export const walletHasKey = (wallet: Object, key: string) =>
  wallet.accounts.some(account => account.key === key)

export const saveAccount = (label: string, address: string, key: string) => (dispatch: DispatchType) => {
  if (!label || !address || !key) { return null }

  const newAccount = new Account({
    address,
    label,
    key
  })

  return storage.get('userWallet', (readError, data) => {
    if (readError) {
      dispatch(showErrorNotification({ message: `Error loading wallet: ${readError.message}` }))
    }

    if (!walletHasKey(data, newAccount.key)) {
      data.accounts.push(newAccount)
    } else {
      dispatch(showErrorNotification({ message: `Error saving wallet: '${newAccount.address}' already exists` }))
      return
    }

    storage.set('userWallet', data, (saveError) => {
      if (saveError) {
        dispatch(showErrorNotification({ message: `Error saving wallet: ${saveError.message}` }))
      } else {
        dispatch(showSuccessNotification({ message: `Saved key as ${label}` }))
      }
    })
  })
}

export const convertOldWalletAccount = (label: string, key: string, isDefault: boolean) => {
  if (!key || typeof key !== 'string') return
  return new Account({
    address: '', // Unfortunately all we have is the encrypted private keys, so no way to get this for now.
    label,
    isDefault, // Make the first account the default
    key
  })
}

export const upgradeUserWalletNEP6 = (): Promise<*> => {
  return new Promise((resolve, reject) => {
    storage.get('userWallet', (readNEP6Error, data) => {
      if (readNEP6Error) {
        reject(readNEP6Error)
      }

      if (isEmpty(data)) {
        storage.get('keys', (readLegacyError, keyData) => {
          if (readLegacyError) {
            reject(readLegacyError)
          }
          const wallet = {...DEFAULT_WALLET}

          if (isEmpty(keyData)) {
            // create empty nep-6 wallet
            storage.set('userWallet', wallet)
          } else {
            const accounts = []
            Object.keys(keyData).map((label: string) => {
              const newAccount = convertOldWalletAccount(label, keyData[label], accounts.length === 0)
              if (newAccount) {
                accounts.push(newAccount)
              }
            })

            wallet.accounts = accounts

            storage.set('userWallet', wallet, (saveError) => {
              if (saveError) {
                reject(saveError)
              } else {
                resolve()
              }
            })
          }
        })
      } else {
        resolve()
      }
    })
  })
}

export const recoverWallet = (wallet: Object): Promise<*> => {
  return new Promise((resolve, reject) => {
    storage.get('userWallet', (readError, data) => {
      if (readError) {
        reject(readError)
      }

      let accounts = []

      // If for some reason we have no NEP-6 wallet stored, create a default.
      if (!data) {
        data = {...DEFAULT_WALLET}
      }

      if (!wallet.accounts) {
        // Load the old wallet type
        Object.keys(wallet).map((label: string) => {
          const isDefault = accounts.length === 0 && wallet.length === 0
          const newAccount = convertOldWalletAccount(label, wallet[label], isDefault)
          if (newAccount && newAccount.key) {
            accounts.push(newAccount)
          }
        })
      } else {
        accounts = wallet.accounts
      }

      if (!accounts.length) {
        reject(Error('No accounts found in recovery file.'))
      }

      accounts.some((account) => {
        if (!walletHasKey(data, account.key)) {
          data.accounts.push(account)
        }
      })

      storage.set('userWallet', data, (saveError) => {
        if (saveError) {
          reject(saveError)
        } else {
          resolve(data)
        }
      })
    })
  })
}

export const generateNewWalletAccount = (passphrase: string, passphrase2: string, wif?: string, history: Object) => (dispatch: DispatchType) => {
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
    const infoNotificationId: any = dispatch(showInfoNotification({ message: 'Generating encoded key...', autoDismiss: 0 }))
    setTimeout(() => {
      try {
        const account = new wallet.Account(wif || wallet.generatePrivateKey())
        const { WIF, address } = account
        const encryptedWIF = wallet.encrypt(WIF, passphrase)

        dispatch(hideNotification(infoNotificationId))
        dispatch(newWalletAccount({
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
    case NEW_WALLET_ACCOUNT: {
      const { passphrase, wif, address, encryptedWIF } = action.payload
      return {
        ...state,
        wif,
        address,
        passphrase,
        encryptedWIF
      }
    }
    case RESET_WALLET_ACCOUNT: {
      return { ...initialState }
    }
    default:
      return state
  }
}
