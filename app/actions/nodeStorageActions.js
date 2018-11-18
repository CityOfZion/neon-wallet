// @flow
import { createActions } from 'spunky'
import { isEmpty, random } from 'lodash-es'
import { rpc, api } from 'neon-js'

import { getStorage, setStorage } from '../core/storage'
import {
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
  NODES_MAIN_NET,
  NODES_TEST_NET,
  NODE_EXLUSION_CRITERIA
} from '../core/constants'
import { findNetworkByLabel } from '../core/networks'

const ID = 'nodeStorage'
const STORAGE_KEY = 'selectedNode'
const cachedRPCUrl = {}

type Props = {
  url: string,
  net: string
}

export const getRPCEndpoint = async (
  net: string,
  excludeCritera: Array<string> = NODE_EXLUSION_CRITERIA
) => {
  try {
    if (cachedRPCUrl[net]) return cachedRPCUrl[net]
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
        data => !excludeCritera.some(criteria => data.url.includes(criteria))
      )
      .map(data => {
        let url = data.protocol ? `${data.protocol}://${data.url}` : data.url
        url = data.port ? `${url}:${data.port}` : url
        const client = new rpc.RPCClient(url)
        // eslint-disable-next-line
        data.client = client
        return data
      })
    await Promise.all(data.map(data => data.client.ping()))
    const nodes = data.sort(
      (a, b) => b.client.lastSeenHeight - a.client.lastSeenHeight
    )
    if (nodes.length === 0) throw new Error('No eligible nodes found!')
    const heightThreshold = nodes[0].client.lastSeenHeight - 1
    const goodNodes = nodes.filter(
      n => n.client.lastSeenHeight >= heightThreshold
    )
    let randomIndex = random(goodNodes.length)
    if (randomIndex === goodNodes.length) {
      // eslint-disable-next-line
      randomIndex--
    }
    const randomlySelectedRPCUrl = goodNodes[randomIndex].client.net
    cachedRPCUrl[net] = randomlySelectedRPCUrl
    return randomlySelectedRPCUrl
  } catch (error) {
    console.warn(
      'An error occurred attempting to obtain RPC endpoint defaulting to neon-js getRPCEndpointFrom()',
      {
        error
      }
    )
    const endpoint = await api.getRPCEndpointFrom({ net }, api.neoscan)
    return endpoint
  }
}

export const getNode = async (net: string): Promise<string> => {
  const storage = await getStorage(`${STORAGE_KEY}-${net}`).catch(console.error)
  if (!storage) return ''
  return isEmpty(storage) ? '' : storage
}

const setNode = async (node: string, net: string): Promise<string> =>
  setStorage(`${STORAGE_KEY}-${net}`, node)

export default createActions(
  ID,
  ({ url, net }: Props = {}) => async (): Promise<string> => {
    if (url || url === '') {
      await setNode(url, net)
      return url
    }
    return getNode(net)
  }
)
