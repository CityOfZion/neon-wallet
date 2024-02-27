import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TNetworkType } from '@renderer/@types/blockchain'
import { ISettingsState, TSecurityType } from '@renderer/@types/store'

export const settingsReducerName = 'settingsReducer'

const initialState: ISettingsState = {
  encryptedPassword: undefined,
  securityType: 'none',
  isFirstTime: true,
  networkType: 'mainnet',
}

const setEncryptedPassword: CaseReducer<ISettingsState, PayloadAction<string | undefined>> = (state, action) => {
  state.encryptedPassword = action.payload
}

const setIsFirstTime: CaseReducer<ISettingsState, PayloadAction<boolean>> = (state, action) => {
  state.isFirstTime = action.payload
}

const setSecurityType: CaseReducer<ISettingsState, PayloadAction<TSecurityType>> = (state, action) => {
  state.securityType = action.payload
}

const setNetworkType: CaseReducer<ISettingsState, PayloadAction<TNetworkType>> = (state, action) => {
  state.networkType = action.payload
}

const SettingsReducer = createSlice({
  name: settingsReducerName,
  initialState,
  reducers: {
    setIsFirstTime,
    setSecurityType,
    setEncryptedPassword,
    setNetworkType,
  },
})

export const settingsReducerActions = {
  ...SettingsReducer.actions,
}

export default SettingsReducer.reducer
