// @flow
import { compose } from 'recompose'

import LoginWatchOnly from './LoginWatchOnly'
import withCameraAvailability from '../../hocs/withCameraAvailability'
import withSettingsContext from '../../hocs/withSettingsContext'
import withAuthData from '../../hocs/withAuthData'

export default compose(
  withCameraAvailability,
  withAuthData,
)(withSettingsContext(LoginWatchOnly))
