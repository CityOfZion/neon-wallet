// @flow
import storage from 'electron-json-storage'
import { omit, isEmpty } from 'lodash'
import { wallet } from 'neon-js'

import { showSuccessNotification, showErrorNotification } from './notifications'

const ADDRESS_BOOK_STORAGE_KEY = 'addressBook'

// Constants
export const SET_ADDRESSES = 'SET_ADDRESSES'
export const SAVE_ADDRESS = 'SAVE_ADDRESS'

// Actions
function setAddresses (addresses: Array<Object>) {
  return {
    type: SET_ADDRESSES,
    payload: addresses
  }
}

export const loadAddresses = () => (dispatch: DispatchType) => {
  storage.get(ADDRESS_BOOK_STORAGE_KEY, (error, data) => {
    if (error) {
      dispatch(showErrorNotification({ message: 'Error loading address book.' }))
    } else {
      dispatch(setAddresses(data))
    }
  })
}

export const saveAddress = (address: string, name: string) => (dispatch: DispatchType) => {
  if (isEmpty(name)) {
    dispatch(showErrorNotification({ message: 'Please enter a name for your address book entry.' }))
    return null
  }

  if (!wallet.isAddress(address)) {
    dispatch(showErrorNotification({ message: 'The address you entered was not valid.' }))
    return null
  }

  return storage.get(ADDRESS_BOOK_STORAGE_KEY, (error, data) => {
    if (error) {
      dispatch(showErrorNotification({ message: 'Error loading address book.' }))
    } else if (data[name]) {
      dispatch(showErrorNotification({ message: `Address book entry for ${name} already exists.` }))
    } else {
      const addresses = { ...data, [name]: address }

      storage.set(ADDRESS_BOOK_STORAGE_KEY, addresses, (error) => {
        if (error) {
          dispatch(showErrorNotification({ message: `Error saving address book entry for ${name}.` }))
        } else {
          dispatch(showSuccessNotification({ message: `Saved address book entry for ${name}.` }))
          dispatch(setAddresses(addresses))
        }
      })
    }
  })
}

export const deleteAddress = (name: string) => (dispatch: DispatchType) => {
  return storage.get(ADDRESS_BOOK_STORAGE_KEY, (error, data) => {
    if (error) {
      dispatch(showErrorNotification({ message: 'Error loading address book.' }))
    } else if (!data[name]) {
      dispatch(showErrorNotification({ message: `Address book entry for ${name} does not exist.` }))
    } else {
      const addresses = omit(data, name)

      storage.set(ADDRESS_BOOK_STORAGE_KEY, addresses, (error) => {
        if (error) {
          dispatch(showErrorNotification({ message: `Error saving address book entry for ${name}.` }))
        } else {
          dispatch(showSuccessNotification({ message: `Deleted address book entry for ${name}.` }))
          dispatch(setAddresses(addresses))
        }
      })
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
