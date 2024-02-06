import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { Balance, MultiExchange, TokenBalance } from '@renderer/@types/query'
import cloneDeep from 'lodash.clonedeep'

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

  static getTokensBalance(balances: Balance[] | Balance, addresses?: string[]) {
    let tokenBalances = Array.isArray(balances) ? balances : [balances]
    if (addresses) {
      tokenBalances = tokenBalances.filter(balances => addresses.includes(balances.address))
    }
    return tokenBalances.flatMap(balance => balance.tokensBalances)
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

  static convertBalancesToCurrency(
    balances?: Balance[] | Balance,
    multiExchange?: MultiExchange
  ): BalanceConvertedToExchange[] | undefined {
    if (!balances || !multiExchange) return

    const tokenBalances = this.getTokensBalance(balances)

    const clonedTokenBalances = cloneDeep(tokenBalances)
    const convertedBalancesToCurrency: BalanceConvertedToExchange[] = []

    clonedTokenBalances.forEach(item => {
      const converted = this.convertBalanceToCurrency(item, multiExchange)
      if (!converted) return
      convertedBalancesToCurrency.push(converted)
    })

    return convertedBalancesToCurrency
  }
}
