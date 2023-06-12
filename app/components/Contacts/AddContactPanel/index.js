// @flow
import { compose, withProps } from 'recompose'
import { withActions, progressValues } from 'spunky'
import { trim } from 'lodash-es'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AddContactPanel from './AddContactPanel'
import { addContactActions } from '../../../actions/contactsActions'
import withProgressChange from '../../../hocs/withProgressChange'
import withFailureNotification from '../../../hocs/withFailureNotification'
import withSettingsContext from '../../../hocs/withSettingsContext'
import { showModal } from '../../../modules/modal'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../modules/notifications'
import { withRouter } from 'react-router-dom'

const { LOADED } = progressValues

const mapContactActionsToProps = (actions: Object) => ({
  onSave: (name, address, chain) =>
    actions.call({ name: trim(name), address: trim(address), chain }),
})

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withProps(({ name }) => ({ oldName: name })),

  withProgressChange(
    addContactActions,
    LOADED,
    (state, props) => props.onSave && props.onSave(),
  ),
  withActions(addContactActions, mapContactActionsToProps),
  withFailureNotification(addContactActions),
  withRouter,
)(withSettingsContext(AddContactPanel))
