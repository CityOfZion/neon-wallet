// @flow
import { wallet } from '@cityofzion/neon-js'
import { noop } from 'lodash-es'
import { createActions } from 'spunky'

import { bindArgsFromN } from '../util/bindHelpers'
import { resetBalanceState } from './balancesActions'
import { upgradeNEP6AddAddresses } from '../core/account'
import { validatePassphraseLength } from '../core/wallet'
import { ledgerNanoSCreateSignatureAsync } from '../ledger/ledgerNanoS'

type WifLoginProps = {
  wif: string,
}

type WatchOnlyLoginProps = {
  address: string,
}

type LedgerLoginProps = {
  publicKey: string,
  signingFunction: Function,
  account: number,
}

type Nep2LoginProps = {
  passphrase: string,
  encryptedWIF: string,
}

type AccountType = ?{
  address: string,
  wif?: string,
  publicKey?: string,
  signingFunction?: Function,
  isHardwareLogin: boolean,
}

export const ID = 'auth'

export const wifLoginActions = createActions(
  ID,
  ({ wif }: WifLoginProps) => (): AccountType => {
    if (!wallet.isWIF(wif) && !wallet.isPrivateKey(wif)) {
      throw new Error('Invalid private key entered')
    }

    const account = new wallet.Account(wif)

    return {
      wif: account.WIF,
      address: account.address,
      isHardwareLogin: false,
    }
  },
)

export const watchOnlyLoginActions = createActions(
  ID,
  ({ address }: WatchOnlyLoginProps) => (): AccountType => {
    if (!wallet.isAddress(address)) {
      throw new Error('Invalid public key entered')
    }

    return {
      address,
      isHardwareLogin: false,
    }
  },
)

export const nep2LoginActions = createActions(
  ID,
  ({ passphrase, encryptedWIF }: Nep2LoginProps) => async (): Promise<
    AccountType,
  > => {
    if (!validatePassphraseLength(passphrase)) {
      throw new Error('Passphrase too short')
    }

    if (!wallet.isNEP2(encryptedWIF)) {
      throw new Error('Invalid encrypted key entered')
    }

    const wif = await wallet.decryptAsync(encryptedWIF, passphrase)
    const account = new wallet.Account(wif)

    await upgradeNEP6AddAddresses(encryptedWIF, wif)

    return {
      wif: account.WIF,
      address: account.address,
      isHardwareLogin: false,
    }
  },
)

export const ledgerLoginActions = createActions(
  ID,
  ({ publicKey, account }: LedgerLoginProps) => (): AccountType => {
    const publicKeyEncoded = wallet.getPublicKeyEncoded(publicKey)
    const walletAccount = new wallet.Account(publicKeyEncoded)

    return {
      publicKey,
      address: walletAccount.address,
      signingFunction: bindArgsFromN(
        ledgerNanoSCreateSignatureAsync,
        3,
        account,
      ),
      isHardwareLogin: true,
    }
  },
)

export const logoutActions = createActions(ID, () => (): AccountType => {
  resetBalanceState()
  return null
})

// TODO: Better way to expose action data than to make a faux function?  One idea is to change
//       `withData` to accept the `ID` exported from this file instead of a generated action.
export default createActions(ID, () => () => noop)
