// @flow
import { MAIN_NETWORK_ID, TEST_NETWORK_ID } from './constants'

export const isMainNetwork = (networkId: string) =>
  networkId === MAIN_NETWORK_ID
export const isTestNetwork = (networkId: string) =>
  networkId === TEST_NETWORK_ID

export const getNetworks = () => [
  {
    id: MAIN_NETWORK_ID,
    value: MAIN_NETWORK_ID,
    label: 'MainNet',
    network: 'MainNet'
  },
  {
    id: TEST_NETWORK_ID,
    value: TEST_NETWORK_ID,
    label: 'TestNet',
    network: 'TestNet'
  }
]

export const findNetwork = (networkId: string): NetworkItemType => {
  const networks = getNetworks()
  return networks.find(({ id }) => id === networkId) || networks[0]
}

export const findNetworkByLabel = (networkLabel: string): NetworkItemType => {
  const networks = getNetworks()
  return networks.find(({ label }) => networkLabel === label) || networks[0]
}
