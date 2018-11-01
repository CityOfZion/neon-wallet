// @flow
import { ASSETS } from './constants'
import { toBigNumber } from './math'

export const COIN_DECIMAL_LENGTH = 8
export const SHORT_DISPLAY_DECIMAL_LENGTH = 4

type ValueType = string | number

export const formatGAS = (
  value: ValueType,
  shortDisplay: boolean = false
): string => {
  const decimals = shortDisplay
    ? SHORT_DISPLAY_DECIMAL_LENGTH
    : COIN_DECIMAL_LENGTH
  return toBigNumber(value).toFormat(decimals)
}

export const formatToRoundedShortNumber = (value: number): string => {
  if (Number.isInteger(value)) return value.toString()
  return toBigNumber(value)
    .toFormat(SHORT_DISPLAY_DECIMAL_LENGTH)
    .toString()
}

export const formatThousands = (value: ValueType): string =>
  toBigNumber(value).toFormat(0)

export const formatNEO = (value: ValueType): string =>
  toBigNumber(value).toFormat(0)

export const formatBalance = (
  symbol: SymbolType,
  balance: ValueType,
  shortDisplay: boolean = false
): string => {
  if (symbol === ASSETS.NEO) {
    return formatNEO(balance)
  }
  return formatGAS(balance, shortDisplay)
}

export const toFixedDecimals = (
  value: ValueType,
  decimals: number = COIN_DECIMAL_LENGTH
): string => toBigNumber(value).toFixed(decimals)

export const formatFiat = (value: ValueType = 0): string =>
  toBigNumber(value).toFormat(2)
