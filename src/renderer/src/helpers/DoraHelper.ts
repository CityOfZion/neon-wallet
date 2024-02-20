export class DoraHelper {
  static buildTransactionUrl = (hash: string): string => {
    return `https://dora.coz.io/transaction/neo3/mainnet/${hash}`
  }
  static buildNftUrl = (hash: string, id: string): string => {
    return `https://dora.coz.io/nft/neo3/mainnet/${hash}/${id}`
  }
}
