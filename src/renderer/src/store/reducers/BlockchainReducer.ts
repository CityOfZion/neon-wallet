import { BSAggregator } from '@cityofzion/blockchain-service'
import { BSEthereum } from '@cityofzion/bs-ethereum'
import { BSNeoLegacy } from '@cityofzion/bs-neo-legacy'
import { BSNeo3 } from '@cityofzion/bs-neo3'
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TBlockchainServiceKey, TNetworkType } from '@renderer/@types/blockchain'
import { IBlockchainState } from '@renderer/@types/store'

export const blockchainReducerName = 'blockchainReducer'

const initialState = {
  bsAggregator: new BSAggregator<TBlockchainServiceKey>({
    neo3: new BSNeo3('neo3', { type: 'mainnet' }),
    neoLegacy: new BSNeoLegacy('neoLegacy', { type: 'mainnet' }),
    ethereum: new BSEthereum('ethereum', { type: 'mainnet' }, import.meta.env.BITQUERY_API_KEY ?? ''),
  }),
} as IBlockchainState

const updateBSAggregatorNetwork: CaseReducer<IBlockchainState, PayloadAction<TNetworkType>> = (state, action) => {
  const networkType = action.payload

  state.bsAggregator.blockchainServices.forEach(service => {
    service.setNetwork({ type: networkType })
  })
}

const BlockchainReducer = createSlice({
  name: blockchainReducerName,
  initialState,
  reducers: {
    updateBSAggregatorNetwork,
  },
})

export const blockchainReducerActions = {
  ...BlockchainReducer.actions,
}

export default BlockchainReducer.reducer
