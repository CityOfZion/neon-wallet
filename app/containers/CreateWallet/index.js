// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  saveKey,
  resetKey,
  generateNewWallet,
  getWif,
  getAddress,
  getEncryptedWif,
  getPassphrase
} from '../../modules/generateWallet'

import CreateWallet from './CreateWallet'

const mapStateToProps = (state: Object) => ({
  wif: getWif(state),
  address: getAddress(state),
  encryptedWif: getEncryptedWif(state),
  passphrase: getPassphrase(state)
})

const actionCreators = {
  saveKey,
  resetKey,
  generateNewWallet
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet)
