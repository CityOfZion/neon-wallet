// @flow
import React from 'react'

import tokenList from './tokenList.json'
import nodesMainNet from './nodes-main-net.json'
import nodesTestNet from './nodes-test-net.json'

import n3NodesMainNet from './n3-nodes-main-net.json'
import n3NodesTestNet from './n3-nodes-test-net.json'

import England from '../assets/flags/united-kingdom.svg'
import China from '../assets/flags/china.svg'
import France from '../assets/flags/france.svg'
import Germany from '../assets/flags/germany.svg'
import Italy from '../assets/flags/italy.svg'
import Brazil from '../assets/flags/brazil.svg'
import Turkey from '../assets/flags/turkey.svg'
import Vietnam from '../assets/flags/vietnam.svg'
import Korea from '../assets/flags/south-korea.svg'
import UnitedArabEmirates from '../assets/flags/united-arab-emirates.svg'
import Russia from '../assets/flags/russia.svg'
import Dutch from '../assets/flags/dutch.svg'

export const NEON_WALLET_RELEASE_LINK =
  'https://github.com/CityOfZion/neon-wallet/releases'

export const DISCORD_INVITE_LINK = 'https://discordapp.com/invite/R8v48YA'
export const COZ_DISCORD_LINK = 'https://discord.gg/KvPu4sPsTy'
export const COZ_DONATIONS_ADDRESS = 'Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A'

export const PIPEFY_SUPPORT = 'https://portal.pipefy.com/coz-support'

export const NODE_EXLUSION_CRITERIA = []

export const ASSETS = {
  NEO: 'NEO',
  GAS: 'GAS',
}

export const THEMES = {
  LIGHT: 'Light',
  DARK: 'Dark',
}

export const DEFAULT_THEME = THEMES.LIGHT

export const EXPLORERS = {
  DORA: 'Dora',
  NEOTUBE: 'Neotube',
  ANT_CHAIN: 'Antchain',
}

export const DEPRECATED_EXPLORERS = {
  NEO_TRACKER: 'Neotracker',
}

export const LANGUAGES = {
  ENGLISH: {
    label: 'English',
    value: 'ENGLISH',
    renderFlag: () => <England alt="English" />,
  },
  CHINESE: {
    label: '中文',
    value: 'CHINESE',
    renderFlag: () => <China alt="中文" />,
  },
  FRENCH: {
    label: 'Français',
    value: 'FRENCH',
    renderFlag: () => <France alt="Français" />,
  },
  GERMAN: {
    label: 'Deutsch',
    value: 'GERMAN',
    renderFlag: () => <Germany alt="Deutsche" />,
  },
  ITALIAN: {
    label: 'Italiano',
    value: 'ITALIAN',
    renderFlag: () => <Italy alt="Italiano" />,
  },
  PORTUGUESE: {
    label: 'Português',
    value: 'PORTUGUESE',
    renderFlag: () => <Brazil alt="Português" />,
  },
  TURKISH: {
    label: 'Türkçe',
    value: 'TURKISH',
    renderFlag: () => <Turkey alt="Türkçe" />,
  },
  KOREAN: {
    label: '한국어',
    value: 'KOREAN',
    renderFlag: () => <Korea alt="한국어" />,
  },
  VIETNAMESE: {
    label: 'Tiếng Việt',
    value: 'VIETNAMESE',
    renderFlag: () => <Vietnam alt="Tiếng Việt" />,
  },
  ARABIC: {
    label: 'العربية',
    value: 'ARABIC',
    renderFlag: () => <UnitedArabEmirates alt="العربية" />,
  },
  RUSSIAN: {
    label: 'Русский',
    value: 'RUSSIAN',
    renderFlag: () => <Russia alt="Русский" />,
  },
  DUTCH: {
    label: 'Nederlands',
    value: 'DUTCH',
    renderFlag: () => <Dutch alt="Nederlands" />,
  },
}

export const DEFAULT_LANGUAGE = LANGUAGES.ENGLISH.value

export const DEFAULT_EXPLORER = EXPLORERS.DORA

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
  MIGRATE_WALLETS_NEON3: '/migrate-wallets-neon3',
  MIGRATE_WALLETS_NEON3_STEPS: '/migrate-wallets-neon3-steps',
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
  DISPLAY_ENCRYPTED_WIF_QR: '/display-encrypted-wif-qr',
  WALLET_MANAGER: '/wallet-manager',
  EDIT_WALLET: '/edit-wallet/:key/:label',
  SEND: '/send/',
  SEND_ADDRESS: '/send/:address',
  ENCRYPT: '/encrypt-private-key',
  NODE_SELECT: '/node-select',
  VOTING: '/voting',
  NEWS: '/news',
  OFFLINE_SIGNING_PROMPT: '/offline-signing-prompt',
  NETWORK_CONFIGURATION: '/network-configuration',
  MOBILE: '/mobile',
  MIGRATION: '/migration',
  CONNECT_DAPP: '/connect-dapp',
  DAPP_REQUEST: '/dapp-request',
  NFT: '/NFT',
}

export const NOTIFICATION_LEVELS = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
}

export const NOTIFICATION_POSITIONS = {
  TOP_CENTER: 'tc',
  TOP_RIGHT: 'tr',
  TOP_LEFT: 'tl',
  BOTTOM_CENTER: 'bc',
  BOTTOM_RIGHT: 'br',
  BOTTOM_LEFT: 'bl',
}

export const BIP44_PATH = '8000002C' + '80000378' + '80000000' + '00000000' // eslint-disable-line

