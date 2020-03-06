// @flow
import { createActions } from 'spunky'
import { isEmpty } from 'lodash-es'

import { getStorage, setStorage } from '../core/storage'
import { DEFAULT_WALLET } from '../core/constants'
import { Account } from '../core/schemas'

// NOTE: in Neon 3.x we update the account storage key
// such that keys are retrieved from a new key value pair
const STORAGE_KEY = 'userWallet3'

export const getWallet = async (): Promise<Object> => {
  const wallet = await getStorage(STORAGE_KEY)
  if (!wallet || isEmpty(wallet)) {
    return DEFAULT_WALLET
  }
  return wallet
}

export const setWallet = async (wallet: Object) => {
  setStorage(STORAGE_KEY, wallet)
}

export const walletHasKey = (wallet: Object, key: string) =>
  wallet.accounts.some(account => account.key === key)

export const walletHasLabel = (wallet: Object, label: string) =>
  wallet.accounts.some(account => account.label === label)

export const ID = 'accounts'

export const updateAccountsActions = createActions(
  ID,
  (accounts: Array<Object>) => async (): Promise<Array<Object>> => {
    const wallet = await getWallet()
    const newWallet = { ...wallet, accounts }
    await setStorage(STORAGE_KEY, newWallet)

    return accounts
  },
)

export const saveAccountActions = createActions(
  ID,
  ({
    label,
    address,
    key,
  }: {
    label: string,
    address: string,
    key: string,
  }) => async () => {
    if (isEmpty(label)) {
      throw new Error('A valid name is required.')
    }

    if (isEmpty(address)) {
      throw new Error('A valid address is required.')
    }

    if (isEmpty(key)) {
      throw new Error('A valid key is required.')
    }

    const wallet = await getWallet()

    if (walletHasKey(wallet, key)) {
      throw new Error(`Address '${address}' already exists.`)
    }

    if (walletHasLabel(wallet, label)) {
      throw new Error(`Account '${label}' already exists.`)
    }

    wallet.accounts.push(new Account({ address, label, key }))
    await setWallet(wallet)

    return wallet.accounts
  },
)

export default createActions(ID, () => async (): Promise<Object> => {
  const wallet = await getWallet()
  return wallet.accounts
})
