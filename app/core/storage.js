import { ipcRenderer } from 'electron'
import storage from 'electron-json-storage'
import promisify from 'es6-promisify'

const get = promisify(storage.get, storage)
const set = promisify(storage.set, storage)

export const getStorage = async key => {
  const path = await ipcRenderer.invoke('getPath')

  storage.setDataPath(path)
  return get(key)
}

export const setStorage = async (key, value) => {
  const path = await ipcRenderer.invoke('getPath')

  storage.setDataPath(path)
  set(key, value)
}
