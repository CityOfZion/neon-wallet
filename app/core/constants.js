// @flow
import tokenList from './tokenList.json'
import nodesMainNet from './nodes-main-net.json'
import nodesTestNet from './nodes-test-net.json'

export const NEON_WALLET_RELEASE_LINK =
  'https://github.com/CityOfZion/neon-wallet/releases'

export const DISCORD_INVITE_LINK = 'https://discordapp.com/invite/R8v48YA'
export const COZ_DONATIONS_ADDRESS = 'Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A'

export const NODE_EXLUSION_CRITERIA = ['ngd', 'neo.org']

export const ASSETS = {
  NEO: 'NEO',
  GAS: 'GAS'
}

export const THEMES = {
  LIGHT: 'Light',
  DARK: 'Dark'
}

export const DEFAULT_THEME = THEMES.LIGHT

export const EXPLORERS = {
  NEO_SCAN: 'Neoscan',
  NEO_TRACKER: 'Neotracker',
  ANT_CHAIN: 'Antchain'
}

export const DEFAULT_EXPLORER = EXPLORERS.NEO_SCAN

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
  TOKEN_SALE: '/token-sale',
  TOKEN_SALE_CONFIRMATION: '/token-sale-confirm',
  TOKEN_SALE_FAILURE: '/token-sale-failure',
  TOKEN_SALE_SUCCESS: '/token-sale-success',
  TRANSACTION_HISTORY: '/transactions',
  SETTINGS: '/settings',
  DISPLAY_WALLET_KEYS: '/display-wallet-keys',
  DISPLAY_WALLET_KEYS_AUTHENTICATED: '/display-wallet-keys-authenticated',
  DISPLAY_WALLET_QRS: '/display-wallet-qrs',
  DISPLAY_WALLET_QRS_AUTHENTICATED: '/display-wallet-qrs-authenticated',
  WALLET_MANAGER: '/wallet-manager',
  EDIT_WALLET: '/edit-wallet/:key/:label',
  SEND: '/send/',
  SEND_ADDRESS: '/send/:address',
  ENCRYPT: '/encrypt-private-key',
  NODE_SELECT: '/node-select',
  VOTING: '/voting'
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

export const BIP44_PATH = '8000002C' + '80000378' + '80000000' + '00000000' // eslint-disable-line

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

export const NODES_MAIN_NET = nodesMainNet
export const NODES_TEST_NET = nodesTestNet

export const PRICE_UNAVAILABLE = 'N/A'
