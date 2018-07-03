// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import WalletBlockHeight from './WalletBlockHeight'
import dashboardActions from '../../../../actions/dashboardActions'

const mapBlockHeightDataToProps = (
  data
): {
  blockHeight: ?number
} =>
  data && {
    blockHeight: data.blockHeight
  }

export default compose(withData(dashboardActions, mapBlockHeightDataToProps))(
  WalletBlockHeight
)
