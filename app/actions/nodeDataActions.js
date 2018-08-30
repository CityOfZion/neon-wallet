// @flow
import { rpc } from 'neon-js'
import { createActions } from 'spunky'
import { NODES } from '../core/constants'

const getBlockCount = async node =>
  new Promise(resolve => {
    let url = node.protocol ? `${node.protocol}://${node.url}` : node.url
    url = node.port ? `${url}:${node.port}` : url

    rpc.Query.getBlockCount()
      .execute(url)
      .then(blockCount => {
        resolve({
          url,
          blockCount: blockCount.result
        })
      })
  })

const ID = 'nodes'

const raceN = (n, promises) => {
  const resolved = []
  return new Promise(res =>
    promises.forEach(promise =>
      promise.then(x => {
        resolved.push(x)
        if (resolved.length === n) res(resolved)
      })
    )
  )
}

export default createActions(
  ID,
  ({ nodes = NODES, totalDisplayed = 15 }: Props = {}) => async () => {
    const promises = nodes.map(node => getBlockCount(node))

    const r = await raceN(totalDisplayed, promises)
    return r
  }
)
