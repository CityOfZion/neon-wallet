// @flow
import { compose } from 'recompose'
import { withActions, withProgress } from 'spunky'

import LoginWatchOnly from './LoginWatchOnly'
import withFailureNotification from '../../hocs/withFailureNotification'
import { watchOnlyLoginActions } from '../../actions/authActions'

const mapActionsToProps = actions => ({
  watchOnlyLogin: address => actions.call({ address }),
})

export default compose(
  withActions(watchOnlyLoginActions, mapActionsToProps),
  withFailureNotification(watchOnlyLoginActions),
  withProgress(watchOnlyLoginActions),
)(LoginWatchOnly)
