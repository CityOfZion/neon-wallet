// @flow
import { rpc } from '@cityofzion/neon-js'
import { createActions } from 'spunky'
import { isEmpty } from 'lodash-es'
import { getNode, getRPCEndpoint } from './nodeStorageActions'

type Props = {
  networkId: string,
}

const exportedModule = {}

export const ID = 'blockHeight'

export const getBlockHeight = async (networkId: string) => {
  let url = await getNode(networkId)
  if (isEmpty(url)) {
    url = await getRPCEndpoint(networkId)
  }
  const client = new rpc.RPCClient(url)
  const count = await client.getBlockCount()
  return count
}
exportedModule.getBlockHeight = getBlockHeight

export const blockHeightActions = createActions(
  ID,
  ({ networkId }: Props = {}) => async () => {
    const count = await exportedModule.getBlockHeight(networkId)
    return count
  },
)
exportedModule.blockHeightActions = blockHeightActions

export default exportedModule
