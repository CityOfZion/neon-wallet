// @flow
import { ASSETS_LABELS } from './constants'
import { getAccountFromWIFKey, verifyAddress } from 'neon-js'

const MIN_PASSPHRASE_LEN = 4

export const validatePassphrase = (passphrase: string): boolean => passphrase.length >= MIN_PASSPHRASE_LEN

export const checkMatchingPassphrases = (passphrase: string, passphrase2: string) => passphrase !== passphrase2

export const verifyPrivateKey = (wif: string): boolean => {
  if (!wif) {
    return false
  }
  const account = getAccountFromWIFKey(wif)
  return account !== -1 && account.address
}

export const validateTransactionBeforeSending = (neoBalance: number, gasBalance: number, selectedAsset: string, sendAddress: string, sendAmount: string) => {
  if (!sendAddress || !sendAmount) {
    return {
      error: 'Please specify an address and amount',
      valid: false
    }
  }

  if (selectedAsset !== ASSETS_LABELS.NEO && selectedAsset !== ASSETS_LABELS.GAS) {
    return {
      error: 'That asset is not Neo or Gas',
      valid: false
    }
  }

  if (verifyAddress(sendAddress) !== true || sendAddress.charAt(0) !== 'A') {
    return {
      error: 'The address you entered was not valid.',
      valid: false
    }
  }

  if (selectedAsset === ASSETS_LABELS.NEO) {
    if (parseFloat(sendAmount) !== parseInt(sendAmount)) { // check for fractional neo
      return {
        error: 'You cannot send fractional amounts of Neo.',
        valid: false
      }
    }
    if (parseInt(sendAmount) > neoBalance) { // check for value greater than account balance
      return {
        error: 'You do not have enough NEO to send.',
        valid: false
      }
    }
  } else if (selectedAsset === ASSETS_LABELS.GAS) {
    if (parseFloat(sendAmount) > gasBalance) {
      return {
        error: 'You do not have enough GAS to send.',
        valid: false
      }
    }
  }

  if (parseFloat(sendAmount) < 0) { // check for negative asset
    return {
      error: 'You cannot send negative amounts of an asset.',
      valid: false
    }
  }

  return {
    error: '',
    valid: true
  }
}
