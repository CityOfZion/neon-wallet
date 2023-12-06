import { Blockchain, TSession } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'

type TAccountInformation = {
  namespace: string
  reference: string
  address: string
  chainId: string
  blockchain: TBlockchainServiceKey
}

export abstract class WalletConnectHelper {
  static blockchainsByBlockchainServiceKey: Partial<Record<TBlockchainServiceKey, Blockchain>> = {
    neo3: 'neo3',
  }

  static getAccountInformationFromSession(session: TSession): TAccountInformation[] {
    const accounts = Object.values(session.namespaces)[0].accounts
    const accountsInfos = accounts.map((account): TAccountInformation => {
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

  static isValidURI(uri: string) {
    if (uri.startsWith('wc')) {
      return true
    }

    return false
  }
}
