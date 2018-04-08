import reducer from '../../app/modules'

describe('root reducer', () => {
  it('should combine all reducers', () => {
    expect(reducer({}, { type: '@@INIT' })).toEqual({
      spunky: expect.any(Object),
      addressBook: expect.any(Object),
      generateWallet: expect.any(Object),
      notifications: expect.any(Object),
      claim: expect.any(Object),
      modal: expect.any(Object)
    })
  })
})
