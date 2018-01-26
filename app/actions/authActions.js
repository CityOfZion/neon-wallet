// @flow
import { wallet } from 'neon-js'
import { noop } from 'lodash'

import createRequestActions from '../util/api/createRequestActions'
import { upgradeNEP6AddAddresses } from '../core/account'
import { validatePassphraseLength } from '../core/wallet'

type WifLoginProps = {
  wif: string
}

type LedgerLoginProps = {
  publicKey: string,
  signingFunction: Function
}

type Nep2LoginProps = {
  passphrase: string,
  encryptedWIF: string
}

type AccountType = ?{
  address: string,
  wif?: string,
  publicKey?: string,
  signingFunction?: Function,
  isHardwareLogin: boolean
}

export const ID = 'AUTH'

export const wifLoginActions = createRequestActions(ID, ({ wif }: WifLoginProps) => (state: Object): AccountType => {
  const account = new wallet.Account(wif)

  return { wif, address: account.address, isHardwareLogin: false }
})

export const nep2LoginActions = createRequestActions(ID, ({ passphrase, encryptedWIF }: Nep2LoginProps) => async (state: Object): Promise<AccountType> => {
  if (!validatePassphraseLength(passphrase)) {
    throw new Error('Passphrase too short')
  }

  if (!wallet.isNEP2(encryptedWIF)) {
    throw new Error('That is not a valid encrypted key')
  }

  const wif = wallet.decrypt(encryptedWIF, passphrase)
  const account = new wallet.Account(wif)

  await upgradeNEP6AddAddresses(encryptedWIF, wif)

  return { wif, address: account.address, isHardwareLogin: false }
})

export const ledgerLoginActions = createRequestActions(ID, ({ publicKey, signingFunction }: LedgerLoginProps) => (state: Object): AccountType => {
  const publicKeyEncoded = wallet.getPublicKeyEncoded(publicKey)
  const account = new wallet.Account(publicKeyEncoded)

  return { address: account.address, publicKey, signingFunction, isHardwareLogin: true }
})

export const logoutActions = createRequestActions(ID, () => (state: Object): AccountType => {
  return null
})

// TODO: Better way to expose action data than to make a faux function?  One idea is to change
//       `withData` to accept the `ID` exported from this file instead of a generated action.
export default createRequestActions(ID, () => (state: Object) => noop)
