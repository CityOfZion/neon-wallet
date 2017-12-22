// @flow
import { truncateNumber } from './math'

const GAS_DECIMAL_LENGTH = 7
const GAS_DECIMAL_SHORT_DISPLAY_LENGTH = 4

const FIAT_DECIMAL_LENGTH = 2

export const formatGAS = (gas: number | string, shortDisplay: boolean = false): string => {
  const decimalLength = shortDisplay ? GAS_DECIMAL_SHORT_DISPLAY_LENGTH : GAS_DECIMAL_LENGTH
  return truncateNumber(parseFloat(gas), decimalLength).toFixed(decimalLength)
}

export const formatNEO = (neo: number | string): number => parseInt(neo, 10)

export const formatFiat = (value: number | string): string => parseFloat(value).toFixed(FIAT_DECIMAL_LENGTH)
