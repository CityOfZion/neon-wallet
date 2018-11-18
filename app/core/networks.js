// @flow
import {
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
  COZ_TEST_NETWORK_ID
} from './constants'

export const isMainNetwork = (networkId: string): boolean =>
  networkId === MAIN_NETWORK_ID
export const isTestNetwork = (networkId: string): boolean =>
  networkId === TEST_NETWORK_ID
export const isCozNetwork = (networkId: string): boolean =>
  networkId === COZ_TEST_NETWORK_ID

export const getNetworks = (): Array<NetworkItemType> => [
  {
    id: MAIN_NETWORK_ID,
    label: 'MainNet',
    network: 'MainNet'
  },
  {
    id: TEST_NETWORK_ID,
    label: 'TestNet',
    network: 'TestNet'
  },
  {
    id: COZ_TEST_NETWORK_ID,
    label: 'CoZ TestNet',
    network: 'CozNet'
  }
]

export const findNetwork = (networkId: string): NetworkItemType => {
  const networks = getNetworks()
  return networks.find(({ id }) => id === networkId) || networks[0]
}
