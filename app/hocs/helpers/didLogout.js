// @flow
import { wallet } from '@cityofzion/neon-js'

export default function didLogout(oldAddress: ?string, newAddress: ?string) {
  return wallet.isAddress(oldAddress) && !newAddress
}
