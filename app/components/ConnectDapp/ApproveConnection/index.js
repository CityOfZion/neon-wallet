import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { showModal } from '../../../modules/modal'
import ApproveConnection from './ApproveConnection'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../modules/notifications'

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withRouter,
  withAuthData,
  withNetworkData(),
)(ApproveConnection)
