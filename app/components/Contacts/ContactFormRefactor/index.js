// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose, withState } from 'recompose'
import { withData } from 'spunky'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router-dom'

import withAuthData from '../../../hocs/withAuthData'
import ContactForm from './ContactFormRefactor'
import contactsActions from '../../../actions/contactsActions'
import withCameraAvailability from '../../../hocs/withCameraAvailability'
import withSettingsContext from '../../../hocs/withSettingsContext'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../modules/notifications'

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

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
  withAuthData(),
  withData(contactsActions, mapContactsDataToProps),
  withState('formName', 'setName', ({ formName }) => formName || ''),
  withState(
    'formAddress',
    'setAddress',
    ({ formAddress }) => formAddress || '',
  ),
  injectIntl,
  withCameraAvailability,
  withRouter,
)(withSettingsContext(ContactForm))
