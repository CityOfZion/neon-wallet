// @flow
import { wallet } from '@cityofzion/neon-js-legacy'
import { map, extend } from 'lodash-es'
import axios from 'axios'

import { ASSETS } from './constants'
import { toBigNumber } from './math'

import blacklist from '../util/blacklist'

export const MIN_PASSPHRASE_LEN = 4

let addressBlacklist: Array<string> | null = null

export const isBlacklisted = async (address: string): Promise<boolean> => {
  if (addressBlacklist === null) {
    const { data } = await axios.get(
      'https://raw.githubusercontent.com/CityOfZion/phishing/master/blockedAddresses.json',
    )
    if (data) {
      addressBlacklist = data
    } else {
      addressBlacklist = blacklist
    }
  }
  return addressBlacklist.includes(address)
}

export const validatePassphraseLength = (passphrase: string): boolean =>
  passphrase.length >= MIN_PASSPHRASE_LEN

export const isToken = (symbol: SymbolType) =>
  ![ASSETS.NEO, ASSETS.GAS].includes(symbol)

export const obtainBalance = (balances: Object, symbol: SymbolType) =>
  balances[symbol] || 0

export const getTokenBalancesMap = (tokenBalances: {
  [key: string]: TokenBalanceType,
}) =>
  extend(
    {},
    ...map(tokenBalances, ({ symbol, balance }) => ({ [symbol]: balance })),
  )

export const validateTransactionBeforeSending = (
  balance: number | string,
  sendEntry: SendEntryType,
) => {
  const { address, amount, symbol } = sendEntry

  if (!address || !amount) {
    return 'Please specify an address and amount.'
  }

  if (symbol !== ASSETS.NEO && symbol !== ASSETS.GAS && !isToken(symbol)) {
    return 'That asset is not NEO, GAS or NEP-5 Token.'
  }

  try {
    if (wallet.isAddress(address) !== true || address.charAt(0) !== 'A') {
      return 'The address you entered was not valid.'
    }
  } catch (e) {
    return 'The address you entered was not valid.'
  }

  if (symbol === ASSETS.NEO && !toBigNumber(amount).isInteger()) {
    // check for fractional NEO
    return 'You cannot send fractional amounts of NEO.'
  }

  if (toBigNumber(amount).gt(toBigNumber(balance))) {
    return `You do not have enough ${symbol} to send.`
  }

  if (toBigNumber(amount).lte(0)) {
    // check for negative/zero asset
    return 'You cannot send zero or negative amounts of an asset.'
  }

  return null
}

export const validateTransactionsBeforeSending = (
  balances: Object,
  sendEntries: Array<SendEntryType>,
) => {
  const getValidationError = sendEntry => {
    const balance = obtainBalance(balances, sendEntry.symbol)
    return validateTransactionBeforeSending(balance, sendEntry)
  }

  const errorEntry = sendEntries.find(getValidationError)

  return errorEntry ? getValidationError(errorEntry) : null
}
