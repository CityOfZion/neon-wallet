// Constants
export const SET_CLAIM = 'SET_CLAIM';
export const SET_CLAIM_REQUEST = 'SET_CLAIM_REQUEST';
export const DISABLE_CLAIM = 'DISABLE_CLAIM';

// Actions
export function setClaim(available, unavailable){
  return {
    type: SET_CLAIM,
    available,
    unavailable
  }
}

export function setClaimRequest(status){
  return {
    type: SET_CLAIM_REQUEST,
    status
  }
};

export function disableClaim(status){
  return {
    type: DISABLE_CLAIM,
    status
  }
};

// Reducer for managing claims data
export default (state = {claimRequest: false, claimAmount: 0, claimAvailable: 0, claimUnavailable: 0, claimWasUpdated: false, disableClaimButton: false}, action) => {
  switch (action.type) {
    case SET_CLAIM_REQUEST:
      console.log("setting claim request", action.status);
      return {...state, 'claimRequest': action.status};
    case SET_CLAIM:
      let claimWasUpdated = false;
      if (action.available > state.claimAvailable && state.claimRequest === true){
        claimWasUpdated = true;
      }
      console.log("setting claim", state.claimRequest, claimWasUpdated);
      return {...state, 'claimAmount': (action.available + action.unavailable) / 100000000, 'claimAvailable': action.available, 'claimUnavailable': action.unavailable, claimWasUpdated};
    case DISABLE_CLAIM:
      return {...state, disableClaimButton: action.status};
    default:
      return state;
  }
};
