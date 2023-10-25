import { BSAggregator } from '@cityofzion/blockchain-service'
import { BSEthereum } from '@cityofzion/bs-ethereum'
import { BSNeoLegacy } from '@cityofzion/bs-neo-legacy'
import { BSNeo3 } from '@cityofzion/bs-neo3'
import { createSlice } from '@reduxjs/toolkit'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { IBlockchainState } from '@renderer/@types/store'

export const blockchainReducerName = 'blockchainReducer'

const initialState = {
  bsAggregator: new BSAggregator<TBlockchainServiceKey>({
    neo3: new BSNeo3('neo3', { type: 'mainnet' }),
    neoLegacy: new BSNeoLegacy('neoLegacy', { type: 'mainnet' }),
    ethereum: new BSEthereum('ethereum', { type: 'mainnet' }),
  }),
} as IBlockchainState

const BlockchainReducer = createSlice({
  name: blockchainReducerName,
  initialState,
  reducers: {},
})

export const blockchainReducerActions = {
  ...BlockchainReducer.actions,
}

export default BlockchainReducer.reducer
