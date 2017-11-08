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
  getPassphrase,
  getGenerating
} from '../../modules/generateWallet'
import CreateWallet from './CreateWallet'

const mapStateToProps = (state) => ({
  wif: getWif(state),
  address: getAddress(state),
  encryptedWif: getEncryptedWif(state),
  passphrase: getPassphrase(state),
  generating: getGenerating(state)
})

const actionCreators = {
  saveKey,
  resetKey,
  generateNewWallet
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet)
