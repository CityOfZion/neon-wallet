import * as types from '../actions/types';

// reducer for state used when performing a transaction
export default (state = {success: null, message: null, selectedAsset: 'Neo'}, action) => {
  switch (action.type) {
      case types.SEND_TRANSACTION:
          return {...state, success:action.success, message: action.message};
      case types.CLEAR_TRANSACTION:
          return {...state, success: null, message: null};
      case types.TOGGLE_ASSET:
          let asset;
          if (state.selectedAsset == "Neo"){
            asset = "Gas";
          } else {
            asset = "Neo";
          }
          return {...state, success: null, selectedAsset: asset};
      default:
          return state;
  }
};