import { combineReducers } from 'redux'
import account from '../modules/account'
import generateWallet from '../modules/generateWallet'
import transactions from '../modules/transactions'
import metadata from '../modules/metadata'
import wallet from '../modules/wallet'
import claim from '../modules/claim'
import dashboard from '../modules/dashboard'
import rpx from '../modules/rpx'
import notifications from '../modules/notifications'
import modal from '../modules/modal'

export default combineReducers({
  account,
  generateWallet,
  wallet,
  transactions,
  dashboard,
  metadata,
  claim,
  rpx,
  notifications,
  modal
})
