// @flow
import { COIN_DECIMAL_LENGTH } from './formatters'
import { toBigNumber } from './math'

export const adjustDecimalAmountForTokenTransfer = (value: string): string =>
  toBigNumber(value).times(10 ** COIN_DECIMAL_LENGTH).toNumber()
