import * as types from '../actions/types';

// reducer for metadata associated with Neon
export default (state = {blockHeight: 0, network: 'MainNet'}, action) => {
  switch (action.type) {
    case types.SET_HEIGHT:
      return {...state, blockHeight: action.blockHeight };
    case types.SET_NETWORK:
        return {...state, network: action.net};
    default:
      return state;
  }
};