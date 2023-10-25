import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@renderer/@types/store'

import { Wallet } from './Wallet'

const rootState = (state: RootState) => state

export const selectWallets = createSelector(rootState, state => state.wallet.data.map(wallet => new Wallet(wallet)))

export const selectWalletByID = (id: string) =>
  createSelector(rootState, state => {
    const foundWallet = state.wallet.data.find(wallet => wallet.id === id)

    if (foundWallet) {
      return new Wallet(foundWallet)
    }

    return
  })
