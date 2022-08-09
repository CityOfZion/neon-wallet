import { ipcRenderer } from 'electron'
import storage from 'electron-json-storage'
import promisify from 'es6-promisify'

const get = promisify(storage.get, storage)
const set = promisify(storage.set, storage)

const ENCRYPTED_FILES_WHITELIST = ['address']

export const setStorage = async (key, value, encrypt = false) => {
  const path = await ipcRenderer.invoke('getPath')
  storage.setDataPath(path)
  const encryptedValue = await ipcRenderer.invoke(
    'safeStorageEncrypt',
    JSON.stringify(value),
  )
  await set(key, encrypt ? encryptedValue : value)
}

export const getStorage = async key => {
  const path = await ipcRenderer.invoke('getPath')
  storage.setDataPath(path)
  const value = await get(key)

  // If the file name being requested includes address
  // and is NOT encrypted, we encrypt the file.
  if (
    key &&
    !!ENCRYPTED_FILES_WHITELIST.find(fileName =>
      key.toLowerCase().includes(fileName),
    )
  ) {
    // if the value is a valid JS object it has not been encrypted
    if (typeof value === 'object') {
      await setStorage(key, value, true)
    }
  }
  // Only encrypted values get stored as strings
  if (typeof value === 'string') {
    const decryptedValue = await ipcRenderer.invoke('safeStorageDecrypt', value)
    return JSON.parse(decryptedValue)
  }

  return value
}
