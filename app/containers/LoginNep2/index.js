// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loginNep2 } from '../../modules/account'

import LoginNep2 from './LoginNep2'

const actionCreators = {
  loginNep2
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(LoginNep2)
