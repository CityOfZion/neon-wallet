/* eslint-disable */
import { api, u } from '@cityofzion/neon-js'

import claimsActions from '../../app/actions/claimsActions'
import { mockPromiseResolved } from '../testHelpers'

const apiClone = Object.assign({}, api.neoscan)

// TODO: completely audit and review these tests

describe('claimsActions', () => {
  const net = 'TestNet'
  const address = 'AW4FD7bz6PF2QadFKF8qXUT7tNmWgvXZc4'

  describe('call', () => {
    test('returns an action object', () => {
      expect(claimsActions.call({ net, address })).toEqual({
        batch: false,
        type: 'claims/ACTION/CALL',
        meta: {
          id: 'claims',
          type: 'ACTION/CALL',
        },
        payload: {
          fn: expect.any(Function),
        },
      })
    })
  })

  describe('cancel', () => {
    test('returns an action object', () => {
      expect(claimsActions.cancel()).toEqual({
        batch: false,
        type: 'claims/ACTION/CANCEL',
        meta: {
          id: 'claims',
          type: 'ACTION/CANCEL',
        },
      })
    })
  })

  describe('reset', () => {
    test('returns an action object', () => {
      expect(claimsActions.reset()).toEqual({
        batch: false,
        type: 'claims/ACTION/RESET',
        meta: {
          id: 'claims',
          type: 'ACTION/RESET',
        },
      })
    })
  })
})
