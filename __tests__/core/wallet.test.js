import { validateTransactionBeforeSending } from '../../app/core/wallet'

describe('validateTransactionBeforeSending tests', () => {
  test('balance of type number and with more than 15 significant digts', () => {
    const sendEntry = {
      address: 'APuTTqoxaLvRPTvRSYAtnkF851AWW7kBMZ',
      amount: '100000000.00000001',
      symbol: 'OBT',
    }
    expect(
      validateTransactionBeforeSending(100000000.00000001, sendEntry),
    ).toEqual(null)
  })
})
