// @flow

// https://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript
export const truncateNumber = (num: number, places: number): number =>
  Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places)
