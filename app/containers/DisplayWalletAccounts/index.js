// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  saveAccount,
  resetKey,
  getWIF,
  getAddress,
  getEncryptedWIF,
  getPassphrase
} from '../../modules/generateWallet'
import DisplayWalletAccounts from './DisplayWalletAccounts'

const mapStateToProps = (state: Object) => ({
  wif: getWIF(state),
  address: getAddress(state),
  encryptedWIF: getEncryptedWIF(state),
  passphrase: getPassphrase(state)
})

const actionCreators = {
  saveAccount,
  resetKey
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DisplayWalletAccounts)
