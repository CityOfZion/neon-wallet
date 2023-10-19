import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@renderer/@types/store'

import { Account } from './Account'

const rootState = (state: RootState) => state

export const selectAccounts = createSelector(rootState, state =>
  state.account.data.map(account => new Account(account))
)

export const selectAccountsByWalletId = (id: string) =>
  createSelector(rootState, state =>
    state.account.data.filter(account => account.idWallet === id).map(account => new Account(account))
  )
