// @flow
import { compose, withState } from 'recompose'
import { withData } from 'spunky'
import { injectIntl } from 'react-intl'

import withAuthData from '../../../hocs/withAuthData'

import ContactForm from './ContactFormRefactor'
import contactsActions from '../../../actions/contactsActions'
import withCameraAvailability from '../../../hocs/withCameraAvailability'
import withSettingsContext from '../../../hocs/withSettingsContext'

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default compose(
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
)(withSettingsContext(ContactForm))
