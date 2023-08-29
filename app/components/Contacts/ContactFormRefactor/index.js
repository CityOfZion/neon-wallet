// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

import ContactForm from './ContactFormRefactor'
import withSettingsContext from '../../../hocs/withSettingsContext'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../modules/notifications'

const actionCreators = {
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
  injectIntl,
  withRouter,
  withSettingsContext,
)(ContactForm)
