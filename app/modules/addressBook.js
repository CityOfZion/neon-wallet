// @flow
import storage from 'electron-json-storage'
import { omit, isEmpty, keys, values, indexOf, zipObject } from 'lodash'
import { wallet } from 'neon-js'

import { showSuccessNotification, showErrorNotification } from './notifications'

const ADDRESS_BOOK_STORAGE_KEY = 'addressBook'

// Constants
export const SET_ADDRESSES = 'SET_ADDRESSES'
export const SAVE_ADDRESS = 'SAVE_ADDRESS'

// Actions
function setAddresses (addresses: Object) {
  return {
    type: SET_ADDRESSES,
    payload: addresses
  }
}

const saveAddresses = (addresses: Object) => (dispatch: DispatchType) => {
  storage.set(ADDRESS_BOOK_STORAGE_KEY, addresses, (error) => {
    if (error) {
      dispatch(showErrorNotification({ message: `Error saving contact.` }))
    } else {
      dispatch(showSuccessNotification({ message: `Saved to contacts.` }))
      dispatch(setAddresses(addresses))
    }
  })
}

export const loadAddresses = () => (dispatch: DispatchType) => {
  storage.get(ADDRESS_BOOK_STORAGE_KEY, (error, data) => {
    if (error) {
      dispatch(showErrorNotification({ message: 'Error loading contacts.' }))
    } else {
      dispatch(setAddresses(data))
    }
  })
}

export const saveAddress = (name: string, address: string) => (dispatch: DispatchType) => {
  if (isEmpty(name)) {
    dispatch(showErrorNotification({ message: 'Name cannot be empty.' }))
    return null
  }

  if (!wallet.isAddress(address)) {
    dispatch(showErrorNotification({ message: 'Invalid address.' }))
    return null
  }

  return storage.get(ADDRESS_BOOK_STORAGE_KEY, (error, data) => {
    if (error) {
      dispatch(showErrorNotification({ message: 'Error loading contacts.' }))
    } else if (data[name]) {
      dispatch(showErrorNotification({ message: `Contact "${name}" already exists.` }))
    } else {
      dispatch(saveAddresses({ ...data, [name]: address }))
    }
  })
}

export const updateAddress = (oldName: string, newName: string, newAddress: string) => (dispatch: DispatchType) => {
  if (isEmpty(newName)) {
    dispatch(showErrorNotification({ message: 'Name cannot be empty.' }))
    return
  }

  if (!wallet.isAddress(newAddress)) {
    dispatch(showErrorNotification({ message: 'Invalid address.' }))
    return
  }

  return storage.get(ADDRESS_BOOK_STORAGE_KEY, (error, data) => {
    if (error) {
      dispatch(showErrorNotification({ message: 'Error loading address book.' }))
    } else {
      const names = keys(data)
      const addresses = values(data)
      const index = indexOf(names, oldName)

      if (index === -1) {
        dispatch(showErrorNotification({ message: `Contact "${oldName}" does not exist.` }))
        return
      }

      const contacts = zipObject(
        [...names.slice(0, index), newName, ...names.slice(index + 1)],
        [...addresses.slice(0, index), newAddress, ...addresses.slice(index + 1)]
      )

      dispatch(saveAddresses(contacts))
    }
  })
}

export const deleteAddress = (name: string) => (dispatch: DispatchType) => {
  return storage.get(ADDRESS_BOOK_STORAGE_KEY, (error, data) => {
    if (error) {
      dispatch(showErrorNotification({ message: 'Error loading contact.' }))
    } else if (!data[name]) {
      dispatch(showErrorNotification({ message: `Contact "${name}" does not exist.` }))
    } else {
      dispatch(saveAddresses(omit(data, name)))
    }
  })
}

// State Getters
export const getAddresses = (state: Object) => state.addressBook.addresses

const initialState = {
  addresses: {}
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload
      }
    case SAVE_ADDRESS:
      const { address, name } = action.payload
      return {
        ...state,
        addresses: { ...state.addresses, [name]: address }
      }
    default:
      return state
  }
}
