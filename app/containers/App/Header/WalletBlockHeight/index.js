// @flow
import { compose } from 'recompose';
import { withData } from 'spunky';

import WalletBlockHeight from './WalletBlockHeight';
import balancesActions from '../../../../actions/balancesActions';

const mapBlockHeightDataToProps = (
  data
): {
  blockHeight: ?number
} =>
  data && {
    blockHeight: data.blockHeight
  }

export default compose(withData(balancesActions, mapBlockHeightDataToProps))(
  WalletBlockHeight
)
