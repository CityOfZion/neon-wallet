// @flow
import { wallet } from 'neon-js'
import { noop } from 'lodash'
import { createActions } from 'spunky'

import { upgradeNEP6AddAddresses, saveAccount } from '../core/account'
import { validatePassphraseLength } from '../core/wallet'
import { ledgerNanoSCreateSignatureAsync } from '../ledger/ledgerNanoS'
import { ROUTES } from '../core/constants'

import { newWalletAccount } from '../modules/generateWallet'

type WifLoginProps = {
  wif: string
}

type LedgerLoginProps = {
  publicKey: string,
  signingFunction: Function
}

type Nep2LoginProps = {
  passphrase: string,
  encryptedWIF: string,
  label?: string,
  callback?: Function
}

type AccountType = ?{
  address: string,
  wif?: string,
  publicKey?: string,
  signingFunction?: Function,
  isHardwareLogin: boolean
}

export const ID = 'AUTH'

export const wifLoginActions = createActions(ID, ({ wif }: WifLoginProps) => (state: Object): AccountType => {
  if (!wallet.isWIF(wif) && !wallet.isPrivateKey(wif)) {
    throw new Error('That is not a valid private key')
  }

  const account = new wallet.Account(wif)

  return { wif: account.WIF, address: account.address, isHardwareLogin: false }
})

export const nep2LoginActions = createActions(ID, ({ passphrase, encryptedWIF, label, callback }: Nep2LoginProps) => async (state: Object): Promise<AccountType> => {
  if (!validatePassphraseLength(passphrase)) {
    throw new Error('Passphrase too short')
  }

  if (!wallet.isNEP2(encryptedWIF)) {
    throw new Error('That is not a valid encrypted key')
  }

  const wif = wallet.decrypt(encryptedWIF, passphrase)
  const account = new wallet.Account(wif)
  const { address } = account
  let accounts
  if (label) {
    try {
      accounts = await saveAccount(label, address, encryptedWIF)
      // Execute on next thread
      await setTimeout(() => {
        callback && callback(accounts)
      }, 100)
    } catch (error) {
      if (error.message !== `Address '${address}' already exists.`) {
        throw error
      }
    }
  }

  await upgradeNEP6AddAddresses(encryptedWIF, wif)

  return { wif: account.WIF, address, isHardwareLogin: false }
})

export const nep2DetailsLoginActions = (passphrase: string, encryptedWIF: string, history: Object) => (dispatch: DispatchType): Promise<*> => {
  return new Promise((resolve, reject) => {
    if (!validatePassphraseLength(passphrase)) {
      reject(new Error('Passphrase too short'))
    }

    if (!wallet.isNEP2(encryptedWIF)) {
      reject(new Error('That is not a valid encrypted key'))
    }

    try {
      const wif = wallet.decrypt(encryptedWIF, passphrase)
      const account = new wallet.Account(wif)
      const { address } = account

      dispatch(newWalletAccount({
        wif,
        address,
        passphrase,
        encryptedWIF
      }))
      history.push(ROUTES.DISPLAY_WALLET_KEYS)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

export const ledgerLoginActions = createActions(ID, ({ publicKey }: LedgerLoginProps) => (state: Object): AccountType => {
  const publicKeyEncoded = wallet.getPublicKeyEncoded(publicKey)
  const account = new wallet.Account(publicKeyEncoded)

  return { publicKey, address: account.address, signingFunction: ledgerNanoSCreateSignatureAsync, isHardwareLogin: true }
})

export const logoutActions = createActions(ID, () => (state: Object): AccountType => {
  return null
})

// TODO: Better way to expose action data than to make a faux function?  One idea is to change
//       `withData` to accept the `ID` exported from this file instead of a generated action.
export default createActions(ID, () => (state: Object) => noop)
