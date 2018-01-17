// @flow

import {
  EXPLORER,
  ROUTES,
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS,
  MODAL_TYPES
} from '../app/core/constants'

declare type ActionCreatorType = any

declare type DispatchType = (actionCreator: ActionCreatorType) => Promise<*>

declare type GetStateType = () => Object

declare type ReduxAction = () => {
  type: string,
  payload: Object,
  meta?: Object,
  error?: Object
}

declare type NetworkType = string

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
  txid: string,
  block_index: number,
  neo_sent: boolean,
  gas_sent: boolean
}

declare type ModalType = $Values<typeof MODAL_TYPES>

declare type SymbolType = string

declare type NetworkItemType = {
  id: string,
  label: string,
  network: NetworkType
}

declare type TokenItemType = {
  id: string,
  scriptHash: string,
  networkId: string,
  isUserGenerated: boolean
}

declare type TokenType = {
  symbol: SymbolType,
  balance: number,
  totalSupply: number,
  decimals: number,
  name: string
}

declare type TokenBalanceType = {
  symbol: SymbolType,
  balance: string,
  scriptHash: string,
  totalSupply: number,
  decimals: number,
  name: string
}

declare type SendEntryType = {
  amount: string,
  address: string,
  symbol: SymbolType
}
