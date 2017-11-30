// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  saveKey,
  resetKey,
  generateNewWallet,
  getWIF,
  getAddress,
  getEncryptedWIF,
  getPassphrase
} from '../../modules/generateWallet'

import EncryptKey from './EncryptKey'

const mapStateToProps = (state: Object) => ({
  wif: getWIF(state),
  address: getAddress(state),
  encryptedWIF: getEncryptedWIF(state),
  passphrase: getPassphrase(state)
})

const actionCreators = {
  saveKey,
  resetKey,
  generateNewWallet
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EncryptKey)
