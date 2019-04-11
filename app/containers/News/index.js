// @flow
import { compose } from 'recompose'
import { withCall, withData } from 'spunky'

import withLoadingProp from '../../hocs/withLoadingProp'
import newsActions from '../../actions/newsActions'
import News from './News'

export default compose(
  withCall(newsActions),
  withData(newsActions),
  withLoadingProp(newsActions),
)(News)
