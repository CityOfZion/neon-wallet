// @flow
import { connect } from 'react-redux'
import LoginLedgerNanoS from './LoginLedgerNanoS'
import { ledgerNanoSGetLogin, ledgerNanoSGetInfoAsync } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  publicKey: state.account.publicKey,
  hardwareDeviceInfo: state.account.hardwareDeviceInfo,
  hardwarePublicKeyInfo: state.account.hardwarePublicKeyInfo
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  ledgerNanoSGetInfoAsync: () => dispatch(ledgerNanoSGetInfoAsync()),
  ledgerNanoSGetLogin: () => dispatch(ledgerNanoSGetLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginLedgerNanoS)
