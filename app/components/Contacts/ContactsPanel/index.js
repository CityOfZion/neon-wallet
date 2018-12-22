// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'
import { withRouter } from 'react-router-dom'

import ContactsPanel from './ContactsPanel'
import { deleteContactActions } from '../../../actions/contactsActions'
import withFailureNotification from '../../../hocs/withFailureNotification'

const mapContactActionsToProps = actions => ({
  deleteContact: name => actions.call({ name }),
})

export default compose(
  withRouter,
  withActions(deleteContactActions, mapContactActionsToProps),
  withFailureNotification(deleteContactActions),
)(ContactsPanel)
