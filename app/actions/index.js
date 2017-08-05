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

export function setClaim(available, unavailable){
  return {
    type: types.SET_CLAIM,
    available,
    unavailable
  }
}

export function newWallet(){
  return {
    type: types.NEW_WALLET,
  }
}

export function setBalance(ans, anc, price){
  return {
    type: types.SET_BALANCE,
    ANS: ans,
    ANC: anc,
    price: price
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

export function setTransactionHistory(transactions){
  return {
    type: types.SET_TRANSACTION_HISTORY,
    transactions
  }
};

export function setClaimRequest(status){
  return {
    type: types.SET_CLAIM_REQUEST,
    status
  }
};

export function disableClaim(status){
  return {
    type: types.DISABLE_CLAIM,
    status
  }
};

// transaction events

export function sendEvent(success, message){
  return {
    type: types.SEND_TRANSACTION,
    success: success,
    message: message
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

export function togglePane(pane){
  return {
    type: types.TOGGLE_SEND_PANE,
    pane: pane
  }
};

// metadata

export function setBlockHeight(blockHeight){
  return {
    type: types.SET_HEIGHT,
    blockHeight: blockHeight
  };
}
