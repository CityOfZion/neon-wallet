// @flow
import { withData } from 'spunky'

import Contacts from './Contacts'
import contactsActions from '../../actions/contactsActions'

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default withData(contactsActions, mapContactsDataToProps)(Contacts)
