// @flow
import { ASSETS } from './constants'
import numeral from 'numeral'

import { truncateNumber } from './math'
import numeral from 'numeral'

export const COIN_DECIMAL_LENGTH = 8
export const SHORT_DISPLAY_DECIMAL_LENGTH = 4

const formatWithDecimals = (value: number | string, decimals: number) => numeral(value).format(`0,0.${'0'.repeat(decimals)}`)

export const formatGAS = (value: number | string, shortDisplay: boolean = false): string => {
  const decimals = shortDisplay ? SHORT_DISPLAY_DECIMAL_LENGTH : COIN_DECIMAL_LENGTH
  const result = formatWithDecimals(truncateNumber(value, decimals), decimals)
  // https://github.com/adamwdraper/Numeral-js/issues/575
  if (result === 'NaN') {
    return toFixedDecimals(value, decimals)
  }
  return result
}

export const formatThousands = (value: number | string): string => numeral(value).format('0,0')

export const formatNEO = (value: number | string): string => formatThousands(value)

export const formatBalance = (symbol: SymbolType, balance: number, shortDisplay: boolean = false) => {
  if (symbol === ASSETS.NEO) {
    return formatNEO(balance)
  }
  return formatGAS(balance, shortDisplay)
}

export const toFixedDecimals = (value: number | string, decimals: number) => truncateNumber(parseFloat(value), decimals).toFixed(decimals)

export const formatFiat = (value: number | string): string => numeral(value).format('0,0.00')
