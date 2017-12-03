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
