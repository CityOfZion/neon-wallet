import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISettingsState, TSecurityType } from '@renderer/@types/store'

export const settingsReducerName = 'settingsReducer'

const initialState: ISettingsState = {
  encryptedPassword: undefined,
  securityType: 'none',
  isFirstTime: true,
}

const setEncryptedPassword: CaseReducer<ISettingsState, PayloadAction<string>> = (state, action) => {
  state.encryptedPassword = action.payload
}

const setIsFirstTime: CaseReducer<ISettingsState, PayloadAction<boolean>> = (state, action) => {
  state.isFirstTime = action.payload
}

const setSecurityType: CaseReducer<ISettingsState, PayloadAction<TSecurityType>> = (state, action) => {
  state.securityType = action.payload
}

const SettingsReducer = createSlice({
  name: settingsReducerName,
  initialState,
  reducers: {
    setEncryptedPassword,
    setIsFirstTime,
    setSecurityType,
  },
})

export const settingsReducerActions = {
  ...SettingsReducer.actions,
}

export default SettingsReducer.reducer
