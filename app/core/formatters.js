// @flow
const GAS_DECIMAL_LENGTH = 7
const FIAT_DECIMAL_LENGTH = 2

export const formatGAS = (gas: number | string): string => parseFloat(gas).toFixed(GAS_DECIMAL_LENGTH)
export const formatNEO = (neo: number | string): number => parseInt(neo, 10)
export const formatFiat = (value: number | string): string => parseFloat(value).toFixed(FIAT_DECIMAL_LENGTH)
