import { wifLoginActions } from '../../app/actions/authActions'

jest.setTimeout(10000)
describe('authActions', () => {
  describe('wifLoginActions', () => {
    describe('call', () => {
      const wif = 'KxB52D1FGe5xBn6YeezNwj7grhkHZxq7bv2tmaCPoT4rxApMwMvU'
      const address = 'ASJQLBnhAs6fSgBv2R7KtRZjC8A9fAmcNW'
      const privateKey =
        '1c7a992d0e68b7b23cb430ba596bd68cecde042410d81e9e95ee19dc1bcd739d'
      const publicKey =
        '0283f580607cda861f828628002bde53f13e489188c104cbf9628fbab93c70e475'

      test('returns an action object', () => {
        expect(wifLoginActions.call({ wif })).toEqual({
          batch: false,
          type: 'auth/ACTION/CALL',
          meta: {
            id: 'auth',
            type: 'ACTION/CALL',
          },
          payload: {
            fn: expect.any(Function),
          },
        })
      })

      describe('with valid WIF', () => {
        test('returns authenticated account data', async () => {
          const call = wifLoginActions.call({ wif })
          expect(await call.payload.fn({})).toEqual({
            wif,
            address,
            publicKey,
            isHardwareLogin: false,
            hasInternetConnectivity: true,
          })
        })
      })

      describe('with valid private key', () => {
        test('returns authenticated account data', async () => {
          const call = wifLoginActions.call({ wif: privateKey })
          expect(await call.payload.fn({})).toEqual({
            wif,
            address,
            publicKey,
            isHardwareLogin: false,
            hasInternetConnectivity: true,
          })
        })
      })

      describe('with invalid private key', () => {
        test('throws an error', async () => {
          const call = wifLoginActions.call({ wif: 'invalid' })
          expect(call.payload.fn({})).rejects.toEqual(
            Error('Invalid private key entered'),
          )
        })
      })
    })

    describe('cancel', () => {
      test('returns an action object', () => {
        expect(wifLoginActions.cancel()).toEqual({
          batch: false,
          type: 'auth/ACTION/CANCEL',
          meta: {
            id: 'auth',
            type: 'ACTION/CANCEL',
          },
        })
      })
    })

    describe('reset', () => {
      test('returns an action object', () => {
        expect(wifLoginActions.reset()).toEqual({
          batch: false,
          type: 'auth/ACTION/RESET',
          meta: {
            id: 'auth',
            type: 'ACTION/RESET',
          },
        })
      })
    })
  })
})
