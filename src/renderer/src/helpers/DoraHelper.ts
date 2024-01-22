export class DoraHelper {
  static buildTransactionUrl = (hash: string): string => {
    return 'https://dora.coz.io/transaction/neo3/mainnet/' + hash
  }
}
