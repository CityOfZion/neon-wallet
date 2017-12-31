// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setAccounts, getAccounts, loginNep2 } from '../../modules/account'

import LoginLocalStorage from './LoginLocalStorage'

const mapStateToProps = (state: Object) => ({
  accounts: getAccounts(state)
})

const actionCreators = {
  setAccounts,
  loginNep2
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginLocalStorage)
