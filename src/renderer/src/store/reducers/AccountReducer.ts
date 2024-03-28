import { BlockchainService, waitForTransaction } from '@cityofzion/blockchain-service'
import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { TUseTransactionsTransfer } from '@renderer/@types/hooks'
import { IAccountState } from '@renderer/@types/store'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { getI18next } from '@renderer/libs/i18next'

export interface IAccountReducer {
  data: IAccountState[]
  pendingTransactions: TUseTransactionsTransfer[]
}

type TWatchPendingTransactionParams = {
  transactionHash: string
  blockchainService: BlockchainService<TBlockchainServiceKey>
}

export const accountReducerName = 'accountReducer'

const initialState = {
  data: [],
  pendingTransactions: [],
} as IAccountReducer

const { t } = getI18next()

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

const deleteAccounts: CaseReducer<IAccountReducer, PayloadAction<string[]>> = (state, action) => {
  const addresses = action.payload
  state.data = state.data.filter(account => !addresses.includes(account.address))
}

const addPendingTransaction: CaseReducer<IAccountReducer, PayloadAction<TUseTransactionsTransfer>> = (
  state,
  action
) => {
  state.pendingTransactions = [...state.pendingTransactions, action.payload]
}

const removeAllPendingTransactions: CaseReducer<IAccountReducer> = state => {
  state.pendingTransactions = []
}

const watchPendingTransaction = createAsyncThunk(
  'accounts/watchPendingTransaction',
  async ({ transactionHash, blockchainService }: TWatchPendingTransactionParams) => {
    const success = await waitForTransaction(blockchainService, transactionHash)

    if (success) {
      ToastHelper.success({ message: t('pages:send.transactionCompleted') })
    } else {
      ToastHelper.error({ message: t('pages:send.transactionFailed') })
    }

    return transactionHash
  }
)

const AccountReducer = createSlice({
  name: accountReducerName,
  initialState,
  reducers: {
    deleteAccount,
    deleteAccounts,
    saveAccount,
    reorderAccounts,
    addPendingTransaction,
    removeAllPendingTransactions,
  },
  extraReducers(builder) {
    builder.addCase(watchPendingTransaction.fulfilled, (state, action) => {
      const transactionHash = action.payload
      state.pendingTransactions = state.pendingTransactions.filter(transaction => transaction.hash !== transactionHash)
    })
  },
})

export const accountReducerActions = {
  ...AccountReducer.actions,
  watchPendingTransaction,
}
export default AccountReducer.reducer
