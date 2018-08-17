// @flow
import { MAIN_NETWORK_ID, TEST_NETWORK_ID } from './constants'

<<<<<<< HEAD
export const isMainNetwork = (networkId: string) =>
  networkId === MAIN_NETWORK_ID
export const isTestNetwork = (networkId: string) =>
  networkId === TEST_NETWORK_ID
=======
export const isMainNetwork = (networkId: string): boolean => networkId === MAIN_NETWORK_ID
export const isTestNetwork = (networkId: string): boolean => networkId === TEST_NETWORK_ID
export const isCozNetwork = (networkId: string): boolean => networkId === COZ_TEST_NETWORK_ID
>>>>>>> be3d2cb... squashed release 0.2.7 into one commit

export const getNetworks = () => [
  {
    id: MAIN_NETWORK_ID,
    label: 'MainNet',
    network: 'MainNet'
  },
  {
    id: TEST_NETWORK_ID,
    label: 'TestNet',
    network: 'TestNet'
  }
]

export const findNetwork = (networkId: string): NetworkItemType => {
  const networks = getNetworks()
  return networks.find(({ id }) => id === networkId) || networks[0]
}
