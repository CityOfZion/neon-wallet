// @flow
export const NETWORK = {
  MAIN: 'MainNet',
  TEST: 'TestNet'
}

export const EXPLORER = {
  NEO_TRACKER: 'Neotracker',
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
  DASHBOARD: '/dashboard',
  CREATE_WALLET: '/create',
  ENCRYPT_KEY: '/encryptKey',
  LOGIN_PRIVATE_KEY: '/loginPrivateKey',
  LOGIN_LOCAL_STORAGE: '/loginLocalStorage',
  LOGIN_ENCRYPTED: '/LoginEncrypted',
  LOGIN_TOKEN_SALE: '/LoginTokenSale',
  TOKEN_SALE: '/TokenSale',
  SETTINGS: '/Settings'
}
