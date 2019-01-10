// @flow
import { createActions } from 'spunky'
import { random, get, compact } from 'lodash-es'
import { rpc, api, settings } from '@cityofzion/neon-js'

import { getStorage, setStorage } from '../core/storage'
import {
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
  NODES_MAIN_NET,
  NODES_TEST_NET,
  NODE_EXLUSION_CRITERIA,
} from '../core/constants'
import { findNetworkByLabel } from '../core/networks'

const DEFAULT_RPC_PING = 1000

const ID = 'nodeStorage'
const STORAGE_KEY = 'selectedNode'
const CACHE_EXPIRATION =
  15 /* minutes */ * 60 /* seconds */ * 1000 /* milliseconds */
const cachedRPCUrl = {}

type Net = NetworkLabelTypes

type Props = {
  url: string,
  net: Net,
}

export const determineIfCacheIsExpired = (
  timestamp: number,
  expiration: number = CACHE_EXPIRATION,
): boolean => timestamp + expiration < new Date().getTime()

export const buildNodeUrl = (data: {
  height: number,
  port: string,
  protocol: string,
  url: string,
}): string => {
  const { protocol, url, port } = data
  return compact([protocol && `${protocol}://`, url, port && `:${port}`]).join(
    '',
  )
}

export const getRPCEndpoint = async (
  net: Net,
  excludeCritera: Array<string> = NODE_EXLUSION_CRITERIA,
) => {
  settings.timeout.ping = DEFAULT_RPC_PING
  try {
    if (
      cachedRPCUrl[net] &&
      !determineIfCacheIsExpired(cachedRPCUrl[net].timestamp)
    ) {
      return cachedRPCUrl[net].node
    }
    const NETWORK = findNetworkByLabel(net)
    let nodeList
    switch (NETWORK.id) {
      case MAIN_NETWORK_ID:
        nodeList = NODES_MAIN_NET
        break
      case TEST_NETWORK_ID:
        nodeList = NODES_TEST_NET
        break
      default:
        nodeList = NODES_MAIN_NET
    }
    const data = [...nodeList]
      .filter(
        data => !excludeCritera.some(criteria => data.url.includes(criteria)),
      )
      .map(data => {
        const url = buildNodeUrl(data)
        const client = new rpc.RPCClient(url)
        // eslint-disable-next-line
        data.client = client
        return data
      })

    await Promise.all(data.map(data => data.client.ping()))
    const nodes = data.sort(
      (a, b) => b.client.lastSeenHeight - a.client.lastSeenHeight,
    )
    if (nodes.length === 0) throw new Error('No eligible nodes found!')
    const heightThreshold = nodes[0].client.lastSeenHeight - 1
    const goodNodes = nodes.filter(
      n => n.client.lastSeenHeight >= heightThreshold,
    )
    let randomIndex = random(goodNodes.length)
    if (randomIndex === goodNodes.length) {
      // eslint-disable-next-line
      randomIndex--
    }
    const randomlySelectedRPCUrl = goodNodes[randomIndex].client.net
    cachedRPCUrl[net] = {
      node: randomlySelectedRPCUrl,
      timestamp: new Date().getTime(),
    }
    return randomlySelectedRPCUrl
  } catch (error) {
    console.warn(
      'An error occurred attempting to obtain RPC endpoint defaulting to neon-js getRPCEndpointFrom()',
      {
        error,
      },
    )
    const endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan)
    return endpoint
  }
}

export const getNode = async (net: Net): Promise<string> => {
  const storage = await getStorage(`${STORAGE_KEY}-${net}`).catch(console.error)
  const nodeInStorage = get(storage, 'node')
  const expiration = get(storage, 'timestamp')
  if (!nodeInStorage || !expiration || determineIfCacheIsExpired(expiration)) {
    return ''
  }
  return nodeInStorage
}

const setNode = async (node: string, net: Net): Promise<string> =>
  setStorage(`${STORAGE_KEY}-${net}`, { node, timestamp: new Date().getTime() })

export default createActions(
  ID,
  ({ url, net }: Props = {}) => async (): Promise<string> => {
    if (url || url === '') {
      await setNode(url, net)
      return url
    }
    return getNode(net)
  },
)
