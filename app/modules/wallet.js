// @flow
import { syncTransactionHistory } from './transactions'

import { getAddress, getNetwork } from '../core/deprecated'

// Constants
export const SET_TRANSACTION_HISTORY = 'SET_TRANSACTION_HISTORY'

// Actions
export function setTransactionHistory (transactions: Array<Object>) {
  return {
    type: SET_TRANSACTION_HISTORY,
    payload: { transactions }
  }
}

export const loadWalletData = () => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  const state = getState()
  const net = getNetwork(state)
  const address = getAddress(state)

  dispatch(syncTransactionHistory(net, address))
  return true
}

// state getters
export const getTransactions = (state: Object) => state.wallet.transactions

type State = {
  transactions: Array<TransactionHistoryType>
}

const initialState = {
  transactions: []
}

export default (state: State = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_TRANSACTION_HISTORY:
      const { transactions } = action.payload
      return {
        ...state,
        transactions
      }
    default:
      return state
  }
}
