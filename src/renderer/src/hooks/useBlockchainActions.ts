import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { TWalletType } from '@renderer/@types/store'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { accountReducerActions } from '@renderer/store/account/AccountReducer'
import { selectBsAggregator } from '@renderer/store/blockchain/SelectorBlockchain'
import { walletReducerActions } from '@renderer/store/wallet/WalletReducer'
import * as uuid from 'uuid'

import { Account } from '../store/account/Account'
import { selectAccounts } from '../store/account/SelectorAccount'
import { Wallet } from '../store/wallet/Wallet'

import useSelectorRef from './useSelectorRef'

export type TAccountToImport = {
  address: string
  blockchain: TBlockchainServiceKey
  wallet: Wallet
  type: TWalletType
  key?: string
  name?: string
}

export type TAccountToCreate = {
  wallet: Wallet
  name: string
  blockchain: TBlockchainServiceKey
  index?: number
}

export type TWalletToCreate = {
  name: string
  walletType: TWalletType
  mnemonic?: string
}

const accountColors = {
  0: '#00ddb4',
  1: '#22b1ff',
  2: '#7c4bfe',
  3: '#d355e7',
  4: '#fe872f',
  5: '#fedd5b',
  6: '#91abbc',
}

export function useBlockchainActions() {
  const dispatch = useDispatch()
  const accounts = useSelectorRef(selectAccounts)
  const bsAggregator = useSelectorRef(selectBsAggregator)
  const encryptedPassword = useSelectorRef(state => state.settings.encryptedPassword)

  const createWallet = useCallback(
    async ({ name, walletType, mnemonic }: TWalletToCreate) => {
      let encryptedMnemonic: string | undefined

      if (walletType === 'standard') {
        if (!mnemonic) throw new Error('Standard Wallet needs to have a security phrase')

        encryptedMnemonic = await window.api.encryptBasedEncryptedSecret(mnemonic, encryptedPassword.current)
      }

      const id = uuid.v4()

      const newWallet = new Wallet({
        name,
        walletType,
        id,
        encryptedMnemonic,
      })

      dispatch(walletReducerActions.saveWallet(newWallet.deserialize()))

      return newWallet
    },
    [dispatch, encryptedPassword]
  )

  const createAccount = useCallback(
    async ({ blockchain, name, wallet, index }: TAccountToCreate) => {
      if (wallet.walletType !== 'standard' || !wallet.encryptedMnemonic) throw new Error('Problem to create account')

      const mnemonic = await window.api.decryptBasedEncryptedSecret(wallet.encryptedMnemonic, encryptedPassword.current)

      const accountIndex =
        index ??
        accounts.current.filter(account => account.idWallet === wallet.id && account.blockchain === blockchain).length

      const service = bsAggregator.current.getBlockchainByName(blockchain)
      const generatedAccount = service.generateAccountFromMnemonic(mnemonic, accountIndex)

      const encryptedKey = await window.api.encryptBasedEncryptedSecret(generatedAccount.key, encryptedPassword.current)

      const newAccount = new Account({
        idWallet: wallet.id,
        name,
        blockchain,
        backgroundColor: accountColors[UtilsHelper.getRandomNumber(6)],
        address: generatedAccount.address,
        accountType: wallet.walletType,
        encryptedKey,
      })

      dispatch(accountReducerActions.saveAccount(newAccount.deserialize()))

      return newAccount
    },
    [dispatch, accounts, bsAggregator, encryptedPassword]
  )

  const importAccount = useCallback(
    async ({ address, blockchain, type, wallet, key, name }: TAccountToImport) => {
      let encryptedKey: string | undefined

      if (type === 'standard' || type === 'legacy') {
        if (!key) throw new Error('Key not defined')
        encryptedKey = await window.api.encryptBasedEncryptedSecret(key, encryptedPassword.current)
      }

      const newAccount = new Account({
        idWallet: wallet.id,
        name: name ?? `Account`,
        blockchain,
        backgroundColor: accountColors[UtilsHelper.getRandomNumber(6)],
        address,
        accountType: type,
        encryptedKey,
      })

      dispatch(accountReducerActions.saveAccount(newAccount.deserialize()))
      return newAccount
    },
    [dispatch, encryptedPassword]
  )

  const importAccounts = useCallback(
    async (accounts: TAccountToImport[]) => {
      const promises = accounts.map(account => importAccount(account))

      return await Promise.all(promises)
    },
    [importAccount]
  )

  return {
    createWallet,
    createAccount,
    importAccount,
    importAccounts,
  }
}
