import * as types from '../actions/types';

// state for managing claim data
export default (state = {claimRequest: false, claimAmount: 0, claimAvailable: 0, claimUnavailable: 0, claimWasUpdated: false, disableClaimButton: false}, action) => {
  switch (action.type) {
    case types.SET_CLAIM_REQUEST:
        return {...state, 'claimRequest': action.status};
    case types.SET_CLAIM:
        let claimWasUpdated = false;
        if (action.available > state.claimAvailable && state.claimRequest === true){
          claimWasUpdated = true;
        }
        return {...state, 'claimAmount': (action.available + action.unavailable) / 100000000, 'claimAvailable': action.available, 'claimUnavailable': action.unavailable, claimWasUpdated};
    case types.DISABLE_CLAIM:
        return {...state, disableClaimButton: action.status};
    default:
        return state;
  }
};
