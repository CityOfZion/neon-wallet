// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import WalletBlockHeight from './WalletBlockHeight'
import appActions from '../../../../actions/appActions'

const mapAppDataToProps = ({ blockHeight }): Object => ({
  blockHeight
})

export default compose(
  withData(appActions, mapAppDataToProps)
)(WalletBlockHeight)
