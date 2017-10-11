// @flow

const MIN_PASSPHARSE_LEN = 4

export const validatePassphrase = (passphrase: string): boolean => passphrase.length >= MIN_PASSPHARSE_LEN
