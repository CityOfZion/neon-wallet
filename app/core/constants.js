// @flow
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
  SETTINGS: '/settings',
  DISPLAY_WALLET_KEYS: '/display-wallet-keys'
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
  '8000002C' + '80000378' + '80000000' + '00000000' + '00000000'

export const MODAL_TYPES = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
  CONFIRM: 'CONFIRM',
  TOKEN_INFO: 'TOKEN_INFO',
  TOKEN: 'TOKEN',
  ICO: 'ICO'
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
export const TOKENS = {
  DBC: 'b951ecbbc5fe37a9c280a76cb0ce0014827294cf',
  RPX: 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9',
  RHT: '2328008e6f6c7bd157a342e789389eb034d9cbc4',
  QLC: '0d821bd7b6d53f5c2b40e217c6defc8bbe896cf5',
  NRVE: 'a721d5893480260bd28ca1f395f2c465d0b5b1c2',
  IAM: '891daf0e1750a1031ebe23030828ad7781d874d6',
  ONT: 'ceab719b8baa2310f232ee0d277c061704541cfb',
  THOR: '67a5086bac196b67d5fd20745b0dc9db4d2930ed',
  CGE: '34579e4614ac1a7bd295372d3de8621770c76cdc',
  AVA: 'de2ed49b691e76754c20fe619d891b78ef58e537',
  SWH: '78e6d16b914fe15bc16150aeb11d0c2a8e532bdd',
  SWTH: 'ab38352559b8b203bde5fddfa0b07d8b2525e132',
  EFX: 'acbc532904b6b51b5ea6d19b803d78af70e7e6f9',
  MCT: 'a87cc2a513f5d8b4a42432343687c2127c60bc3f',
  GDM: 'd1e37547d88bc9607ff9d73116ebd9381c156f79',
  PKC: 'af7c7328eee5a275a3bcaee2bf0cf662b5e739be'
}

export const ENDED_ICO_TOKENS = [
  'DBC', 'RPX', 'RHT', 'QLC', 'NRVE', 'IAM', 'ONT', 'THOR', 'CGE', 'AVA', 'SWH', 'SWTH', 'EFX', 'MCT', 'PKC'
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
