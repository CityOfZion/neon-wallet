// @flow
import { getAccountFromWIFKey } from 'neon-js'

const MIN_PASSPHRASE_LEN = 4

export const validatePassphrase = (passphrase: string): boolean => passphrase.length >= MIN_PASSPHRASE_LEN

export const verifyPrivateKey = (wif: string): boolean => {
  if (!wif) {
    return false
  }
  const account = getAccountFromWIFKey(wif)
  return account !== -1 && account.address
}
