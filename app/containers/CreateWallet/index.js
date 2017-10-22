// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { newWallet, resetKey } from '../../modules/generateWallet'
import { sendEvent, clearTransactionEvent } from '../../modules/transactions'
import CreateWallet from './CreateWallet'

const mapStateToProps = (state) => ({
  wif: state.generateWallet.wif,
  address: state.generateWallet.address,
  encryptedWif: state.generateWallet.encryptedWif,
  passphrase: state.generateWallet.passphrase,
  generating: state.generateWallet.generating
})

const actionCreators = {
  newWallet,
  sendEvent,
  clearTransactionEvent,
  resetKey
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateWallet)
