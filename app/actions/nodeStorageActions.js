// @flow
import { createActions } from 'spunky'

import { getStorage, setStorage } from '../core/storage'

const ID = 'nodeStorage'
const STORAGE_KEY = 'selectedNode'

export const getNode = async (): Promise<string> => getStorage(STORAGE_KEY)

const setNode = async (node: string): Promise<string> =>
  setStorage(STORAGE_KEY, node)

export const getSavedNodeActions = createActions(ID, () => async (): Promise<
  string
> => getNode())

export default createActions(ID, (url: string) => async (): Promise<string> => {
  await setNode(url)
  return url
})
