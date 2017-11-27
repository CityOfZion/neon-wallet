// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setKeys, loginNep2, getAccountKeys } from '../../modules/account'

import LoginLocalStorage from './LoginLocalStorage'

const mapStateToProps = (state: Object) => ({
  accountKeys: getAccountKeys(state)
})

const actionCreators = {
  setKeys,
  loginNep2
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginLocalStorage)
