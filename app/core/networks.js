// @flow
import { MAIN_NETWORK_ID, TEST_NETWORK_ID } from './constants'

export const isMainNetwork = (networkId: string) => networkId === MAIN_NETWORK_ID
export const isTestNetwork = (networkId: string) => networkId === TEST_NETWORK_ID