export const MODAL_TYPES = {
  SEND: 'SEND',
  CONFIRM: 'CONFIRM',
  TOKEN_INFO: 'TOKEN_INFO',
  TOKEN: 'TOKEN',
  ICO: 'ICO',
  ADD_CONTACT: 'ADD_CONTACT',
  RECEIVE: 'RECEIVE',
  GENERATED_TRANSACTION: 'GENERATED_TRANSACTION',
  IMPORT_TRANSACTION: 'IMPORT_TRANSACTION',
  RELEASE_NOTES: 'RELEASE_NOTES',
  SHOW_QR_FOR_EXPORT: 'SHOW_QR_FOR_EXPORT',
  MIGRATION_DETAILS: 'MIGRATION_DETAILS',
  LEDGER_MIGRATION_CONFIRM: 'LEDGER_MIGRATION_CONFIRM',
  TRANSFER_NFT: 'TRANSFER_NFT',
  NETWORK_SWITCH: 'NETWORK_SWITCH',
  CUSTOM_NETWORK: 'CUSTOM_NETWORK',
  CHOOSE_ADDRESS_FROM_CONTACT: 'CHOOSE_ADDRESS_FROM_CONTACT',
}

export const TX_TYPES = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
  CLAIM: 'CLAIM',
  N3VOTE: 'vote',
  N3NEP17TRANSFER: 'nep17_transfer',
  N3NEP11TRANSFER: 'nep11_transfer',
  N3CONTRACTINVOCATION: 'contract_invocation',
}

export const MAIN_NETWORK_ID = '1'
export const MAIN_NETWORK_LABEL = '2.x MainNet'
export const MAIN_NETWORK_DEPRECATED_LABEL = 'MainNet'

export const TEST_NETWORK_ID = '2'
export const TEST_NETWORK_LABEL = '2.x TestNet'
export const TEST_NETWORK_DEPRECATED_LABEL = 'TestNet'

export const N3_MAIN_NETWORK_LABEL = '3.x MainNet'
export const N3_TEST_NETWORK_LABEL = '3.x TestNet'

export const NETWORK_LABELS = [MAIN_NETWORK_LABEL, TEST_NETWORK_LABEL]

// TestNet
export const TOKENS_TEST = {
  DBC: 'b951ecbbc5fe37a9c280a76cb0ce0014827294cf',
  RPX: '5b7074e873973a6ed3708862f219a6fbf4d1c411',
  QLC: '0d821bd7b6d53f5c2b40e217c6defc8bbe896cf5',
}

// MainNet
export const TOKENS = tokenList

export const N3_TOKENS_TEST = {
  NEO: {
    symbol: 'NEO',
    companyName: 'NEO',
    networks: {
      '1': {
        name: 'NEO',
        hash: 'ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5',
        decimals: 0,
        totalSupply: 0,
      },
      '2': {
        name: 'NEO',
        hash: 'ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5',
        decimals: 0,
        totalSupply: 0,
      },
    },
  },
  GAS: {
    symbol: 'GAS',
    companyName: 'GAS',
    networks: {
      '1': {
        name: 'GAS',
        hash: 'd2a4cff31913016155e38e474a2c06d08be276cf',
        decimals: 8,
        totalSupply: 0,
      },
      '2': {
        name: 'GAS',
        hash: 'd2a4cff31913016155e38e474a2c06d08be276cf',
        decimals: 8,
        totalSupply: 0,
      },
    },
  },
}

export const NEO_ID =
  'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b'
export const GAS_ID =
  '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7'

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
  'PKC',
]

export const DEFAULT_WALLET = {
  name: 'userWallet',
  version: '1.0',
  scrypt: {
    cost: 16384,
    blockSize: 8,
    parallel: 8,
    size: 64,
  },
  accounts: [],
  extra: null,
}

export const N3_DEFAULT_WALLET = {
  name: 'n3UserWallet',
  chain: 'neo3',
  version: '1.0',
  scrypt: {
    cost: 16384,
    blockSize: 8,
    parallel: 8,
    size: 64,
  },
  accounts: [],
  extra: null,
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
  zar: { symbol: 'R ' },
}

export const TOKEN_SALE_PURCHASE = 'token_sale_purchase'
export const TOKEN_SALE_CONFIRM = 'token_sale_confirm'
export const TOKEN_SALE_SUCCESS = 'token_sale_success'
export const TOKEN_SALE_FAILURE = 'token_sale_failure'

export const NODES_MAIN_NET = nodesMainNet
export const NODES_TEST_NET = nodesTestNet
export const NODES_N3_TEST_NET = n3NodesTestNet
export const NODES_N3_MAIN_NET = n3NodesMainNet

export const PRICE_UNAVAILABLE = 'N/A'

export const COLORS_BY_PARAMETER_TYPE = {
  Any: 'rgba(149,149,149,0.7)',
  Signature: 'rgba(233,38,92,0.7)',
  Boolean: 'rgba(211,85,231,0.7)',
  Integer: 'rgba(177,103,242,0.7)',
  Hash160: 'rgba(0,133,41,0.7)',
  Address: 'rgba(0,133,41,0.7)',
  Null: 'rgba(255,255,255,0.7)',
  Hash256: 'rgba(29,181,255,0.7)',
  ByteArray: 'rgba(13,205,255,0.7)',
  PublicKey: 'rgba(0,214,157,0.7)',
  String: 'rgba(103,221,139,0.7)',
  ByteString: 'rgba(103,221,139,0.7)',
  Array: 'rgba(242,143,0,0.7)',
  Buffer: 'rgba(242,143,0,0.7)',
  InteropInterface: 'rgba(165,0,0,0.7)',
  Void: 'rgba(82,141,147,0.7)',
}

export const WITNESS_SCOPE = {
  '0': 'None',
  '1': 'CalledByEntry',
  '16': 'CustomContracts',
  '32': 'CustomGroups',
  '64': 'WitnessRules',
  '128': 'Global',
}
