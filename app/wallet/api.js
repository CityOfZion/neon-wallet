import axios from 'axios';
import { getAccountsFromWIFKey } from './index.js';

const apiEndpoint = "http://testnet.antchain.xyz";

const ANS = '\u5c0f\u8681\u80a1';
const ANC = '\u5c0f\u8681\u5e01';

const getAns = balance => balance.filter((val) => { return val.unit === ANS })[0];
const getAnc = balance => balance.filter((val) => { return val.unit === ANC })[0];

export const getBalance = (address) => {
    return axios.get(apiEndpoint + '/api/v1/address/info/' + address)
      .then((res) => {
        if (res.data.result !== 'No Address!') {
          // get ANS
          const ans = getAns(res.data.balance);
          const anc = getAnc(res.data.balance);
          return {ANS: ans, ANC: anc};
        }
      })
};
