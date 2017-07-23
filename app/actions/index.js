import * as types from './types';

// account events

export function login(wif){
  return {
    type: types.LOGIN,
    wif: wif
  }
};

export function logout(){
  return {
    type: types.LOGOUT,
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

export function setMarketPrice(price){
  return {
    type: types.SET_MARKET_PRICE,
    price: price
  }
}

export function resetPrice(){
  return {
    type: types.RESET_PRICE,
  }
}

export function setNetwork(net){
  const network = net === "MainNet" ? "MainNet" : "TestNet";
  return {
    type: types.SET_NETWORK,
    net: network
  }
};

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

export function toggleAsset(){
  return {
    type: types.TOGGLE_ASSET,
  }
};

// dashboard
export function showConfirmation(pane, override){
  return {
    type: types.SHOW_CONFIRMATION
  }
};

export function hideConfirmation(pane, override){
  return {
    type: types.HIDE_CONFIRMATION
  }
};
