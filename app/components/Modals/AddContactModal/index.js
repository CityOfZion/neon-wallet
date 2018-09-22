// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'
import { trim } from 'lodash-es'
import { connect } from 'react-redux'

import { showSuccessNotification } from '../../../modules/notifications'

import AddContactModal from './AddContactModal'
import { addContactActions } from '../../../actions/contactsActions'

const mapContactActionsToProps = (actions: Object) => ({
  onSave: (name: string, address: string) =>
    actions.call({ name: trim(name), address: trim(address) })
})

const mapDispatchToProps = (dispatch: Function) => ({
  triggerSuccessNotification(text: string) {
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
