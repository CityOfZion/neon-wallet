// @flow
import { connect } from 'react-redux'
import LoginPrivateKey from './LoginPrivateKey'
import { onWifChange } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  onWifChange: (history, wif) => dispatch(onWifChange(history, wif))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPrivateKey)
