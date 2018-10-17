// @flow
import storage from 'electron-json-storage'
import { wallet } from 'neon-js'
import { isEmpty } from 'lodash-es'

import {
  showErrorNotification,
  showInfoNotification,
  hideNotification
} from './notifications'

import { validatePassphraseLength } from '../core/wallet'
import { ROUTES, DEFAULT_WALLET } from '../core/constants'
import { Account } from '../core/schemas'

// Actions
import { saveAccountActions, getWallet } from '../actions/accountsActions'

// Constants
export const NEW_WALLET_ACCOUNT = 'NEW_WALLET_ACCOUNT'
export const RESET_WALLET_ACCOUNT = 'RESET_WALLET_ACCOUNT'

export function newWalletAccount({
  account,
  isImport
}: {
  account: Object,
  isImport: boolean
}) {
  return {
    type: NEW_WALLET_ACCOUNT,
    payload: {
      wif: account.wif,
      address: account.address,
      passphrase: account.passphrase,
      encryptedWIF: account.encryptedWIF,
      walletName: account.walletName,
      isImport
    }
  }
}

export function resetKey() {
  return {
    type: RESET_WALLET_ACCOUNT
  }
}

// Utils
export const walletHasKey = (wallet: Object, key: string) =>
  wallet.accounts.some(account => account.key === key)

export const walletHasLabel = (wallet: Object, label: string) =>
  wallet.accounts.some(account => account.label === label)

export const convertOldWalletAccount = (
  label: string,
  key: string,
  isDefault: boolean
) => {
  if (!key || typeof key !== 'string') return
  return new Account({
    address: '', // Unfortunately all we have is the encrypted private keys, so no way to get this for now.
    label,
    isDefault, // Make the first account the default
    key
  })
}

export const upgradeUserWalletNEP6 = (): Promise<*> =>
  new Promise((resolve, reject) => {
    storage.get('userWallet', (readNEP6Error, data) => {
      if (readNEP6Error) {
        reject(readNEP6Error)
      }

      if (isEmpty(data)) {
        storage.get('keys', (readLegacyError, keyData) => {
          if (readLegacyError) {
            reject(readLegacyError)
          }
          const wallet = { ...DEFAULT_WALLET }

          if (isEmpty(keyData)) {
            // create empty nep-6 wallet
            storage.set('userWallet', wallet)
          } else {
            const accounts = []
            // eslint-disable-next-line
            Object.keys(keyData).map((label: string) => {
              const newAccount = convertOldWalletAccount(
                label,
                keyData[label],
                accounts.length === 0
              )
              if (newAccount) {
                accounts.push(newAccount)
              }
            })

            wallet.accounts = accounts

            storage.set('userWallet', wallet, saveError => {
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

export const recoverWallet = (wallet: Object): Promise<*> =>
  new Promise((resolve, reject) => {
    storage.get('userWallet', (readError, data) => {
      if (readError) {
        reject(readError)
      }

      let accounts: Array<any> = []

      // If for some reason we have no NEP-6 wallet stored, create a default.
      if (!data) {
        data = { ...DEFAULT_WALLET } // eslint-disable-line no-param-reassign
      }

      if (!wallet.accounts) {
        // Load the old wallet type
        // eslint-disable-next-line
        Object.keys(wallet).map((label: string) => {
          const isDefault = accounts.length === 0 && wallet.length === 0
          const newAccount = convertOldWalletAccount(
            label,
            wallet[label],
            isDefault
          )
          if (newAccount && newAccount.key) {
            accounts.push(newAccount)
          }
        })
      } else {
        accounts = wallet.accounts // eslint-disable-line
      }

      if (!accounts.length) {
        reject(Error('No accounts found in recovery file.'))
      }

      // eslint-disable-next-line
      accounts.some(account => {
        if (account.key && !walletHasKey(data, account.key)) {
          data.accounts.push(account)
        }
      })

      storage.set('userWallet', data, saveError => {
        if (saveError) {
          reject(saveError)
        } else {
          resolve(data)
        }
      })
    })
  })

export const generateNewWalletAccount = (
  passphrase: string,
  passphrase2: string,
  wif?: string,
  history: Object,
  walletName: string,
  authenticated: boolean = false,
  onFailure: () => any = () => undefined
) => (dispatch: DispatchType) => {
  const isImport = !!wif
  const dispatchError = (message: string) => {
    dispatch(showErrorNotification({ message }))
    return false
  }
  if (passphrase !== passphrase2) {
    onFailure()
    return dispatchError('Passphrases do not match')
  }
  if (!validatePassphraseLength(passphrase)) {
    onFailure()
    return dispatchError('Please choose a longer passphrase')
  }
  if (wif && !wallet.isWIF(wif)) {
    onFailure()
    return dispatchError('The private key is not valid')
  }
  const infoNotificationId: any = dispatch(
    showInfoNotification({
      message: 'Generating encoded key...',
      autoDismiss: 0
    })
  )
  setTimeout(async () => {
    try {
      const account = new wallet.Account(wif || wallet.generatePrivateKey())
      const { WIF, address } = account
      const encryptedWIF = wallet.encrypt(WIF, passphrase)

      const storedWallet = await getWallet()
      if (walletName && walletHasLabel(storedWallet, walletName)) {
        onFailure()
        return dispatchError('A wallet with this name already exists locally')
      }

      dispatch(
        saveAccountActions.call({
          isImport,
          label: walletName,
          address,
          key: encryptedWIF
        })
      )

      dispatch(hideNotification(infoNotificationId))
      dispatch(
        newWalletAccount({
          account: {
            wif: WIF,
            address,
            passphrase,
            encryptedWIF,
            walletName
          },
          isImport
        })
      )

      if (wif) history.push(ROUTES.HOME)
      if (authenticated) history.push(ROUTES.DISPLAY_WALLET_KEYS_AUTHENTICATED)
      else history.push(ROUTES.DISPLAY_WALLET_KEYS)
      return true
    } catch (e) {
      onFailure()
      console.error(e)
      return dispatchError(
        `An error occured while trying to ${
          isImport ? 'import' : 'generate'
        } a new wallet`
      )
    }
  }, 500)
}

// state getters
export const getWIF = (state: Object) => state.generateWallet.wif
export const getAddress = (state: Object) => state.generateWallet.address
export const getPassphrase = (state: Object) => state.generateWallet.passphrase
export const getWalletName = (state: Object) => state.generateWallet.walletName
export const getEncryptedWIF = (state: Object) =>
  state.generateWallet.encryptedWIF
export const getIsImport = (state: Object) => state.generateWallet.isImport

const initialState = {
  wif: null,
  address: null,
  passphrase: null,
  encryptedWIF: null,
  walletName: null,
  isImport: null
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case NEW_WALLET_ACCOUNT: {
      const {
        passphrase,
        wif,
        address,
        encryptedWIF,
        walletName,
        isImport
      } = action.payload
      return {
        ...state,
        wif,
        address,
        passphrase,
        encryptedWIF,
        walletName,
        isImport
      }
    }
    case RESET_WALLET_ACCOUNT: {
      return { ...initialState }
    }
    default:
      return state
  }
}
