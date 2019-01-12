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
import { raceAll } from '../util/promiseUtils'

const ID = 'nodeNetwork'
const PING_TIMEOUT_OVERRIDE = 5000
const DEFAULT_PING_TIMEOUT = settings.timeout.ping

const pingNode = node =>
  new Promise(resolve => {
    let url = node.protocol ? `${node.protocol}://${node.url}` : node.url
    url = node.port ? `${url}:${node.port}` : url
    const client = new rpc.RPCClient(url)
    client.ping().then(latency => {
      if (client.lastSeenHeight !== 0) {
        resolve({
          url,
          blockCount: client.lastSeenHeight,
          latency,
        })
      }
    })
  })

const pingNodes = (nodes: Array<any>) =>
  raceAll(nodes.map(pingNode), PING_TIMEOUT_OVERRIDE)

export default createActions(ID, ({ networkId }) => async () => {
  let nodes
  const defaultCase = () =>
    NODES_MAIN_NET.filter(
      data =>
        !NODE_EXLUSION_CRITERIA.some(criteria => data.url.includes(criteria)),
    )
  switch (networkId) {
    case MAIN_NETWORK_ID:
      nodes = defaultCase()
      break
    case TEST_NETWORK_ID:
      nodes = NODES_TEST_NET
      break
    default:
      nodes = defaultCase()
  }
  settings.timeout.ping = PING_TIMEOUT_OVERRIDE
  const results = await pingNodes(nodes)
  settings.timeout.ping = DEFAULT_PING_TIMEOUT
  // filter out the undefined results that did not meet the max time alloted
  return results.filter(node => node)
})
