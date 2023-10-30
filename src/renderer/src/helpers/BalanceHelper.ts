import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { Balance, MultiExchange, TokenBalance } from '@renderer/@types/query'
import { cloneDeep } from 'lodash'

import { Account } from '../store/account/Account'

export type BalanceConvertedToExchange = TokenBalance & {
  convertedAmount: number
}

export class BalanceHelper {
  static calculateTotalBalances(balances?: Balance[] | Balance, multiExchange?: MultiExchange, addresses?: string[]) {
    if (!balances || !multiExchange) return

    const tokensBalances = this.getTokensBalance(balances, addresses)

    return tokensBalances.reduce((prev, actual) => {
      const ratio = this.getExchangeRatio(actual.token.symbol, actual.blockchain, multiExchange)

      return prev + actual.amountNumber * ratio
    }, 0)
  }

  static getExchangeRatio(symbol: string, blockchain: TBlockchainServiceKey, multiExchange?: MultiExchange): number {
    if (!multiExchange) return 0

    const blockchainExchange = multiExchange[blockchain]
    if (!blockchainExchange) return 0

    const exchange = blockchainExchange.find(exchange => exchange.symbol === symbol)

    return exchange?.price ?? 0
  }

  static convertBalanceToCurrency(
    balance?: TokenBalance,
    multiExchange?: MultiExchange
  ): BalanceConvertedToExchange | undefined {
    if (!balance || !multiExchange) return

    const ratio = this.getExchangeRatio(balance.token.symbol, balance.blockchain, multiExchange)

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

    const tokensBalances = this.getTokensBalance(balances)

    const tokenBalanceWithoutRepeated = cloneDeep(tokensBalances).reduce<TokenBalance[]>((prev, current) => {
      const tokenBalance = prev.find(tokenBalance => tokenBalance.token.symbol === current.token.symbol)

      if (tokenBalance) {
        tokenBalance.amount += current.amount
      } else {
        prev.push(current)
      }

      return prev
    }, [])

    return tokenBalanceWithoutRepeated
      .map(tokenBalance => this.convertBalanceToCurrency(tokenBalance, multiExchange))
      .filter((tokenBalance): tokenBalance is BalanceConvertedToExchange => !!tokenBalance)
  }

  static getTokenBalanceBySymbol(symbol: string, balances?: Balance[] | Balance) {
    if (!balances) return

    const tokensBalances = this.getTokensBalance(balances)

    return tokensBalances.find(tokenBalance => tokenBalance.token.symbol === symbol)
  }

  static getTokensBalance(balances: Balance[] | Balance, addresses: string[] = []) {
    return Array.isArray(balances)
      ? balances.filter(balances => addresses.includes(balances.address)).flatMap(balance => balance.tokensBalances)
      : balances.tokensBalances
  }

  static getBalanceByAccount(account: Account, balances?: Balance[]) {
    if (!balances) return

    return balances.find(balance => balance.address === account.address)
  }

  static hasSomeBalance(balances?: Balance[] | Balance) {
    if (!balances) return false

    const tokensBalances = BalanceHelper.getTokensBalance(balances)

    return tokensBalances.some(tokenBalance => tokenBalance.amountNumber > 0)
  }
}
