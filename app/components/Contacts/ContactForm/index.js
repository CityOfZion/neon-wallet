// @flow
import { compose, withState } from 'recompose'
import { withData } from 'spunky'

import withAuthData from '../../../hocs/withAuthData'

import ContactForm from './ContactForm'
import contactsActions from '../../../actions/contactsActions'

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default compose(
  withAuthData(),
  withData(contactsActions, mapContactsDataToProps),
  withState('formName', 'setName', ({ formName }) => formName || ''),
  withState('formAddress', 'setAddress', ({ formAddress }) => formAddress || '')
)(ContactForm)
