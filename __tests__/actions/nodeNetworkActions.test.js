import nodeNetworkActions from '../../app/actions/nodeNetworkActions'

describe('nodeNetworkActions', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn())
  })

  describe('call', () => {
    test('returns an action object', () => {
      expect(nodeNetworkActions.call()).toEqual({
        batch: false,
        type: 'nodeNetwork/ACTION/CALL',
        meta: {
          id: 'nodeNetwork',
          type: 'ACTION/CALL'
        },
        payload: {
          fn: expect.any(Function)
        }
      })
    })

    test('payload function returns array of 15 responses', async done => {
      const call = nodeNetworkActions.call()
      const reuslt = await call.payload.fn({})
      expect(reuslt.length).toEqual(15)
      done()
    })

    test('payload function returns array with valid blockheight and latency at index 0', async done => {
      const result = await nodeNetworkActions.call().payload.fn({})
      expect(result[0].blockHeight).toBeGreaterThan(0)
      expect(result[0].latency).toBeGreaterThan(0)
      done()
    })

    test('payload function returns array with valid blockheight and latency at index 14', async done => {
      const result = await nodeNetworkActions.call().payload.fn({})
      expect(result[14].blockHeight).toBeGreaterThan(0)
      expect(result[14].latency).toBeGreaterThan(0)
      done()
    })
  })

  describe('cancel', () => {
    test('returns an action object', () => {
      expect(nodeNetworkActions.cancel()).toEqual({
        batch: false,
        type: 'nodeNetwork/ACTION/CANCEL',
        meta: {
          id: 'nodeNetwork',
          type: 'ACTION/CANCEL'
        }
      })
    })
  })

  describe('reset', () => {
    test('returns an action object', () => {
      expect(nodeNetworkActions.reset()).toEqual({
        batch: false,
        type: 'nodeNetwork/ACTION/RESET',
        meta: {
          id: 'nodeNetwork',
          type: 'ACTION/RESET'
        }
      })
    })
  })
})
