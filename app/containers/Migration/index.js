// @flow
import { compose } from 'recompose'
import withAuthData from '../../hocs/withAuthData'

import Migration from './Migration'

export default compose(withAuthData())(Migration)
