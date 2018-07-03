// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import WalletBlockHeight from './WalletBlockHeight'
import balancesAndBlockHeightActions from '../../../../actions/balancesAndBlockHeightActions'

const mapBlockHeightDataToProps = (
  data
): {
  blockHeight: ?number
} =>
  data && {
    blockHeight: data.blockHeight
  }

export default compose(withData(balancesAndBlockHeightActions, mapBlockHeightDataToProps))(
  WalletBlockHeight
)
