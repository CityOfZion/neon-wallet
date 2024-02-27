import { TBlockchainServiceKey, TNetworkType } from './blockchain'

export type TWalletConnectHelperAccountInformation = {
  namespace: string
  reference: string
  address: string
  chainId: string
  blockchain: TBlockchainServiceKey
}

export type TWalletConnectHelperProposalInformation = {
  chain: string
  methods: string[]
  blockchain: TBlockchainServiceKey
  network: TNetworkType
  proposalNetwork: string
  proposalBlockchain: string
}
