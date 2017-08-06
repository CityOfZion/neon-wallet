import reducer from '../../app/store/reducers';

describe('root reducer', () => {
  it('should combine all reducers', () => {
    expect(reducer({}, { type: '@@INIT' })).toEqual({
      account: expect.any(Object),
      generateWallet: expect.any(Object),
      wallet: expect.any(Object),
      transactions: expect.any(Object),
      dashboard: expect.any(Object),
      metadata: expect.any(Object),
      claim: expect.any(Object)
    });
  });
});