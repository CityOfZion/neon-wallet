// @flow
import { rpc, settings } from '@cityofzion/neon-js'
import { createActions } from 'spunky'

import {
  NODES_MAIN_NET,
  NODES_TEST_NET,
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
  NODE_EXLUSION_CRITERIA,
} from '../core/constants'

const ID = 'nodeNetwork'
const RPC_PING_OVERRIDE = 5000

const pingNodes = (nodes: Array<any>) => {
  settings.timeout.ping = RPC_PING_OVERRIDE
  const responses = []
  return new Promise(resolve => {
    nodes.forEach(node => {
      let url = node.protocol ? `${node.protocol}://${node.url}` : node.url
      url = node.port ? `${url}:${node.port}` : url

      const maxWaitTimer = setTimeout(() => {
        resolve(responses)
      }, RPC_PING_OVERRIDE)

      const client = new rpc.RPCClient(url)
      client
        .ping()
        .then(latency => {
          if (client.lastSeenHeight !== 0) {
            responses.push({
              url,
              blockCount: client.lastSeenHeight,
              latency,
            })
          }
          if (responses.length === nodes.length) {
            clearTimeout(maxWaitTimer)
            resolve(responses)
          }
        })
        .catch(console.error)
    })
  })
}

export default createActions(ID, ({ networkId }) => async () => {
  let nodes
  switch (networkId) {
    case MAIN_NETWORK_ID:
      nodes = NODES_MAIN_NET.filter(
        data =>
          !NODE_EXLUSION_CRITERIA.some(criteria => data.url.includes(criteria)),
      )
      break
    case TEST_NETWORK_ID:
      nodes = NODES_TEST_NET
      break
    default:
      nodes = NODES_MAIN_NET.filter(
        data =>
          !NODE_EXLUSION_CRITERIA.some(criteria => data.url.includes(criteria)),
      )
  }
  return pingNodes(nodes)
})
