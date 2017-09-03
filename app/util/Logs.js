import axios from 'axios';
import { getAPIEndpoint } from 'neon-js';

let sessionCount = 0;

export const log = (net, type, address, data) => {
  const apiEndpoint = getAPIEndpoint(net);
  axios.post(apiEndpoint+"/v2/log", {
    type: type,
    time: Date.now(),
    address: address,
    data: data,
    order: sessionCount
  });
  sessionCount += 1;
};
