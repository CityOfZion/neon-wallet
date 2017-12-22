// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dashboard from './Dashboard'
import { togglePane } from '../../modules/dashboard'
import { logout } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  sendPane: state.dashboard.sendPane,
  confirmPane: state.dashboard.confirmPane,
  blockHeight: state.metadata.blockHeight,
  net: state.metadata.network,
  address: state.account.address,
  notification: state.notification
})

const actionCreators = {
  togglePane,
  logout
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
