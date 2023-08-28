// @flow
import { create } from 'zustand'
import { isEmpty } from 'lodash-es'

import { getStorage, setStorage } from '../core/storage'
import { DEFAULT_WALLET } from '../core/constants'
import { Account } from '../core/schemas'

const STORAGE_KEY = 'userWallet'

export const getWallet = async (): Promise<Object> =>
  (await getStorage(STORAGE_KEY)) || DEFAULT_WALLET

export const setWallet = async (wallet: Object) => {
  setStorage(STORAGE_KEY, wallet)
}

export const walletHasKey = (wallet: Object, key: string) =>
  wallet.accounts.some(account => account.key === key)

export const walletHasLabel = (wallet: Object, label: string) =>
  wallet.accounts.some(account => account.label === label)

export const useAccountsStore = create(set => ({
  accounts: [],
  addAccount: async ({
    label,
    address,
    key,
  }: {
    label: string,
    address: string,
    key: string,
  }) => {
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
    const account = new Account({ label, address, key })
    wallet.accounts.push(account)
    await setWallet(wallet)
    set(state => ({
      accounts: [...state.accounts, account],
    }))
  },
  removeAccount: id =>
    set(state => ({
      accounts: state.accounts.filter(account => account.id !== id),
    })),
  updateAccount: async accounts => {
    const wallet = await getWallet()
    const newWallet = { ...wallet, accounts }
    await setStorage(STORAGE_KEY, newWallet)
    set(() => ({
      accounts,
    }))
  },
  getAccounts: async () => {
    const wallet = await getWallet()
    set(() => ({
      accounts: wallet.accounts,
    }))
  },
}))

useAccountsStore.getState().getAccounts()
