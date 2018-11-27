// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'

import LoginPrivateKey from './LoginPrivateKey'
import withFailureNotification from '../../hocs/withFailureNotification'
import withCameraAvailability from '../../hocs/withCameraAvailability'
import { wifLoginActions } from '../../actions/authActions'

const mapActionsToProps = actions => ({
  loginWithPrivateKey: wif => actions.call({ wif })
})

export default compose(
  withActions(wifLoginActions, mapActionsToProps),
  withFailureNotification(wifLoginActions),
  withCameraAvailability
)(LoginPrivateKey)
