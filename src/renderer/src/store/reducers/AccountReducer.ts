import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAccountState } from '@renderer/@types/store'

export interface IAccountReducer {
  data: IAccountState[]
}

export const accountReducerName = 'accountReducer'

const initialState = {
  data: [],
} as IAccountReducer

const saveAccount: CaseReducer<IAccountReducer, PayloadAction<IAccountState>> = (state, action) => {
  const account = action.payload

  const findIndex = state.data.findIndex(it => it.address === account.address)
  if (findIndex < 0) {
    state.data = [...state.data, account]
    return
  }

  state.data[findIndex] = account
}

const reorderAccounts: CaseReducer<IAccountReducer, PayloadAction<string[]>> = (state, action) => {
  const accountsOrder = action.payload

  accountsOrder.forEach((address, index) => {
    const accountIndex = state.data.findIndex(it => it.address === address)
    if (accountIndex < 0) return

    state.data[accountIndex].order = index
  })
}

const deleteAccount: CaseReducer<IAccountReducer, PayloadAction<string>> = (state, action) => {
  const address = action.payload
  state.data = state.data.filter(account => account.address !== address)
}

const AccountReducer = createSlice({
  name: accountReducerName,
  initialState,
  reducers: {
    deleteAccount,
    saveAccount,
    reorderAccounts,
  },
})

export const accountReducerActions = {
  ...AccountReducer.actions,
}
export default AccountReducer.reducer
