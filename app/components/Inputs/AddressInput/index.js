// @flow
import { withData } from 'spunky'

import AddressInput from './AddressInput'
import contactsActions from '../../../actions/contactsActions'

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default withData(contactsActions, mapContactsDataToProps)(AddressInput)
