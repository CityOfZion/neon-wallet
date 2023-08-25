// @flow

import { create } from 'zustand'
import { rpc } from '@cityofzion/neon-js-legacy'
import { isEmpty } from 'lodash-es'
import { getNode, getRPCEndpoint } from '../actions/nodeStorageActions'

export const useBlockHeightStore = create(set => ({
  count: 0,
}))

export async function getBlockHeight(net: string) {
  let url = await getNode(net)
  if (isEmpty(url)) {
    url = await getRPCEndpoint(net)
  }
  const client = new rpc.RPCClient(url)
  const count = await client.getBlockCount()
  useBlockHeightStore.setState({ count })
}

export async function resetBlockHeight() {
  useBlockHeightStore.setState({ count: 0 })
}
