// @flow
import { map } from 'lodash'

import { toBigNumber } from './math'
import { COIN_DECIMAL_LENGTH } from './formatters'
import { TOKENS, TOKENS_TEST, MAIN_NETWORK_ID, TEST_NETWORK_ID } from './constants'

let fetchedTokens
let requestToFetchTokens = false

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

export const getDefaultTokens = async (): Promise<Array<TokenItemType>> => {
  const tokens = []

  // Prevent duplicate requests here
  if (!fetchedTokens) {
    const response: any = await fetch('https://raw.githubusercontent.com/CityOfZion/neo-tokens/master/tokenList.json').catch(e => {
      console.error(e)
      fetchedTokens = TOKENS
    })
    if (!response) fetchedTokens = TOKENS
    requestToFetchTokens = true
    fetchedTokens = await response.json()
  }

  if (!requestToFetchTokens) {
    tokens.push(...map(TOKENS, (scriptHash, symbol) => getTokenEntry(symbol, scriptHash, MAIN_NETWORK_ID)))
  } else {
    tokens.push(...map(fetchedTokens, (tokenData) => getTokenEntry(tokenData.symbol, tokenData.networks['1'].hash, MAIN_NETWORK_ID)))
  }

  tokens.push(...map(TOKENS_TEST, (scriptHash, symbol) => getTokenEntry(symbol, scriptHash, TEST_NETWORK_ID)))

  return tokens
}
