// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'
import { trim } from 'lodash'
import { connect } from 'react-redux'

import { showSuccessNotification } from '../../../modules/notifications'

import AddContactModal from './AddContactModal'
import { addContactActions } from '../../../actions/contactsActions'

const mapContactActionsToProps = (actions, props) => ({
  onSave: (name, address) =>
    actions.call({ name: trim(name), address: trim(address) })
})

const mapDispatchToProps = dispatch => ({
  triggerSuccessNotification(text) {
    dispatch(showSuccessNotification({ message: text }))
  }
})

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withActions(addContactActions, mapContactActionsToProps)
)(AddContactModal)
