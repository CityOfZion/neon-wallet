import storage from 'electron-json-storage'

export const getStorage = async (key) => {
  return storage.get(key)
}

export const setStorage = async (key, value) => {
  return storage.set(key, value)
}
