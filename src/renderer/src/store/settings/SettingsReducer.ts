import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISettingsState, RootState, TSecurityType } from '@renderer/@types/store'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'

type TLoginParam = {
  password: string
}

export const settingsReducerName = 'settingsReducer'

const initialState: ISettingsState = {
  encryptedPassword: undefined,
  securityType: 'none',
  isFirstTime: true,
}

const setEncryptedPassword: CaseReducer<ISettingsState, PayloadAction<string>> = (state, action) => {
  state.encryptedPassword = action.payload
}

const login = createAsyncThunk('settings/login', async ({ password }: TLoginParam, { getState }) => {
  const encryptedPassword = await window.api.encryptBasedOS(password)
  const {
    wallet: { data: wallets },
    account: { data: accounts },
    blockchain: { bsAggregator },
  } = getState() as RootState

  const walletPromises = wallets.map(async wallet => {
    if (!wallet.encryptedMnemonic) return
    const mnemonic = await window.api.decryptBasedEncryptedSecret(wallet.encryptedMnemonic, encryptedPassword)
    const isMnemonicValid = UtilsHelper.isMnemonic(mnemonic)
    if (!isMnemonicValid) throw new Error()
  })

  const accountPromises = accounts.map(async account => {
    if (!account.encryptedKey) return
    const key = await window.api.decryptBasedEncryptedSecret(account.encryptedKey, encryptedPassword)
    const service = bsAggregator.blockchainServicesByName[account.blockchain]
    const isKeyValid = service.validateKey(key)
    if (!isKeyValid) throw new Error()
  })

  await Promise.all([...walletPromises, ...accountPromises])
  return encryptedPassword
})

const logout: CaseReducer<ISettingsState> = state => {
  state.encryptedPassword = undefined
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
    setIsFirstTime,
    setSecurityType,
    setEncryptedPassword,
    logout,
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.encryptedPassword = action.payload
    })
  },
})

export const settingsReducerActions = {
  ...SettingsReducer.actions,
  login,
}

export default SettingsReducer.reducer
