// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginLedgerNanoS from './LoginLedgerNanoS'
import { ledgerNanoSGetLogin, ledgerNanoSGetInfoAsync, getPublicKey, getHardwareDeviceInfo, getHardwarePublicKeyInfo } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  publicKey: getPublicKey(state),
  hardwareDeviceInfo: getHardwareDeviceInfo(state),
  hardwarePublicKeyInfo: getHardwarePublicKeyInfo(state)
})

const actionCreators = {
  ledgerNanoSGetInfoAsync,
  ledgerNanoSGetLogin
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginLedgerNanoS)
