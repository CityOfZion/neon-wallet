// @flow
import { createActions } from 'spunky'
import { isEmpty } from 'lodash'

import { getStorage, setStorage } from '../core/storage'
import { DEFAULT_WALLET } from '../core/constants'
import { Account } from '../core/schemas'

type Props = {
  networkId: string
}

const STORAGE_KEY = 'userWallet'

const getWallet = async (): Promise<Object> => {
  return await getStorage(STORAGE_KEY) || DEFAULT_WALLET
}

const setWallet = async (wallet: Object) => {
  setStorage(STORAGE_KEY, wallet)
}

const walletHasKey = (wallet: Object, key: string) => {
  return wallet.accounts.some(account => account.key === key)
}

const walletHasLabel = (wallet: Object, label: string) => {
  return wallet.accounts.some(account => account.label === label)
}

export const ID = 'ACCOUNTS'

export const updateAccountsActions = createActions(ID, (accounts: Array<Object>) => async (): Promise<Array<Object>> => {
  const wallet = await getWallet()
  const newWallet = { ...wallet, accounts }
  await setStorage(STORAGE_KEY, newWallet)

  return accounts
})

export const saveAccountActions = createActions(ID, ({ label, address, key }: Object) => async () => {
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
})

export default createActions(ID, ({ networkId }: Props = {}) => async (): Promise<Object> => {
  const wallet = await getWallet()
  return wallet.accounts
})
