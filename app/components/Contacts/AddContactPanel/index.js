// @flow
import { compose, withProps } from 'recompose'
import { withActions, progressValues } from 'spunky'
import { trim } from 'lodash-es'

import AddContactPanel from './AddContactPanel'
import { addContactActions } from '../../../actions/contactsActions'
import withProgressChange from '../../../hocs/withProgressChange'
import withFailureNotification from '../../../hocs/withFailureNotification'

const { LOADED } = progressValues

const mapContactActionsToProps = (actions, props) => ({
  onSave: (name, address) =>
    actions.call({ name: trim(name), address: trim(address) })
})

export default compose(
  withProps(({ name }) => ({ oldName: name })),
  withProgressChange(
    addContactActions,
    LOADED,
    (state, props) => props.onSave && props.onSave()
  ),
  withActions(addContactActions, mapContactActionsToProps),
  withFailureNotification(addContactActions)
)(AddContactPanel)
