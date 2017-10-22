// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginNep2 from './LoginNep2'
import { loginNep2 } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  decrypting: state.account.decrypting,
  accountKeys: state.account.accountKeys
})

const actionCreators = {
  loginNep2
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginNep2)
