// @flow
import tokenList from './tokenList.json'

export const NEON_WALLET_RELEASE_LINK =
  'https://github.com/CityOfZion/neon-wallet/releases'

export const ASSETS = {
  NEO: 'NEO',
  GAS: 'GAS'
}

export const EXPLORERS = {
  NEO_TRACKER: 'Neotracker',
  NEO_SCAN: 'Neoscan',
  ANT_CHAIN: 'Antchain'
}

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  RECEIVE: '/receive',
  CONTACTS: '/contacts',
  ADD_CONTACT: '/contacts/new',
  EDIT_CONTACT: '/contacts/edit/:name',
  CREATE_WALLET: '/create',
  CREATE_WALLET_AUTHENTICATED: '/create-authenticated',
  IMPORT_WALLET: '/import',
  IMPORT_WALLET_AUTHENTICATED: '/import-authenticated',
  ENCRYPT_KEY: '/encrypt-key',
  TOKEN_SALE: '/token-sale',
  TRANSACTION_HISTORY: '/transactions',
  SETTINGS: '/settings',
  DISPLAY_WALLET_KEYS: '/display-wallet-keys',
  DISPLAY_WALLET_KEYS_AUTHENTICATED: '/display-wallet-keys-authenticated',
  WALLET_MANAGER: '/wallet-manager',
  EDIT_WALLET: '/edit-wallet/:key/:label',
  SEND: '/send'
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
  '8000002C' + '80000378' + '80000000' + '00000000' + '00000000' // eslint-disable-line

export const MODAL_TYPES = {
  SEND: 'SEND',
  CONFIRM: 'CONFIRM',
  TOKEN_INFO: 'TOKEN_INFO',
  TOKEN: 'TOKEN',
  ICO: 'ICO',
  ADD_CONTACT: 'ADD_CONTACT',
  RECEIVE: 'RECEIVE'
}

export const MAIN_NETWORK_ID = '1'
export const TEST_NETWORK_ID = '2'

// TestNet
export const TOKENS_TEST = {
  DBC: 'b951ecbbc5fe37a9c280a76cb0ce0014827294cf',
  RPX: '5b7074e873973a6ed3708862f219a6fbf4d1c411',
  QLC: '0d821bd7b6d53f5c2b40e217c6defc8bbe896cf5'
}

// MainNet
export const TOKENS = tokenList

export const ENDED_ICO_TOKENS = [
  'DBC',
  'RPX',
  'RHT',
  'QLC',
  'NRVE',
  'IAM',
  'ONT',
  'THOR',
  'CGE',
  'AVA',
  'SWH',
  'SWTH',
  'EFX',
  'MCT',
  'PKC'
]

export const DEFAULT_WALLET = {
  name: 'userWallet',
  version: '1.0',
  scrypt: {
    cost: 16384,
    blockSize: 8,
    parallel: 8,
    size: 64
  },
  accounts: [],
  extra: null
}

export const DEFAULT_CURRENCY_CODE = 'usd'

export const DEFAULT_THEME = 'Light'

export const CURRENCIES = {
  aud: { symbol: '$' },
  brl: { symbol: 'R$' },
  cad: { symbol: '$' },
  chf: { symbol: 'Fr.' },
  clp: { symbol: '$' },
  cny: { symbol: '¥' },
  czk: { symbol: 'Kč' },
  dkk: { symbol: 'kr. ' },
  eur: { symbol: '€' },
  gbp: { symbol: '£' },
  hkd: { symbol: '$' },
  huf: { symbol: 'Ft ' },
  idr: { symbol: 'Rp ' },
  ils: { symbol: '₪' },
  inr: { symbol: '₹' },
  jpy: { symbol: '¥' },
  krw: { symbol: '₩' },
  mxn: { symbol: '$' },
  myr: { symbol: 'RM' },
  nok: { symbol: 'kr ' },
  nzd: { symbol: '$' },
  php: { symbol: '₱' },
  pkr: { symbol: '₨ ' },
  pln: { symbol: 'zł' },
  rub: { symbol: '₽' },
  sek: { symbol: 'kr ' },
  sgd: { symbol: 'S$' },
  thb: { symbol: '฿' },
  try: { symbol: '₺' },
  twd: { symbol: 'NT$' },
  usd: { symbol: '$' },
  zar: { symbol: 'R ' }
}

export const TOKEN_SALE_PURCHASE = 'token_sale_purchase'
export const TOKEN_SALE_CONFIRM = 'token_sale_confirm'
export const TOKEN_SALE_SUCCESS = 'token_sale_success'
export const TOKEN_SALE_FAILURE = 'token_sale_failure'
