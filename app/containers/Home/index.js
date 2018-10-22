// @flow
import { compose } from 'recompose'

import Home from './Home'
import authActions from '../../actions/authActions'
import withLoadingProp from '../../hocs/withLoadingProp'
import withThemeData from '../../hocs/withThemeData'
import pureStrategy from '../../hocs/helpers/pureStrategy'

export default compose(
  withLoadingProp(authActions, { strategy: pureStrategy }),
  withThemeData()
)(Home)
