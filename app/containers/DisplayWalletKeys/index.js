// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { showModal } from '../../modules/modal'

import {
  saveKey,
  resetKey,
  getWIF,
  getAddress,
  getEncryptedWIF,
  getPassphrase
} from '../../modules/generateWallet'

import DisplayWalletKeys from './DisplayWalletKeys'

const mapStateToProps = (state: Object) => ({
  wif: getWIF(state),
  address: getAddress(state),
  encryptedWIF: getEncryptedWIF(state),
  passphrase: getPassphrase(state)
})

const actionCreators = {
  saveKey,
  resetKey,
  showModal
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DisplayWalletKeys)
