// @flow
import { map } from 'lodash-es'

import { toBigNumber } from './math'
import { COIN_DECIMAL_LENGTH } from './formatters'
import {
  TOKENS,
  TOKENS_TEST,
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
} from './constants'
import { imageMap } from '../assets/nep5/png'

export const adjustDecimalAmountForTokenTransfer = (value: string): string =>
  toBigNumber(value)
    .times(10 ** COIN_DECIMAL_LENGTH)
    .round()
    .toNumber()

const getTokenEntry = ((): Function => {
  let id = 1
  return (
    symbol: string,
    scriptHash: string,
    networkId: string,
    name: string,
    decimals: number,
  ) => ({
    id: `${id++}`, // eslint-disable-line no-plusplus
    symbol,
    scriptHash,
    networkId,
    isUserGenerated: false,
    image: imageMap[symbol],
    name,
    decimals,
  })
})()

export const getDefaultTokens = async (): Promise<Array<TokenItemType>> => {
  const tokens = []

  tokens.push(
    ...map(TOKENS, tokenData =>
      getTokenEntry(
        tokenData.symbol,
        tokenData.networks['1'].hash,
        MAIN_NETWORK_ID,

        tokenData.networks['1'].name,
        tokenData.networks['1'].decimals,
      ),
    ),
  )
  tokens.push(
    ...map(TOKENS_TEST, (scriptHash, symbol) =>
      getTokenEntry(symbol, scriptHash, TEST_NETWORK_ID),
    ),
  )

  return tokens
}
