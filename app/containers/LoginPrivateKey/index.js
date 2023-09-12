// @flow
import { compose } from 'recompose'

import LoginPrivateKey from './LoginPrivateKey'
import withFailureNotification from '../../hocs/withFailureNotification'
import withCameraAvailability from '../../hocs/withCameraAvailability'

import withSettingsContext from '../../hocs/withSettingsContext'
import withAuthData from '../../hocs/withAuthData'

export default compose(
  withCameraAvailability,
  withAuthData,
)(withSettingsContext(LoginPrivateKey))
