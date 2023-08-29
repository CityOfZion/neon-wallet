// @flow
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'

import LoginNep2 from './LoginNep2'
import withCameraAvailability from '../../hocs/withCameraAvailability'
import withSettingsContext from '../../hocs/withSettingsContext'
import withAuthData from '../../hocs/withAuthData'

export default compose(
  withCameraAvailability,
  injectIntl,
  withAuthData,
  withSettingsContext,
)(LoginNep2)
