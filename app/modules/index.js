// @flow
import { combineReducers } from 'redux'
import { reducer as spunky } from 'spunky'

import generateWallet from './generateWallet'
import generateEncryptedWIF from './generateEncryptedWIF'

import claim from './claim'
import notifications from './notifications'
import modal from './modal'

// $FlowFixMe
export default combineReducers({
  spunky,
  generateEncryptedWIF,
  generateWallet,
  claim,
  notifications,
  modal,
})
