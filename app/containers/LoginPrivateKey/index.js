// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginPrivateKey from './LoginPrivateKey'
import { loginWithPrivateKey } from '../../modules/account'

const actionCreators = {
  loginWithPrivateKey
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(LoginPrivateKey)
