// @flow
export const formatGAS = (gas: number) => Math.floor(parseFloat(gas) * 10000) / 10000
export const formatNEO = (neo: number) => parseInt(neo, 10)
