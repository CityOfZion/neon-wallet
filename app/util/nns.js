import { rpc } from 'neon-js'

export const resolveNnsDomain = name =>
  rpc
    .queryRPC('https://apiwallet.nel.group/api/mainnet', {
      method: 'getresolvedaddress',
      params: [name]
    })
    .then(data => data.result[0].data)
