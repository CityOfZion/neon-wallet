import { TBlockchainServiceKey, TNetworkType } from './blockchain'

export type TWalletConnectHelperSessionInformation = {
  address: string
  blockchain: TBlockchainServiceKey
  network: TNetworkType
}

export type TWalletConnectHelperProposalInformation = {
  chain: string
  methods: string[]
  blockchain: TBlockchainServiceKey
  network: TNetworkType
  proposalNetwork: string
  proposalBlockchain: string
}
