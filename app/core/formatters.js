// @flow
import { truncateNumber } from './math'
import numeral from 'numeral'

const DEFAULT_DECIMAL_LENGTH = 8
const GAS_DECIMAL_LENGTH = 8
const GAS_DECIMAL_SHORT_DISPLAY_LENGTH = 4

export const formatBalance = (value: number | string, precision?: number) => {
  return precision
    ? numeral(value).format('0,0.' + Array(precision + 1).join('0'))
    : numeral(value).format('0,0')
}

export const truncateTokenBalance = (value: number | string, precision?: number = DEFAULT_DECIMAL_LENGTH) => truncateNumber(parseFloat(value), precision).toFixed(precision)

export const truncateGAS = (GAS: number | string, precision?: number = GAS_DECIMAL_LENGTH) => truncateTokenBalance(GAS, precision)

export const formatGAS = (GAS: number | string, shortDisplay: boolean = false): string => {
  const precision = shortDisplay ? GAS_DECIMAL_SHORT_DISPLAY_LENGTH : GAS_DECIMAL_LENGTH
  return formatBalance(truncateGAS(GAS, precision), precision)
}

export const formatNEO = (NEO: number | string): string => formatBalance(NEO)

export const formatFiat = (value: number | string): string => numeral(value).format('0,0.00')
