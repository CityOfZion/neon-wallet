import * as types from './types';

// account events

export function login(wif){
  return {
    type: types.LOGIN,
    wif: wif
  }
};

// wallet events

export function newWallet(){
  return {
    type: types.NEW_WALLET,
  }
}

export function setBalance(ans, anc){
  return {
    type: types.SET_BALANCE,
    ANS: ans,
    ANC: anc
  }
}

// transaction events

export function sendEvent(success){
  return {
    type: types.SEND_TRANSACTION,
    success: success
  }
};

export function clearTransactionEvent(success){
  return {
    type: types.CLEAR_TRANSACTION,
  }
};

// global config

export function setNetwork(net){
  const network = net === "MainNet" ? "MainNet" : "TestNet";
  return {
    type: types.SET_NETWORK,
    net: network
  }
};
