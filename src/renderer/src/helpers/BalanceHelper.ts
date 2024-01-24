import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { Balance, MultiExchange, TokenBalance } from '@renderer/@types/query'

export type BalanceConvertedToExchange = TokenBalance & {
  convertedAmount: number
}

export class BalanceHelper {
  static calculateTotalBalances(balances?: Balance[] | Balance, multiExchange?: MultiExchange, addresses?: string[]) {
    if (!balances || !multiExchange) return

    const tokensBalances = this.getTokensBalance(balances, addresses)

    return tokensBalances.reduce((acc, actual) => {
      const ratio = this.getExchangeRatio(actual.token.hash, actual.blockchain, multiExchange)
      return acc + actual.amountNumber * ratio
    }, 0)
  }

  static getExchangeRatio(hash: string, blockchain: TBlockchainServiceKey, multiExchange?: MultiExchange): number {
    if (!multiExchange) return 0

    const blockchainExchange = multiExchange[blockchain]
    if (!blockchainExchange) return 0

    const exchange = blockchainExchange.find(exchange => exchange.hash === hash)

    return exchange?.price ?? 0
  }

  static getTokensBalance(balances: Balance[] | Balance, addresses: string[] = []) {
    return Array.isArray(balances)
      ? balances.filter(balances => addresses.includes(balances.address)).flatMap(balance => balance.tokensBalances)
      : balances.tokensBalances
  }

  static convertBalanceToCurrency(
    balance?: TokenBalance,
    multiExchange?: MultiExchange
  ): BalanceConvertedToExchange | undefined {
    if (!balance || !multiExchange) return

    const ratio = this.getExchangeRatio(balance.token.hash, balance.blockchain, multiExchange)

    return {
      ...balance,
      convertedAmount: balance.amountNumber * ratio,
    }
  }
}
