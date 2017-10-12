// @flow

import { NETWORK, EXPLORER } from '../core/constants'

declare type ActionCreatorType = any
declare type DispatchType = (actionCreator: ActionCreatorType) => Promise<*>

declare type NetworkType = $Values<typeof NETWORK>
declare type ExplorerType = $Values<typeof EXPLORER>
