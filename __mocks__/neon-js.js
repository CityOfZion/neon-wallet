import { SEND_TRANSACTION } from '../app/modules/transactions';

const neonjs = jest.genMockFromModule('neon-js');

const promiseMockGen = (result, error = false) => {
  return jest.fn(() => {
    return new Promise((resolve, reject) => {
      if (error) reject();
      resolve(result);
    });
  });
};

neonjs.getTransactionHistory = promiseMockGen([]);
neonjs.getClaimAmounts = promiseMockGen({ available: 0, unavailable: 0 });
neonjs.getWalletDBHeight = promiseMockGen(586435);
neonjs.getBalance = promiseMockGen({ Neo: 1, Gas: 1 });
neonjs.getAPIEndpoint = jest.fn(() => 'http://testnet-api.wallet.cityofzion.io');
neonjs.decrypt_wif = jest.fn((wif) => {
  return new Promise((resolve, reject) => {
    if (!wif) reject();
    resolve('L4AJ14CNaBWPemRJKC34wyZwbmxg33GETs4Y1F8uK7rRmZ2UHrJn');
  });
});

module.exports = neonjs;
