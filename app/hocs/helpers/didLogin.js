// @flow
import { wallet } from '@cityofzion/neon-js-legacy'

import { wallet as n3Wallet } from '@cityofzion/neon-js'

export default function didLogin(oldAddress: ?string, newAddress: ?string) {
  return (
    (!oldAddress && wallet.isAddress(newAddress)) ||
    (!oldAddress && n3Wallet.isAddress(newAddress))
  )
}
