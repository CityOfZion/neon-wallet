// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginLocalStorage from './LoginLocalStorage'
import { setKeys, loginNep2 } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  loggedIn: state.account.loggedIn,
  decrypting: state.account.decrypting,
  accountKeys: state.account.accountKeys
})

const actionCreators = {
  setKeys,
  loginNep2
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginLocalStorage)
