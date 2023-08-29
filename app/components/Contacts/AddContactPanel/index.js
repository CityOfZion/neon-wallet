// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import AddContactPanel from './AddContactPanel'
import withSettingsContext from '../../../hocs/withSettingsContext'
import { showModal } from '../../../modules/modal'
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
  withSettingsContext,
)(AddContactPanel)
