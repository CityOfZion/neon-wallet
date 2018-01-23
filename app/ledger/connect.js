// @flow
import commNode from './ledger-comm-node'

async function list () {
  try {
    return await commNode.list_async()
  } catch (err) {
    throw new Error(`USB Error: ${err.message}.`)
  }
}

export default async function connect () {
  const devices = await list()

  if (devices.length === 0) {
    throw new Error('USB Error: No device found.')
  }

  try {
    return await commNode.create_async()
  } catch (error) {
    throw new Error(`USB Error: Login to NEO App and try again.`)
  }
}
