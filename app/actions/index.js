import * as types from './types';

// account events

export function login(wif){
  return {
    type: types.LOGIN,
    wif: wif
  }
};

// wallet events

export function setBalance(ans, anc){
  return {
    type: types.SET_BALANCE,
    ANS: ans,
    ANC: anc
  }
}
