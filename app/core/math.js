// @flow

// https://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript
export const truncateNumber = (num: number, places: number): number =>
  Math.trunc(num * 10 ** places) / 10 ** places
