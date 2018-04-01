// @flow
import { createActions } from 'spunky'

import { getStorage, setStorage } from '../core/storage'
import { DEFAULT_WALLET } from '../core/constants'

type Props = {
  networkId: string
}

const STORAGE_KEY = 'userWallet'

const getWallet = async (): Promise<Object> => {
  return await getStorage(STORAGE_KEY) || DEFAULT_WALLET
}

export const ID = 'ACCOUNTS'

export const updateAccountsActions = createActions(ID, (accounts) => async (state: Object): Promise<Object> => {
  const userWallet = await getWallet()
  const newWallet = { ...userWallet, accounts }
  await setStorage(STORAGE_KEY, newWallet)

  return newWallet
})

export default createActions(ID, ({ networkId }: Props = {}) => async (state: Object): Promise<Object> => {
  const userWallet = await getWallet()
  return userWallet.accounts
})
