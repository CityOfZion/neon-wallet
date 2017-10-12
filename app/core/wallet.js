// @flow
const MIN_PASSPHRASE_LEN = 4

export const validatePassphrase = (passphrase: string): boolean => passphrase.length >= MIN_PASSPHRASE_LEN
