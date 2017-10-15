// @flow
const GAS_DECIMAL_LENGTH = 7

export const formatGAS = (gas: number | string): string => parseFloat(gas).toFixed(GAS_DECIMAL_LENGTH)
export const formatNEO = (neo: number | string): number => parseInt(neo, 10)
