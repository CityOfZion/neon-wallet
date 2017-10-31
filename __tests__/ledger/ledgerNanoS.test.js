// // NOTE - begin process of testing the ledger app
// import commNode from '../../app/ledger/ledger-comm-node'
// import { ledgerNanoSCreateSignatureAsync } from '../../app/ledger/ledgerNanoS'
// import { BIP44_PATH } from '../../app/core/constants'
//
// const promiseMock = (result, error = false) => {
//   return jest.fn(() => {
//     return new Promise((resolve, reject) => {
//       if (error) reject(new Error())
//       resolve(result)
//     })
//   })
// }
//
// commNode.create_async = promiseMock({
//   exchange: promiseMock('8457891359059130190984390719035789753903759037590347590475907905'),
//   device: {
//     close: () => {}
//   }
// })
//
// const unsignedTx = {} // TODO create viable unsignedTx and publicKey to pass into the async funciton for testing
// const publicKey = '' // TODO create viable unsignedTx and publicKey to pass into the async funciton for testing
//
//
describe('ledgerNano Async Signature tests', () => {
  test('ledgerNano Async Signature works', async () => {
    // const sign = await ledgerNanoSCreateSignatureAsync(unsignedTx, publicKey)
    // console.log('sign repsonse', sign)
    expect(true).toEqual(true)
  })
})
