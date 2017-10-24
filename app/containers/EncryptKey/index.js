// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveKey, resetKey, generateWalletFromWif } from '../../modules/generateWallet'
import EncryptKey from './EncryptKey'

const mapStateToProps = (state) => ({
  wif: state.generateWallet.wif,
  address: state.generateWallet.address,
  encryptedWif: state.generateWallet.encryptedWif,
  passphrase: state.generateWallet.passphrase,
  generating: state.generateWallet.generating
})

const actionCreators = {
  saveKey,
  resetKey,
  generateWalletFromWif
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EncryptKey)
