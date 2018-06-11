// @flow
import { compose } from 'recompose'
import { withCall, withData, withRecall } from 'spunky'

import WalletBlockHeight from './WalletBlockHeight'
import withNetworkData from '../../../../hocs/withNetworkData'
import blockHeightActions from '../../../../actions/blockHeightActions'

const mapBlockHeightDataToProps = (blockHeight: ?number): {
  blockHeight: ?number
} => ({
  blockHeight
})

export default compose(
  withNetworkData(),
  withCall(blockHeightActions),
  withData(blockHeightActions, mapBlockHeightDataToProps),
  withRecall(blockHeightActions, ['networkId'])
)(WalletBlockHeight)
