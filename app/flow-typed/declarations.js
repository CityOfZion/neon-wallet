// @flow

import { 
  NETWORK,
  EXPLORER,
  ROUTES,
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS,
  MODAL_TYPES
} from '../core/constants'

declare type ActionCreatorType = any

declare type DispatchType = (actionCreator: ActionCreatorType) => Promise<*>

declare type GetStateType = () => Object

declare type NetworkType = $Values<typeof NETWORK>

declare type ExplorerType = $Values<typeof EXPLORER>

declare type RouteType = $Values<typeof ROUTES>

declare type NotificationType = {
  id: string,
  level: $Values<typeof NOTIFICATION_LEVELS>,
  title?: string,
  message: string,
  position: $Values<typeof NOTIFICATION_POSITIONS>,
  dismissible: boolean,
  autoDismiss: number
}

declare type TransactionHistoryType = {
  NEO: number,
  GAS: number,
  txid: number,
  block_index: number,
  neo_sent: number,
  neo_gas: number
}

declare type ModalType = $Values<typeof MODAL_TYPES>