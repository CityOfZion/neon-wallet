// @flow
import { get } from 'lodash'

import { ID as NETWORK_ID } from '../actions/networkActions'
import { getNetworks } from '../core/networks'

const PREFIX = 'api'

// TODO: Module functions like `doClaimNotify` should be refactored into function props exposed by
//       higher-order components.  Data normally provided by functions like `getNetwork` can instead
//       be retrieved via the `withData` higher-order component.
export const getNetworkId = (state: Object) => {
  return get(state, `${PREFIX}.${NETWORK_ID}.data`)
}

export const getNetwork = (state: Object) => {
  const selectedNetworkId = getNetworkId(state)
  const networks = getNetworks()
  const networkItem = networks.find(({ id, value }) => id === selectedNetworkId) || networks[0]

  return networkItem.network
}

export const getNetworkById = (networkId: string) => {
  const networks = getNetworks()
  const networkItem = networks.find(({ id, value }) => id === networkId) || networks[0]
  return networkItem.network
}
