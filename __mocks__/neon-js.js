const neonjs = jest.genMockFromModule('neon-js')

const promiseMockGen = (result, error = false) => {
  return jest.fn(() => {
    return new Promise((resolve, reject) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}

const mockConfigResponse = {
  net: 'TestNet',
  address: 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',
  privateKey: '9ab7e154840daca3a2efadaf0df93cd3a5b51768c632f5433f86909d9b994a69',
  intents: [{
    assetId: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
    value: 1,
    scriptHash: 'cef0c0fdcfe7838eff6ff104f9cdec2922297537'
  }],
  balance: {
    address: 'ALfnhLg7rUyL6Jr98bzzoxz5J7m64fbR4s',
    net: 'TestNet',
    assetSymbols: [ 'GAS', 'NEO' ],
    assets: { GAS: [Object], NEO: [Object] },
    tokenSymbols: [],
    tokens: {},
    GAS: { balance: 78.86680405, unspent: [Array] },
    NEO: { balance: 195, unspent: [Array] }
  },
  url: 'http://api.otcgo.cn:20332',
  tx: {
    type: 128,
    version: 0,
    attributes: [],
    inputs: [ [Object] ],
    outputs: [ [Object] ],
    scripts: [ [Object] ]
  },
  response: {
    jsonrpc: '2.0',
    id: 1234,
    result: true,
    txid: '825f4998b847249f3ec33df46b7b98a403cd997222a0ef7feb8a30f78181d5fe'
  }
}

const privateKey = 'L4AJ14CNaBWPemRJKC34wyZwbmxg33GETs4Y1F8uK7rRmZ2UHrJn'
const address = 'AM22coFfbe9N6omgL9ucFBLkeaMNg9TEyL'
const encryptedKey = '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu'
const scriptHash = '4bcdc110b6514312ead9420467475232d4f08539'

neonjs.api = {
  core: {
    claimGas: promiseMockGen(mockConfigResponse),
    sendAsset: promiseMockGen(mockConfigResponse),
    doInvoke: promiseMockGen(mockConfigResponse)
  }
  neonDB: {
    getClaims: jest.fn(),
    doClaimAllGas: promiseMockGen({ result: true }),
    doSendAsset: promiseMockGen({ result: true }),
    getWalletDBHeight: promiseMockGen(586435),
    getAPIEndpoint: jest.fn(() => 'http://testnet-api.wallet.cityofzion.io'),
    getRPCEndpoint: promiseMockGen(''),
    doMintTokens: promiseMockGen({ result: true }),
    getTransactionHistory: promiseMockGen([]),
    getBalance: promiseMockGen({ NEO: { balance: 1 }, GAS: { balance: 1 } })
  },
  nep5: {
    getTokenInfo: promiseMockGen({ result: true }),
    getTokenBalance: promiseMockGen(100)
  }
}

neonjs.create = {
  account: {
    address
    // privateKey
    // wif
  }
}
neonjs.tx = {
  serializeTransaction: jest.fn()
}
// TODO - look into why I chose to use encrypt vs encryptWif from new API
neonjs.wallet = {
  getPublicKeyEncoded: jest.fn(),
  decryptWIF: jest.fn((wif) => {
    return new Promise((resolve, reject) => {
      if (!wif) reject(new Error())
      resolve(privateKey)
    })
  }),
  decrypt: jest.fn(() => privateKey),
  encrypt: jest.fn(() => encryptedKey),
  generatePrivateKey: jest.fn(() => privateKey),
  Account: jest.fn(() => { return { address } }),
  getVerificationScriptFromPublicKey: jest.fn(() => scriptHash),
  isAddress: jest.fn(() => true),
  isNEP2: jest.fn(() => true)
}

module.exports = neonjs
