// @flow
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { togglePane } from '../../modules/dashboard'

const mapStateToProps = (state: Object) => ({
  sendPane: state.dashboard.sendPane,
  confirmPane: state.dashboard.confirmPane,
  blockHeight: state.metadata.blockHeight,
  net: state.metadata.network,
  address: state.account.address
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  togglePane: (pane) => dispatch(togglePane(pane))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
