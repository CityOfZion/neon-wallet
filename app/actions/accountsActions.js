// @flow
import { createActions } from 'spunky'

import { getStorage, setStorage } from '../core/storage'
import { saveAccount, updateAccount, getWallet } from '../core/account'

type Props = {
  networkId: string
}

export const ID = 'ACCOUNTS'

export const updateAccountsActions = createActions(ID, (accounts: Array<Object>) => async (): Promise<Array<Object>> => {
  await updateAccount(accounts)
  return accounts
})

export const saveAccountActions = createActions(ID, ({ label, address, key }: Object) => async (): Promise<Array<Object>> => {
  return await saveAccount(label, address, key)
})

export default createActions(ID, ({ networkId }: Props = {}) => async (): Promise<Object> => {
  const wallet = await getWallet()
  return wallet.accounts
})
