// @flow
import { compose, withProps } from 'recompose'
import { withActions, progressValues } from 'spunky'
import { trim } from 'lodash-es'

import EditContactPanel from './EditContactPanel'
import { updateContactActions } from '../../../actions/contactsActions'
import withProgressChange from '../../../hocs/withProgressChange'
import withFailureNotification from '../../../hocs/withFailureNotification'

const { LOADED } = progressValues

const mapContactActionsToProps = (actions, props) => ({
  onSave: (name, address) =>
    actions.call({
      oldName: props.oldName,
      newName: trim(name),
      newAddress: trim(address)
    })
})

export default compose(
  withProps(({ name }) => ({ oldName: name })),
  withProgressChange(
    updateContactActions,
    LOADED,
    (state, props) => props.onSave && props.onSave()
  ),
  withActions(updateContactActions, mapContactActionsToProps),
  withFailureNotification(updateContactActions)
)(EditContactPanel)
