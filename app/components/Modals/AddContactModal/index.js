// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'
import { trim } from 'lodash-es'
import { connect } from 'react-redux'

import { showSuccessNotification } from '../../../modules/notifications'

import AddContactModal from './AddContactModal'
import withSettingsContext from '../../../hocs/withSettingsContext'

const mapDispatchToProps = (dispatch: Function) => ({
  triggerSuccessNotification(text: string) {
    dispatch(showSuccessNotification({ message: text }))
  },
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
)(withSettingsContext(AddContactModal))
