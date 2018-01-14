// @flow
import { combineReducers } from 'redux'
import account from './account'
import generateWallet from './generateWallet'
import transactions from './transactions'
import metadata from './metadata'
import wallet from './wallet'
import claim from './claim'
import dashboard from './dashboard'
import notifications from './notifications'
import modal from './modal'
import price from './price'
import addressBook from './addressBook'
import sale from './sale'

export default combineReducers({
  account,
  generateWallet,
  wallet,
  transactions,
  dashboard,
  metadata,
  claim,
  notifications,
  modal,
  price,
  addressBook,
  sale
})
