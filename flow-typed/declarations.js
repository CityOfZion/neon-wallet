// @flow

import {
  NETWORK,
  EXPLORER,
  ROUTES,
  NOTIFICATION_LEVELS,
  NOTIFICATION_POSITIONS,
  MODAL_TYPES,
  TOKENS
} from './app/core/constants'

declare type ActionCreatorType = any

declare type DispatchType = (actionCreator: ActionCreatorType) => Promise<*> // eslint-disable-line no-undef

declare type GetStateType = () => Object // eslint-disable-line no-undef

declare type ReduxAction = () => { // eslint-disable-line no-undef
  type: string,
  payload: Object,
  meta?: Object,
  error?: Object
}

declare type NetworkType = $Values<typeof NETWORK> // eslint-disable-line no-undef

declare type ExplorerType = $Values<typeof EXPLORER> // eslint-disable-line no-undef

declare type RouteType = $Values<typeof ROUTES> // eslint-disable-line no-undef

declare type NotificationType = { // eslint-disable-line no-undef
  id: string,
  level: $Values<typeof NOTIFICATION_LEVELS>,
  title?: string,
  message: string,
  position: $Values<typeof NOTIFICATION_POSITIONS>,
  dismissible: boolean,
  autoDismiss: number
}

declare type TransactionHistoryType = { // eslint-disable-line no-undef
  NEO: number,
  GAS: number,
  txid: string,
  block_index: number,
  neo_sent: boolean,
  gas_sent: boolean
}

declare type ModalType = $Values<typeof MODAL_TYPES> // eslint-disable-line no-undef

declare type TokenInfoType = {
  totalSupply: number,
  decimals: number,
  name: string
}

declare type SymbolType = $Keys<typeof TOKENS> | 'NEO' | 'GAS'

declare type TokenType = { // eslint-disable-line no-undef
  symbol: SymbolType,
  balance: number,
  info: TokenInfoType
}

declare type SendEntryType = { // eslint-disable-line no-undef
  amount: string,
  address: string,
  symbol: SymbolType
}
