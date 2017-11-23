// @flow
import { truncateNumber } from './math'
import numeral from 'numeral'

const GAS_DECIMAL_LENGTH = 7
const GAS_DECIMAL_SHORT_DISPLAY_LENGTH = 4

export const formatGAS = (gas: number | string, shortDisplay: boolean = false): string => {
  const decimalLength = shortDisplay ? GAS_DECIMAL_SHORT_DISPLAY_LENGTH : GAS_DECIMAL_LENGTH
  const customTruncatedNumber = truncateNumber(parseFloat(gas), decimalLength).toFixed(decimalLength)
  return numeral(customTruncatedNumber).format('0,0.' + Array(decimalLength + 1).join('0'))

}

export const formatNEO = (neo: number | string): string => numeral(neo).format('0,0')

export const formatFiat = (value: number | string): string => numeral(value).format('0,0.00')
