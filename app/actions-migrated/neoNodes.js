// @flow
import { rpc, settings } from '@cityofzion/neon-js-legacy'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import {
  NODES_MAIN_NET,
  NODES_TEST_NET,
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
  NODE_EXLUSION_CRITERIA,
  NODES_N3_MAIN_NET,
  NODES_N3_TEST_NET,
} from '../core/constants'
import { raceAll } from '../util/promiseUtils'
import { getSettings } from '../context/settings/SettingsContext'

const PING_TIMEOUT_OVERRIDE = 5000
const DEFAULT_PING_TIMEOUT = settings.timeout.ping

const pingNode = ({ url }) =>
  new Promise(resolve => {
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

export const useNodeNetworkStore = create(
  devtools(set => ({
    nodeList: [],
    setNodeList: nodeList => set({ nodeList }, false, 'setNodeList'),
    getNodeList: async networkId => {
      let nodeList
      const { chain } = await getSettings()
      const defaultCase = () =>
        NODES_MAIN_NET.filter(
          data =>
            !NODE_EXLUSION_CRITERIA.some(criteria =>
              data.url.includes(criteria),
            ),
        )

      if (chain === 'neo2') {
        switch (networkId) {
          case MAIN_NETWORK_ID:
            nodeList = defaultCase()
            break
          case TEST_NETWORK_ID:
            nodeList = NODES_TEST_NET
            break
          default:
            nodeList = defaultCase()
        }
      } else {
        switch (networkId) {
          case MAIN_NETWORK_ID:
            nodeList = NODES_N3_MAIN_NET
            break
          case TEST_NETWORK_ID:
            nodeList = NODES_N3_TEST_NET
            break
          default:
            nodeList = NODES_N3_MAIN_NET
        }
      }
      settings.timeout.ping = PING_TIMEOUT_OVERRIDE
      const results = await pingNodes(nodeList)
      settings.timeout.ping = DEFAULT_PING_TIMEOUT
      const filteredResults = results.filter(node => node)
      set({ nodeList: filteredResults }, false, 'getNodeList')
      return filteredResults
    },
  })),
)
