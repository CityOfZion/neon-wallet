import { TBlockchainServiceKey, TNetworkType } from '@renderer/@types/blockchain'

type ColorsByType = { color: string; textColor: 'dark' | 'light' }

export class DoraHelper {
  static networkToDoraNetwork: Record<TNetworkType, string> = {
    mainnet: 'mainnet',
    testnet: 'testnet',
  }

  static colorsByType: Record<string, ColorsByType> = {
    Signature: {
      color: '#E9265C',
      textColor: 'dark',
    },
    Boolean: {
      color: '#D355E7',
      textColor: 'dark',
    },
    Integer: {
      color: '#B167F2',
      textColor: 'dark',
    },
    Hash160: {
      color: '#008529',
      textColor: 'light',
    },
    Null: {
      color: 'rgba(255, 255, 255, 0.08)',
      textColor: 'dark',
    },
    Hash256: {
      color: '#1DB5FF',
      textColor: 'dark',
    },
    ByteArray: {
      color: '#0DCDFF',
      textColor: 'dark',
    },
    PublicKey: {
      color: '#00D69D',
      textColor: 'dark',
    },
    String: {
      color: '#67DD8B',
      textColor: 'dark',
    },
    ByteString: {
      color: '#67DD8B',
      textColor: 'dark',
    },
    Array: {
      color: '#F28F00',
      textColor: 'dark',
    },
    Buffer: {
      color: '#F28F00',
      textColor: 'dark',
    },
    InteropInterface: {
      color: '#A50000',
      textColor: 'light',
    },
    Void: {
      color: '#528D93',
      textColor: 'dark',
    },
    Any: {
      color: '#00D69D',
      textColor: 'dark',
    },
  }

  static buildTransactionUrl = (
    hash: string,
    network: TNetworkType,
    blockchain: TBlockchainServiceKey = 'neo3'
  ): string => {
    if (blockchain !== 'neo3') {
      throw new Error('Blockchain is not supported')
    }

    return `https://dora.coz.io/transaction/neo3/${this.networkToDoraNetwork[network]}/${hash}`
  }

  static buildNftUrl = (hash: string, id: string, network: TNetworkType): string => {
    return `https://dora.coz.io/nft/neo3/${this.networkToDoraNetwork[network]}/${hash}/${id}`
  }

  static buildContractUrl = (hash: string, network: TNetworkType): string => {
    return `https://dora.coz.io/contract/neo3/${this.networkToDoraNetwork[network]}/${hash}`
  }
}
