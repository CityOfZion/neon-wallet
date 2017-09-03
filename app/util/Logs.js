import axios from 'axios';
import { getAPIEndpoint } from 'neon-js';
import { version } from '../../package.json'

let sessionCount = 0;

export const log = (net, type, address, data) => {
  const apiEndpoint = getAPIEndpoint(net);
  axios.post(apiEndpoint+"/v2/log", {
    type: type,
    time: Date.now(),
    address: address,
    data: data,
    order: sessionCount,
    version: version
  });
  sessionCount += 1;
};
