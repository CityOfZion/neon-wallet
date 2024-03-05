import { TSession, TSessionProposal } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { TBlockchainServiceKey, TNetworkType } from '@renderer/@types/blockchain'
import {
  TWalletConnectHelperProposalInformation,
  TWalletConnectHelperSessionInformation,
} from '@renderer/@types/helpers'

export abstract class WalletConnectHelper {
  static blockchainsByBlockchainServiceKey: Partial<Record<TBlockchainServiceKey, string>> = {
    neo3: 'neo3',
    ethereum: 'eip155',
  }

  static networksByBlockchainServiceKey: Partial<Record<TBlockchainServiceKey, Record<TNetworkType, string>>> = {
    neo3: {
      mainnet: 'mainnet',
      testnet: 'testnet',
    },
    ethereum: {
      mainnet: '1',
      testnet: '5',
    },
  }

  static getAccountInformationFromSession(session: TSession): TWalletConnectHelperSessionInformation {
    const accounts = Object.values(session.namespaces)[0].accounts
    if (!accounts) throw new Error('Accounts not found')

    const account = accounts[0]
    const [sessionBlockchain, sessionNetwork, sessionAddress] = account.split(':')

    const blockchainByBlockchainServiceKey = Object.entries(this.blockchainsByBlockchainServiceKey).find(
      ([, value]) => value === sessionBlockchain
    )
    if (!blockchainByBlockchainServiceKey) throw new Error('Blockchain not supported')

    const blockchain = blockchainByBlockchainServiceKey[0] as TBlockchainServiceKey

    const networks = this.networksByBlockchainServiceKey[blockchain]
    if (!networks) throw new Error('Blockchain not supported')

    const networkByNetworkType = Object.entries(networks).find(entry => entry[1] === sessionNetwork)
    if (!networkByNetworkType) throw new Error('Network not supported')

    const network = networkByNetworkType[0] as TNetworkType

    return {
      address: sessionAddress,
      blockchain,
      network,
    }
  }

  static getInformationFromProposal(proposal: TSessionProposal): TWalletConnectHelperProposalInformation {
    const namespace = Object.values(proposal.params.requiredNamespaces)[0]
    const optionsNamespace = Object.values(proposal.params.optionalNamespaces)[0]

    const chains = namespace.chains
    if (!chains) throw new Error('Chains not found')

    const methods = namespace.methods.concat(optionsNamespace?.methods ?? [])
    const chain = chains[0]

    const [proposalBlockchain, proposalNetwork] = chain.split(':')

    const blockchainByBlockchainServiceKey = Object.entries(this.blockchainsByBlockchainServiceKey).find(
      ([, value]) => value === proposalBlockchain
    )
    if (!blockchainByBlockchainServiceKey) throw new Error('Blockchain not supported')

    const blockchain = blockchainByBlockchainServiceKey[0] as TBlockchainServiceKey

    const networks = this.networksByBlockchainServiceKey[blockchain]
    if (!networks) throw new Error('Blockchain not supported')

    const networkByNetworkType = Object.entries(networks).find(entry => entry[1] === proposalNetwork)
    if (!networkByNetworkType) throw new Error('Network not supported')

    const network = networkByNetworkType[0] as TNetworkType

    return {
      blockchain,
      network,
      chain,
      methods,
      proposalBlockchain,
      proposalNetwork,
    }
  }

  static isValidURI(uri: string) {
    if (uri.startsWith('wc')) {
      return true
    }

    return false
  }
}
