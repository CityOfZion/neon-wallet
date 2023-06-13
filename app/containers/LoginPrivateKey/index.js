// @flow
import { compose } from 'recompose'
import { withActions, withProgress } from 'spunky'

import LoginPrivateKey from './LoginPrivateKey'
import withFailureNotification from '../../hocs/withFailureNotification'
import withCameraAvailability from '../../hocs/withCameraAvailability'
import { n3WifLoginActions, wifLoginActions } from '../../actions/authActions'
import withSettingsContext from '../../hocs/withSettingsContext'

const mapWifLoginActionsToProps = actions => ({
  loginWithPrivateKey: wif => actions.call({ wif }),
})

const mapN3WifLoginActionsToProps = actions => ({
  loginWithN3PrivateKey: wif => actions.call({ wif }),
})

export default compose(
  withActions(wifLoginActions, mapWifLoginActionsToProps),
  withActions(n3WifLoginActions, mapN3WifLoginActionsToProps),
  withFailureNotification(wifLoginActions),
  withProgress(wifLoginActions),
  withCameraAvailability,
)(withSettingsContext(LoginPrivateKey))
