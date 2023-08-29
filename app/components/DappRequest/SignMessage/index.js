import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SignMessage from './SignMessage'
import {
  showSuccessNotification,
  showErrorNotification,
} from '../../../modules/notifications'
import withAuthData from '../../../hocs/withAuthData'

const actionCreators = {
  showSuccessNotification,
  showErrorNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData,
  withRouter,
)(SignMessage)
