const { Fixed8 } = require('neon-js').u

const neonjs = jest.genMockFromModule('neon-js')

const promiseMockGen = (result, error = false) => {
  return jest.fn(() => {
    return new Promise((resolve, reject) => {
      if (error) reject(error)
      resolve(result)
    })
  })
}

const privateKey = 'L4AJ14CNaBWPemRJKC34wyZwbmxg33GETs4Y1F8uK7rRmZ2UHrJn'
const address = 'AM22coFfbe9N6omgL9ucFBLkeaMNg9TEyL'
const encryptedKey = '6PYUGtvXiT5TBetgWf77QyAFidQj61V8FJeFBFtYttmsSxcbmP4vCFRCWu'
const scriptHash = '4bcdc110b6514312ead9420467475232d4f08539'

neonjs.api = {
  loadBalance: jest.fn((apiMethod, config) => apiMethod(config)),
  getMaxClaimAmount: promiseMockGen(new Fixed8('1.59140785')),
  getMaxClaimAmountFrom: promiseMockGen(new Fixed8('1.59140785')),
  getWalletDBHeight: promiseMockGen(586435),
  getWalletDBHeightFrom: promiseMockGen(586435),
  getTransactionHistory: promiseMockGen([]),
  getTransactionHistoryFrom: promiseMockGen([]),
  getBalance: promiseMockGen({
    assets: {
      NEO: { balance: new Fixed8(1) },
      GAS: { balance: new Fixed8(1) }
    }
  }),
  getBalanceFrom: promiseMockGen({
    assets: {
      NEO: { balance: new Fixed8(1) },
      GAS: { balance: new Fixed8(1) }
    }
  }),
  neonDB: {
    getMaxClaimAmount: promiseMockGen(new Fixed8('1.59140785')),
    getClaims: promiseMockGen({
      claims: [
        { claim: new Fixed8('1.28045113') },
        { claim: new Fixed8('0.31095672') }
      ]
    }),
    doClaimAllGas: promiseMockGen({ result: true }),
    doSendAsset: promiseMockGen({ result: true }),
    getWalletDBHeight: promiseMockGen(586435),
    getAPIEndpoint: jest.fn(() => 'http://testnet-api.wallet.cityofzion.io'),
    getAPIEndpointFrom: jest.fn(() => 'http://testnet-api.wallet.cityofzion.io'),
    getRPCEndpoint: promiseMockGen(''),
    doMintTokens: promiseMockGen({ result: true }),
    getTransactionHistory: promiseMockGen([]),
    getBalance: promiseMockGen({
      assets: {
        NEO: { balance: new Fixed8(1) },
        GAS: { balance: new Fixed8(1) }
      }
    })
  },
  nep5: {
    getTokenInfo: promiseMockGen({ result: true }),
    getTokenBalance: promiseMockGen(100)
  },
  makeIntent: () => ({}),
  sendAsset: promiseMockGen({ response: { result: true } }),
  claimGas: promiseMockGen({ response: { result: true } })
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
  decrypt: jest.fn(() => privateKey),
  encrypt: jest.fn(() => encryptedKey),
  generatePrivateKey: jest.fn(() => privateKey),
  Account: jest.fn(() => { return { address } }),
  getVerificationScriptFromPublicKey: jest.fn(() => scriptHash),
  isAddress: jest.fn(() => true),
  isNEP2: jest.fn(() => true),
  isWIF: jest.fn(() => false),
  isPrivateKey: jest.fn(() => false),
  isPublicKey: jest.fn(() => false)
}

module.exports = neonjs
