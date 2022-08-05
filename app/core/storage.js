import { ipcRenderer } from 'electron'
import storage from 'electron-json-storage'
import promisify from 'es6-promisify'

const os = require('os')

const electron = require('electron')

// console.log(electron.app)
// // console.log(app.getPath('userData'))

// console.log(electron.app.getPath('userData'), 'storage')

console.log(ipcRenderer.invoke('getPath'))

// console.log(os.tmpdir())
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
