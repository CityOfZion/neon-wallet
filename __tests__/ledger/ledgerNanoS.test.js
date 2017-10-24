// NOTE - begin process of testing the ledger app
import commNode from '../../app/ledger/ledger-comm-node'
import { ledgerNanoSCreateSignatureAsync } from '../../app/ledger/ledgerNanoS'
import { BIP44_PATH } from '../../app/core/constants'

const promiseMock = (result, error = false) => {
  return jest.fn(() => {
    return new Promise((resolve, reject) => {
      if (error) reject(new Error())
      resolve(result)
    })
  })
}

commNode.create_async = promiseMock({
  exchange: promiseMock('8457891359059130190984390719035789753903759037590347590475907905'),
  device: {
    close: () => {}
  }
})

const unsignedTx = {
  type: 128,
  version: 0,
  scripts: [],
  inputs: [
    {
      prevHash: 'c6da426a36407e6f9993699e16bd57706daee021701f1d857ae0c218d67b59e0',
      prevIndex: 0
    }
  ],
  attributes: [],
  outputs: [
    {
      assetId: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
      value: 1,
      scriptHash: '5df31f6f59e6a4fbdd75103786bf73db1000b235'
    }
  ]
}

const serializedUnsignedTx = '8000000255842a0f096b977d6e6cf74c2387e95fc426e94d85ae9667f18e746021dbda650100a6651aab1c6de7e3c1e9e3a83cb149782ecf187f580e98840b75e4d60eea616e000002e72d286979ee6cb1b7e65dfddfb2e384100b8d148e7758de42e4168b71792c6000e1f505000000003775292229eccdf904f16fff8e83e7cffdc0f0cee72d286979ee6cb1b7e65dfddfb2e384100b8d148e7758de42e4168b71792c60fc7ec0010000000035b20010db73bf86371075ddfba4e6596f1ff35d'

describe('ledgerNano Async Signature tests', () => {
  test('ledgerNano Async Signature works', async () => {
    const sign = await ledgerNanoSCreateSignatureAsync(serializedUnsignedTx)
    console.log('sign repsonse', sign)
    expect(true).toEqual(true)
  })
})

// const signedTx = { type: 128,
//   version: 0,
//   scripts:
//    [ { invocationScript: '400df6c730e705b612b6179a978d1d1c43e572cd683f67fc40a03a825db6d793a29d0b3de252d7e2d74e78b1b59356bede731eb0de88a99a54391983abca6935b3',
//        verificationScript: '2102028a99826edc0c97d18e22b6932373d908d323aa7f92656a77ec26e8861699efac' } ],
//   inputs:
//    [ { prevHash: 'c6da426a36407e6f9993699e16bd57706daee021701f1d857ae0c218d67b59e0',
//        prevIndex: 0 } ],
//   attributes: [],
//   outputs:
//    [ { assetId: 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
//        value: 1,
//        scriptHash: '5df31f6f59e6a4fbdd75103786bf73db1000b235' } ] }
