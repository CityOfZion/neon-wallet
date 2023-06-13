// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import ContactsPanel from './ContactsPanel'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../modules/notifications'
import { showModal } from '../../../modules/modal'
import withSettingsContext from '../../../hocs/withSettingsContext'

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
  injectIntl,
)(withSettingsContext(ContactsPanel))
