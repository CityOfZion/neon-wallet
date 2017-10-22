// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginPrivateKey from './LoginPrivateKey'
import { loginWithPrivateKey } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
})

const actionCreators = {
  loginWithPrivateKey
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPrivateKey)
