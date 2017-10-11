import { NEO_NETWORK, NEO_EXPLORER } from '../core/constants'

declare type ActionCreatorType = any
declare type DispatchType = (actionCreator: ActionCreatorType) => Promise<*>

declare type NeoAssetType = number
declare type GasAssetType = number
declare type NeoTXId = string
declare type NeoNetworkType = $Values<typeof NEO_NETWORK>
declare type NeoExplorerType = $Values<typeof NEO_EXPLORER>
declare type WalletAddressType = string
declare type WIFType = string