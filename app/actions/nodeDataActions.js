// @flow
import { rpc } from 'neon-js'
import { createActions } from 'spunky'
import { NODES } from '../core/constants'

const getBlockCount = async node => {
  let url = node.protocol ? `${node.protocol}://${node.url}` : node.url
  url = node.port ? `${url}:${node.port}` : url

  try {
    const blockCount = await rpc.Query.getBlockCount().execute(url)
    // TODO latency
    return {
      url,
      blockCount: blockCount.result
    }
  } catch (err) {
    return {
      url,
      blockCount: 0
    }
  }
}

const ID = 'nodes'

export default createActions(
  ID,
  ({ nodes = NODES }: Props = {}) => async () => {
    const result = await Promise.all(nodes.map(node => getBlockCount(node)))
    return result
  }
)
