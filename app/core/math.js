// @flow
import BigNumber from 'bignumber.js'

// https://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript
export const truncateNumber = (num: number, places: number): number =>
  Math.trunc(num * 10 ** places) / 10 ** places

// https://github.com/MikeMcl/bignumber.js/issues/11
export const toBigNumber = (value: number | string) =>
  new BigNumber(String(value))

export const toNumber = (value: string | number) =>
  toBigNumber(value).toNumber()

export const isZero = (amount: string | number) => toBigNumber(amount).equals(0)

export const isNumber = (value: string | number): boolean => {
  try {
    toBigNumber(value)
    return true
  } catch (e) {
    return false
  }
}

export const multiplyNumber = (x: string | number, y: string | number) =>
  toBigNumber(x)
    .mul(toBigNumber(y))
    .toNumber()

export const minusNumber = (x: string | number, y: string | number) =>
  toBigNumber(x)
    .minus(y)
    .toNumber()

export const addNumber = (x: string | number, y: string | number) =>
  toBigNumber(x)
    .plus(y)
    .toNumber()
