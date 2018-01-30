// @flow
import { wallet } from 'neon-js'

export default function didLogout (oldAddress: ?string, newAddress: ?string) {
  return wallet.isAddress(oldAddress) && !newAddress
}
