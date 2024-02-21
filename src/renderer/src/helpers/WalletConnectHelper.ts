import { Blockchain, TSession, TSessionProposal } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { TBlockchainServiceKey, TNetworkType } from '@renderer/@types/blockchain'
import {
  TWalletConnectHelperAccountInformation,
  TWalletConnectHelperProposalInformation,
} from '@renderer/@types/helpers'

export abstract class WalletConnectHelper {
  static blockchainsByBlockchainServiceKey: Partial<Record<TBlockchainServiceKey, Blockchain>> = {
    neo3: 'neo3',
  }

  static networksByBlockchainServiceKey: Partial<Record<TBlockchainServiceKey, Record<TNetworkType, string>>> = {
    neo3: {
      mainnet: 'mainnet',
      testnet: 'testnet',
    },
  }

  static getAccountInformationFromSession(session: TSession): TWalletConnectHelperAccountInformation[] {
    const accounts = Object.values(session.namespaces)[0].accounts
    const accountsInfos = accounts.map((account): TWalletConnectHelperAccountInformation => {
      const [namespace, reference, address] = account.split(':')

      const blockchain = (
        Object.entries(this.blockchainsByBlockchainServiceKey) as [TBlockchainServiceKey, Blockchain][]
      ).find(([, value]) => value === namespace)
      if (!blockchain) throw new Error('Blockchain not supported')

      if (!blockchain) throw new Error('Blockchain not supported')

      return {
        address,
        namespace,
        reference,
        chainId: `${namespace}:${reference}`,
        blockchain: blockchain[0],
      }
    })

    return accountsInfos
  }

  static getInformationFromProposal(proposal: TSessionProposal): TWalletConnectHelperProposalInformation {
    const namespace = Object.values(proposal.params.requiredNamespaces)[0]
    const chains = namespace.chains
    if (!chains) throw new Error('Chains not found')

    const methods = namespace.methods
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
