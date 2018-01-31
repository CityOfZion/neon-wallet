// @flow
import { compose } from 'recompose'

import TokenModal from './TokenModal'
import withNetworkData from '../../../hocs/withNetworkData'
import withTokensData from '../../../hocs/withTokensData'

export default compose(
  withNetworkData(),
  withTokensData()
)(TokenModal)
