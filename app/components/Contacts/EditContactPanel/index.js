// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose, withProps } from 'recompose'
import { withActions, progressValues } from 'spunky'
import { trim } from 'lodash-es'

import EditContactPanel from './EditContactPanel'
import {
  updateContactActions,
  deleteContactActions
} from '../../../actions/contactsActions'
import withProgressChange from '../../../hocs/withProgressChange'
import withFailureNotification from '../../../hocs/withFailureNotification'
import { showModal } from '../../../modules/modal'

const { LOADED } = progressValues

const actionCreators = {
  showModal
}

const mapContactActionsToProps = (actions, props) => ({
  onSave: (name, address) =>
    actions.call({
      oldName: props.oldName,
      newName: trim(name),
      newAddress: trim(address)
    })
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const mapDeleteContactActionsToProps = actions => ({
  deleteContact: name => actions.call({ name })
})

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withProps(({ name }) => ({ oldName: name })),
  withProgressChange(
    updateContactActions,
    LOADED,
    (state, props) => props.onSave && props.onSave()
  ),
  withActions(updateContactActions, mapContactActionsToProps),
  withActions(deleteContactActions, mapDeleteContactActionsToProps),
  withFailureNotification(deleteContactActions),
  withFailureNotification(updateContactActions)
)(EditContactPanel)
