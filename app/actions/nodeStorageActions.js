// @flow
import { createActions } from 'spunky'
import { isEmpty } from 'lodash-es'

import { getStorage, setStorage } from '../core/storage'

const ID = 'nodeStorage'
const STORAGE_KEY = 'selectedNode'

type Props = {
  url: string,
  net: string
}

export const getNode = async (net: string): Promise<string> =>
  getStorage(`${STORAGE_KEY}-${net}`)

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
