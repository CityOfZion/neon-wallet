import * as types from '../../app/actions/types';
import claimState from '../../app/reducers/claimState';

describe('claimState reducer', () => {
  let action = {
    status: true,
    available: 1000,
    unavailable: 10
  };
  let state = {
    claimRequest: false,
    claimAmount: 0,
    claimAvailable: 0,
    claimUnavailable: 0,
    claimWasUpdated: false,
    disableClaimButton: false
  };

  test('SET_CLAIM_REQUEST', () => {
    action.type = types.SET_CLAIM_REQUEST;

    let received = claimState(state, action);
    let expected = {
      claimRequest: true,
      claimAmount: 0,
      claimAvailable: 0,
      claimUnavailable: 0,
      claimWasUpdated: false,
      disableClaimButton: false
    };

    expect(received).toEqual(expected);
  });

  test('SET_CLAIM', () => {
    action.type = types.SET_CLAIM;

    state.claimRequest = true;
    state.claimAvailable = 0;

    let received = claimState(state, action);
    let expected = {
      claimRequest: true,
      claimAmount: (action.available + action.unavailable) / 100000000,
      claimAvailable: action.available,
      claimUnavailable: action.unavailable,
      claimWasUpdated: true,
      disableClaimButton: false
    };

    expect(received).toEqual(expected);
  });

  test('DISABLE_CLAIM', () => {
    action.type = types.DISABLE_CLAIM;

    let received = claimState(state, action);
    let expected = {
      claimRequest: true,
      claimAmount: 0,
      claimAvailable: 0,
      claimUnavailable: 0,
      claimWasUpdated: false,
      disableClaimButton: true
    };

    expect(received).toEqual(expected);
  });
});
