// @flow
import { combineReducers } from 'redux'
import api from './api'
import generateWallet from './generateWallet'
import transactions from './transactions'
import wallet from './wallet'
import claim from './claim'
import notifications from './notifications'
import modal from './modal'
import addressBook from './addressBook'

export default combineReducers({
  api,
  generateWallet,
  wallet,
  transactions,
  claim,
  notifications,
  modal,
  addressBook
})
