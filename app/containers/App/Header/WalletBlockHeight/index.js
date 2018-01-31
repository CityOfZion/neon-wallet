// @flow
import { compose } from 'recompose'

import WalletBlockHeight from './WalletBlockHeight'
import withData from '../../../../hocs/api/withData'
import appActions from '../../../../actions/appActions'

const mapAppDataToProps = ({ blockHeight }): Object => ({
  blockHeight
})

export default compose(
  withData(appActions, mapAppDataToProps)
)(WalletBlockHeight)
