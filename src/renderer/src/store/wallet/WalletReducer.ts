import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IWalletState } from '@renderer/@types/store'

export const walletReducerName = 'walletReducer'

export interface IWalletReducer {
  data: IWalletState[]
}

const initialState = {
  data: [],
} as IWalletReducer

const saveWallet: CaseReducer<IWalletReducer, PayloadAction<IWalletState>> = (state, action) => {
  const wallet = action.payload

  const indexWallet = state.data.findIndex(it => it.id === wallet.id)
  if (indexWallet < 0) {
    state.data = [...state.data, wallet]
    return
  }

  state.data[indexWallet] = wallet
}

const deleteWallet: CaseReducer<IWalletReducer, PayloadAction<string>> = (state, action) => {
  const idWallet = action.payload
  state.data = state.data.filter(it => it.id !== idWallet)
}

const WalletReducer = createSlice({
  initialState,
  name: walletReducerName,
  reducers: {
    deleteWallet,
    saveWallet,
  },
})

export const WalletReducerSlice = WalletReducer

export const walletReducerActions = {
  ...WalletReducer.actions,
}
export default WalletReducer.reducer
