// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clearNotification } from '../../modules/notification'
import { checkVersion } from '../../modules/metadata'
import App from './App'

const mapStateToProps = (state: Object) => ({
  notification: state.notification
})

const actionCreators = {
  clearNotification,
  checkVersion
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
