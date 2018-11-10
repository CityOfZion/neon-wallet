// @flow
import axios from 'axios'
import { createActions } from 'spunky'
import { isEmpty } from 'lodash-es'
import { RPCClient, api, timeout, rpc } from 'neon-js'

import { getStorage, setStorage } from '../core/storage'
import {
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
  NODES_MAIN_NET,
  NODES_TEST_NET
} from '../core/constants'
import { findNetworkIdByLabel } from '../core/networks'

const ID = 'nodeStorage'
const STORAGE_KEY = 'selectedNode'
let cachedRPCUrl

type Props = {
  url: string,
  net: string
}

const getRPCEndpoint = async (
  net,
  filterCriteria = [''],
  excludeCritera = ['ngd', 'neo.org']
) => {
  try {
    const NETWORK_ID = findNetworkIdByLabel(net)
    let nodeList
    switch (NETWORK_ID) {
      case MAIN_NETWORK_ID:
        nodeList = NODES_MAIN_NET
        break
      case TEST_NETWORK_ID:
        nodeList = NODES_TEST_NET
        break
      default:
        nodeList = NODES_MAIN_NET
    }
    const data = nodeList
      // eslint-disable-next-line
      .filter(
        data =>
          filterCriteria.some(criteria => data.url.includes(criteria)) &&
          excludeCritera.some(criteria => !data.url.includes(criteria))
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
    const randomlySelectedRPCUrl =
      goodNodes[Math.floor(Math.random() * goodNodes.length)].client.net
    cachedRPCUrl = randomlySelectedRPCUrl
    return randomlySelectedRPCUrl
  } catch (error) {
    console.log('An error occurred attempting to obtain RPC endpoint', {
      error
    })
    return ''
  }
}

export const getNode = async (net: string): Promise<string> => {
  let url = await getStorage(`${STORAGE_KEY}-${net}`)
  if (isEmpty(url)) {
    url = cachedRPCUrl || (await getRPCEndpoint(net))
  }
  return url
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
    const storage = await getNode(net)
    return isEmpty(storage) ? '' : storage
  }
)
