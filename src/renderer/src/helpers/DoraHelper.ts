import { TBlockchainServiceKey } from '@renderer/@types/blockchain'

export class DoraHelper {
  static buildTransactionUrl = (hash: string, blockchain: TBlockchainServiceKey = 'neo3'): string => {
    if (blockchain !== 'neo3') {
      throw new Error('Blockchain is not supported')
    }

    return `https://dora.coz.io/transaction/neo3/mainnet/${hash}`
  }
  static buildNftUrl = (hash: string, id: string): string => {
    return `https://dora.coz.io/nft/neo3/mainnet/${hash}/${id}`
  }
}
