// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginNep2 from './LoginNep2'
import { loginNep2 } from '../../modules/account'

const actionCreators = {
  loginNep2
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(LoginNep2)
