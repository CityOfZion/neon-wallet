// @flow
import { ASSETS, TOKENS } from './constants'
import { wallet } from 'neon-js'

const MIN_PASSPHRASE_LEN = 4

export const validatePassphraseLength = (passphrase: string): boolean => passphrase.length >= MIN_PASSPHRASE_LEN

export const isToken = (symbol: SymbolType) => Object.keys(TOKENS).includes(symbol)

export const obtainBalance = (balances: Object, symbol: SymbolType) => {
  return balances[symbol] || 0
}

export const validateTransactionBeforeSending = (balance: number, sendEntry: SendEntryType) => {
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

  if (symbol === ASSETS.NEO && parseFloat(amount) !== parseInt(amount)) { // check for fractional NEO
    return 'You cannot send fractional amounts of NEO.'
  }

  if (parseFloat(amount) > balance) {
    return `You do not have enough ${symbol} to send.`
  }

  if (parseFloat(amount) <= 0) { // check for negative/zero asset
    return 'You cannot send zero or negative amounts of an asset.'
  }

  return null
}

export const validateTransactionsBeforeSending = (balances: Object, sendEntries: Array<SendEntryType>) => {
  const getValidationError = (sendEntry) => {
    const balance = obtainBalance(balances, sendEntry.symbol)
    return validateTransactionBeforeSending(balance, sendEntry)
  }

  const errorEntry = sendEntries.find(getValidationError)

  return errorEntry ? getValidationError(errorEntry) : null
}
