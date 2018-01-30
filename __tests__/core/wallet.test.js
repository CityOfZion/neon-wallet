import { TOKENS } from '../../app/core/constants'
import { isToken } from '../../app/core/wallet'

describe('wallet tests', () => {
  describe('isToken tests', () => {
    const validToken = Object.keys(TOKENS)[0]

    test('returns true when given a valid token', () => {
      expect(isToken(validToken)).toEqual(true)
    })

    test('returns false when given a valid token', () => {
      expect(isToken('someInvalidToken')).toEqual(false)
    })
  })
})
