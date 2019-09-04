// @flow
import { rpc } from '@cityofzion/neon-js'
import { createActions } from 'spunky'
import { isEmpty } from 'lodash-es'
import { getNode, getRPCEndpoint } from './nodeStorageActions'

type Props = {
  networkId: string,
}

export const ID = 'blockHeight'

export default createActions(ID, ({ networkId }: Props = {}) => async () => {
  let url = await getNode(networkId)
  if (isEmpty(url)) {
    url = await getRPCEndpoint(networkId)
  }
  const client = new rpc.RPCClient(url)

  const count = await client.getBlockCount()
  return count
})
