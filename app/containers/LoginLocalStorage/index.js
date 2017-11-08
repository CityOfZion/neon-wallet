// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginLocalStorage from './LoginLocalStorage'
import { setKeys, loginNep2, getAccountKeys } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  accountKeys: getAccountKeys(state)
})

const actionCreators = {
  setKeys,
  loginNep2
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginLocalStorage)
