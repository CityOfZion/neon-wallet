// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginLedgerNanoS from './LoginLedgerNanoS'
import { ledgerNanoSGetLogin, ledgerNanoSGetInfoAsync } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  publicKey: state.account.publicKey,
  hardwareDeviceInfo: state.account.hardwareDeviceInfo,
  hardwarePublicKeyInfo: state.account.hardwarePublicKeyInfo
})

const actionCreators = {
  ledgerNanoSGetInfoAsync,
  ledgerNanoSGetLogin
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginLedgerNanoS)
