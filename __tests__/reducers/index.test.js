import reducer from '../../app/reducers';

describe('root reducer', () => {
  it('should combine all reducers', () => {
    expect(reducer({}, { type: '@@INIT' })).toEqual({
      account: expect.any(Object),
      generateWallet: expect.any(Object),
      wallet: expect.any(Object),
      transactionState: expect.any(Object),
      dashboard: expect.any(Object),
      metadata: expect.any(Object),
      claimState: expect.any(Object)
    });
  });
});