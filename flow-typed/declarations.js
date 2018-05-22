// @flow

import { type Fixed8 } from 'neon-js'

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
  change: {
    NEO: Fixed8,
    GAS: Fixed8,
  },
  txid: string,
  blockHeight: Fixed8
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

declare type Prices = {
  [key: string]: number
}
