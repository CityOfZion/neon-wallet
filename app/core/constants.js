// @flow

export const NEON_WALLET_RELEASE_LINK = 'https://github.com/CityOfZion/neon-wallet/releases'

export const NETWORK = {
  MAIN: 'MainNet',
  TEST: 'TestNet'
}

export const EXPLORER = {
  NEO_TRACKER: 'Neotracker',
  NEO_SCAN: 'Neoscan',
  ANT_CHAIN: 'Antchain'
}

export const ASSETS = {
  NEO: 'NEO',
  GAS: 'GAS'
}

export const ASSETS_LABELS = {
  [ASSETS.NEO]: 'Neo',
  [ASSETS.GAS]: 'Gas'
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

export const NOTIFICATION_TYPES = {
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  INFO: 'INFO',
  WARNING: 'WARNING'
}

export const NOTIFICATION_POSITIONS = {
  TOP: 'TOP',
  TOP_RIGHT: 'TOP_RIGHT',
  TOP_LEFT: 'TOP_LEFT',
  BOTTOM: 'BOTTOM',
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
  BOTTOM_LEFT: 'BOTTOM_LEFT'
}

export const DEFAULT_NOTIFICATION_TIMEOUT = 5000
export const BIP44_PATH =
  '8000002C' +
  '80000378' +
  '80000000' +
  '00000000' +
  '00000000'

export const MODAL_TYPES = {
  SEND_TRANSACTION: 'SEND_TRANSACTION',
  CONFIRM: 'CONFIRM'
}
