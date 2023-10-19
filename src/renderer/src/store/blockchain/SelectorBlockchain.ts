import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '@renderer/@types/store'

const rootState = (state: RootState) => state

export const selectBsAggregator = createSelector(rootState, state => state.blockchain.bsAggregator)
