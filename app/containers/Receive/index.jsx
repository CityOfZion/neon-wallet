import { compose } from 'recompose'

import Receive from './Receive'
import withAuthData from '../../hocs/withAuthData'

export default compose(
  withAuthData({ address: 'address' })
)(Receive)
