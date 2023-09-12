// @flow
import { compose } from 'recompose'

import Main from './Main'

import withSettingsContext from '../../../hocs/withSettingsContext'
import withAuthData from '../../../hocs/withAuthData'

export default compose(
  withAuthData,
  withSettingsContext,
)(Main)
