// @flow
import * as Neon from 'neon-js'

export const NEON_WALLET_RELEASE_LINK = 'https://github.com/CityOfZion/neon-wallet/releases'

export const NETWORK = Neon.NEO_NETWORK

export const ASSETS = Neon.ASSETS

export const EXPLORER = {
  NEO_TRACKER: 'Neotracker',
  NEO_SCAN: 'Neoscan',
  ANT_CHAIN: 'Antchain'
}

export const ROUTES = {
  HOME: '',
  DASHBOARD: '/dashboard',
  CREATE_WALLET: '/create',
  ENCRYPT_KEY: '/encrypt-key',
  LOGIN_PRIVATE_KEY: '/login-private-key',
  LOGIN_LOCAL_STORAGE: '/login-local-storage',
  LOGIN_LEDGER_NANO_S: '/login-ledger-nano-s',
  LOGIN_NEP2: '/login-encrypted',
  LOGIN_TOKEN_SALE: '/login-token-sale',
  TOKEN_SALE: '/token-sale',
  SETTINGS: '/settings'
}

export const NOTIFICATION_LEVELS = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning'
}

export const NOTIFICATION_POSITIONS = {
  TOP_CENTER: 'tc',
  TOP_RIGHT: 'tr',
  TOP_LEFT: 'tl',
  BOTTOM_CENTER: 'bc',
  BOTTOM_RIGHT: 'br',
  BOTTOM_LEFT: 'bl'
}

export const BIP44_PATH =
  '8000002C' +
  '80000378' +
  '80000000' +
  '00000000' +
  '00000000'

export const MODAL_TYPES = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
  CONFIRM: 'CONFIRM',
  TOKEN_INFO: 'TOKEN_INFO'
}

// TestNet
export const TOKENS_TEST = {
  RPX: '5b7074e873973a6ed3708862f219a6fbf4d1c411'
}

// MainNet
export const TOKENS = {
  RPX: 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9'
}
