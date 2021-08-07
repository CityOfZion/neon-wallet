// @flow
import { withCall, withData } from 'spunky'
import { compose } from 'redux'

import Contacts from './Contacts'
import contactsActions from '../../actions/contactsActions'

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default compose(
  withCall(contactsActions),
  withData(contactsActions, mapContactsDataToProps),
)(Contacts)
