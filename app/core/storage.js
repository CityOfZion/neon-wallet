import storage from 'electron-json-storage'
import promisify from 'es6-promisify'

const get = promisify(storage.get, storage)
const set = promisify(storage.set, storage)

export const getStorage = async key => get(key)

export const setStorage = async (key, value) => set(key, value)
