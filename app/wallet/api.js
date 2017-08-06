import axios from 'axios';
import { getAccountsFromWIFKey, transferTransaction, signatureData, addContract, claimTransaction } from './index.js';

// hard-code asset ids for NEO and GAS
export const neoId = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
export const gasId = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
export const allAssetIds = [neoId, gasId];

// switch between APIs for MainNet and TestNet
export const getAPIEndpoint = (net) => {
  if (net === "MainNet"){
    return "http://api.wallet.cityofzion.io";
  } else {
    return "http://testnet-api.wallet.cityofzion.io";
  }
};

// return the best performing (highest block + fastest) node RPC
export const getRPCEndpoint = (net) => {
  const apiEndpoint = getAPIEndpoint(net);
  return axios.get(apiEndpoint + '/v1/network/best_node').then((response) => {
      return response.data.node;
  });
};

// wrapper for querying node RPC
const queryRPC = (net, method, params, id = 1) => {
  let jsonRequest = axios.create({
    headers: {"Content-Type": "application/json"}
  });
  const jsonRpcData = {"jsonrpc": "2.0", "method": method, "params": params, "id": id};
  return getRPCEndpoint(net).then((rpcEndpoint) => {
    return jsonRequest.post(rpcEndpoint, jsonRpcData).then((response) => {
      return response.data;
    });
  });
};

// get amounts of available (spent) and unavailable claims
export const getClaimAmounts = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net);
  return axios.get(apiEndpoint + '/v1/address/claims/' + address).then((res) => {
    return {available: parseInt(res.data.total_claim), unavailable:parseInt(res.data.total_unspent_claim)};
  });
}

// do a claim transaction on all available (spent) gas
export const doClaimAllGas = (net, fromWif) => {
  const apiEndpoint = getAPIEndpoint(net);
  const account = getAccountsFromWIFKey(fromWif)[0];
  // TODO: when fully working replace this with mainnet/testnet switch
  return axios.get(apiEndpoint + "/v1/address/claims/" + account.address).then((response) => {
    const claims = response.data["claims"];
    const total_claim = response.data["total_claim"];
    const txData = claimTransaction(claims, account.publickeyEncoded, account.address, total_claim);
    const sign = signatureData(txData, account.privatekey);
    const txRawData = addContract(txData, sign, account.publickeyEncoded);
    return queryRPC(net, "sendrawtransaction", [txRawData], 2);
  });
}

// get Neo and Gas balance for an account
export const getBalance = (net, address) => {
    const apiEndpoint = getAPIEndpoint(net);
    return axios.get(apiEndpoint + '/v1/address/balance/' + address)
      .then((res) => {
          const neo = res.data.NEO.balance;
          const gas = res.data.GAS.balance;
          return {Neo: neo, Gas: gas, unspent: {Neo: res.data.NEO.unspent, Gas: res.data.GAS.unspent}};
      })
};

/**
 * @function
 * @description
 * Hit the bittrex api getticker to fetch the latest USDT to NEO price
 *
 * @param {number} amount - The current NEO amount in wallet
 * @return {string} - The converted NEO to USDT fiat amount
 */
export const getMarketPriceUSD = (amount) => {
  return axios.get('https://bittrex.com/api/v1.1/public/getticker?market=USDT-NEO').then((response) => {
      let lastUSDNEO = response.data.result.Last;
      return ('$' + (lastUSDNEO * amount).toFixed(2).toString());
  });
};

// get transaction history for an account
export const getTransactionHistory = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net);
  return axios.get(apiEndpoint + '/v1/address/history/' + address).then((response) => {
    return response.data.history;
  });
};

// get the current height of the light wallet DB
export const getWalletDBHeight = (net) => {
  const apiEndpoint = getAPIEndpoint(net);
  return axios.get(apiEndpoint + '/v1/block/height').then((response) => {
    return parseInt(response.data.block_height);
  });
}

// send an asset to an address
export const doSendAsset = (net, toAddress, fromWif, assetType, amount) => {
  let assetId, assetName, assetSymbol;
  if (assetType === "Neo"){
    assetId = neoId;
  } else {
    assetId = gasId;
  }
  const fromAccount = getAccountsFromWIFKey(fromWif)[0];
  return getBalance(net, fromAccount.address).then((response) => {
    const coinsData = {
      "assetid": assetId,
      "list": response.unspent[assetType],
      "balance": response[assetType],
      "name": assetType
    }
    const txData = transferTransaction(coinsData, fromAccount.publickeyEncoded, toAddress, amount);
    const sign = signatureData(txData, fromAccount.privatekey);
    const txRawData = addContract(txData, sign, fromAccount.publickeyEncoded);
    return queryRPC(net, "sendrawtransaction", [txRawData], 4);
  });
};
