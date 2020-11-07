// @flow

import { compose } from 'recompose'
import {
  withData,
  withCall,
  alreadyLoadedStrategy,
  progressValues,
  withProgressComponents,
} from 'spunky'

import Loading from '../App/Loading'
import walletLabelActions from '../../actions/walletLabelActions'
import withThemeData from '../../hocs/withThemeData'
import WalletManager from './WalletManager'

const { LOADING } = progressValues

const mapAccountsDataToProps = accounts => ({
  accounts,
})

export default compose(
  withCall(walletLabelActions),
  withProgressComponents(
    walletLabelActions,
    {
      [LOADING]: Loading,
    },
    {
      strategy: alreadyLoadedStrategy,
    },
  ),
  withData(walletLabelActions, mapAccountsDataToProps),
  withThemeData(),
)(WalletManager)
