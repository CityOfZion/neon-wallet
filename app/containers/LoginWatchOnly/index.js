// @flow
import { compose } from 'recompose'
import { withActions, withProgress } from 'spunky'

import LoginWatchOnly from './LoginWatchOnly'
import withFailureNotification from '../../hocs/withFailureNotification'
import { watchOnlyLoginActions } from '../../actions/authActions'
import withCameraAvailability from '../../hocs/withCameraAvailability'
import withSettingsContext from '../../hocs/withSettingsContext'

const mapActionsToProps = actions => ({
  watchOnlyLogin: ({ address, chain }) => actions.call({ address, chain }),
})

export default compose(
  withActions(watchOnlyLoginActions, mapActionsToProps),
  withFailureNotification(watchOnlyLoginActions),
  withProgress(watchOnlyLoginActions),
  withCameraAvailability,
)(withSettingsContext(LoginWatchOnly))
