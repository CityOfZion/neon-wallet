// @flow
import { map } from 'lodash'

import { toBigNumber } from './math'
import { COIN_DECIMAL_LENGTH } from './formatters'
import { TOKENS, TOKENS_TEST, MAIN_NETWORK_ID, TEST_NETWORK_ID } from './constants'

export const adjustDecimalAmountForTokenTransfer = (value: string): string =>
  toBigNumber(value).times(10 ** COIN_DECIMAL_LENGTH).round().toNumber()

const getTokenEntry = ((): Function => {
  let id = 1

  return (symbol: string, scriptHash: string, networkId: string) => ({
    id: `${id++}`,
    symbol,
    scriptHash,
    networkId,
    isUserGenerated: false
  })
})()

export const getDefaultTokens = (): Array<TokenItemType> => {
  const tokens = []

  tokens.push(...map(TOKENS, (scriptHash, symbol) => getTokenEntry(symbol, scriptHash, MAIN_NETWORK_ID)))
  tokens.push(...map(TOKENS_TEST, (scriptHash, symbol) => getTokenEntry(symbol, scriptHash, TEST_NETWORK_ID)))

  return tokens
}
