import reducer from '../../app/modules'

describe('root reducer', () => {
  it('should combine all reducers', () => {
    expect(reducer({}, { type: '@@INIT' })).toEqual({
      api: expect.any(Object),
      account: expect.any(Object),
      addressBook: expect.any(Object),
      generateWallet: expect.any(Object),
      wallet: expect.any(Object),
      transactions: expect.any(Object),
      dashboard: expect.any(Object),
      notifications: expect.any(Object),
      claim: expect.any(Object),
      modal: expect.any(Object),
      sale: expect.any(Object)
    })
  })
})
