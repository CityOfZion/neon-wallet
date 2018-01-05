// @flow
import { ASSETS } from './constants'
import { toBigNumber } from './math'

export const COIN_DECIMAL_LENGTH = 8
export const SHORT_DISPLAY_DECIMAL_LENGTH = 4

export const formatGAS = (
  value: string,
  shortDisplay: boolean = false
): string => {
  const decimals = shortDisplay
    ? SHORT_DISPLAY_DECIMAL_LENGTH
    : COIN_DECIMAL_LENGTH
  return toBigNumber(value).toFormat(decimals)
}

export const formatThousands = (value: string): string =>
  toBigNumber(value).toFormat(0)

export const formatNEO = (value: string): string =>
  toBigNumber(value).toFormat(0)

export const formatBalance = (
  symbol: SymbolType,
  balance: string,
  shortDisplay: boolean = false
): string => {
  if (symbol === ASSETS.NEO) {
    return formatNEO(balance)
  }
  return formatGAS(balance, shortDisplay)
}

export const toFixedDecimals = (value: string, decimals: number): string =>
  toBigNumber(value).toFixed(COIN_DECIMAL_LENGTH)

export const formatFiat = (value: string): string =>
  toBigNumber(value).toFormat(2)
