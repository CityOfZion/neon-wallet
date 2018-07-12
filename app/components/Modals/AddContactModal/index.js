// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'
import { trim } from 'lodash'

import AddContactModal from './AddContactModal'
import { addContactActions } from '../../../actions/contactsActions'

const mapContactActionsToProps = (actions, props) => ({
  onSave: (name, address) =>
    actions.call({ name: trim(name), address: trim(address) })
})

export default compose(
  withActions(addContactActions, mapContactActionsToProps)
)(AddContactModal)
