// @flow
import { wallet } from '@cityofzion/neon-js-legacy'
import { wallet as n3Wallet } from '@cityofzion/neon-js'

export default function didLogout(oldAddress: ?string, newAddress: ?string) {
  return (
    (wallet.isAddress(oldAddress) || n3Wallet.isAddress(oldAddress)) &&
    !newAddress
  )
}
