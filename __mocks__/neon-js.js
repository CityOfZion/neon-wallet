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

neonjs.getTransactionHistory = promiseMockGen([])
neonjs.getClaimAmounts = promiseMockGen({ available: 0, unavailable: 0 })
neonjs.getWalletDBHeight = promiseMockGen(586435)
neonjs.getBalance = promiseMockGen({ NEO: { balance: 1 }, GAS: { balance: 1 } })
neonjs.doSendAsset = promiseMockGen({ result: true })
neonjs.doClaimAllGas = promiseMockGen({ result: true })

neonjs.getAPIEndpoint = jest.fn(() => 'http://testnet-api.wallet.cityofzion.io')
neonjs.decryptWIF = jest.fn((wif) => {
  return new Promise((resolve, reject) => {
    if (!wif) reject(new Error())
    resolve(privateKey)
  })
})
neonjs.getAccountFromWIFKey = jest.fn(() => {
  return { address }
})
neonjs.generatePrivateKey = jest.fn()
neonjs.getWIFFromPrivateKey = jest.fn(() => privateKey)
neonjs.encryptWIF = jest.fn(() => encryptedKey)
neonjs.verifyAddress = jest.fn(() => true)
neonjs.getScriptHashFromAddress = jest.fn(() => scriptHash)
neonjs.queryRPC = async function () { return true; }

module.exports = neonjs
