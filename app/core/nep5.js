// @flow
import { toBigNumber } from './math'

export const adjustDecimalAmountForTokenTransfer = (value: string, decimals: number): string =>
  toBigNumber(value).times(10 ** decimals).round().toNumber()
