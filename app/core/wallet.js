// @flow
import { ASSETS, TOKENS } from './constants'
import { getAccountFromWIFKey, verifyAddress } from 'neon-js'

const MIN_PASSPHRASE_LEN = 4

export const validatePassphrase = (passphrase: string): boolean => passphrase.length >= MIN_PASSPHRASE_LEN

export const checkMatchingPassphrases = (passphrase: string, passphrase2: string) => passphrase !== passphrase2

export const verifyPrivateKey = (wif: string): boolean => {
  if (!wif) {
    return false
  }
  const account = getAccountFromWIFKey(wif)
  return account !== -1 && account.address
}

export const isToken = (symbol: TokenSymbol) => Object.keys(TOKENS).includes(symbol)

export const obtainTokenBalance = (tokens: Array<TokenType>, symbol: TokenSymbol) => {
  if (!isToken(symbol)) {
    throw new Error(`${symbol} is not a valid token`)
  }
  return tokens.find((token: TokenType) => token.symbol === symbol)
}

export const validateTransactionBeforeSending = (neoBalance: number, gasBalance: number, tokenBalance: number, symbol: TokenSymbol, sendAddress: string, sendAmount: string) => {
  if (!sendAddress || !sendAmount) {
    return {
      error: 'Please specify an address and amount',
      valid: false
    }
  }

  if (symbol !== ASSETS.NEO && symbol !== ASSETS.GAS && !isToken(symbol)) {
    return {
      error: 'That asset is not NEO, GAS or NEP-5 Token',
      valid: false
    }
  }

  try {
    if (verifyAddress(sendAddress) !== true || sendAddress.charAt(0) !== 'A') {
      return {
        error: 'The address you entered was not valid.',
        valid: false
      }
    }
  } catch (e) {
    return {
      error: 'The address you entered was not valid.',
      valid: false
    }
  }

  if (symbol === ASSETS.NEO) {
    if (parseFloat(sendAmount) !== parseInt(sendAmount)) { // check for fractional neo
      return {
        error: 'You cannot send fractional amounts of NEO.',
        valid: false
      }
    }
    if (parseInt(sendAmount) > neoBalance) { // check for value greater than account balance
      return {
        error: 'You do not have enough NEO to send.',
        valid: false
      }
    }
  } else if (symbol === ASSETS.GAS) {
    if (parseFloat(sendAmount) > gasBalance) {
      return {
        error: 'You do not have enough GAS to send.',
        valid: false
      }
    }
  } else {
    if (parseFloat(sendAmount) > tokenBalance) {
      return {
        error: `You do not have enough ${symbol} to send.`,
        valid: false
      }
    }
  }

  if (parseFloat(sendAmount) < 0) { // check for negative asset
    return {
      error: 'You cannot send negative amounts of an asset.',
      valid: false
    }
  }

  return {
    error: '',
    valid: true
  }
}
