// @flow

export const truncateNumber = (num: number, places: number): number =>
  Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places)
