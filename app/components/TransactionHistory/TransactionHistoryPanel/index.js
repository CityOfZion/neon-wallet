// @flow
import { compose } from 'recompose'

import TransactionHistoryPanel from './TransactionHistoryPanel'
import transactionHistoryActions from '../../../actions/transactionHistoryActions'
import withData from '../../../hocs/api/withData'
import withProgressComponents from '../../../hocs/api/withProgressComponents'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import alreadyLoaded from '../../../hocs/api/progressStrategies/alreadyLoadedStrategy'
import Loading from '../../../containers/App/Loading'
import Failed from '../../../containers/App/Failed'
import { LOADING, FAILED } from '../../../values/state'

const mapTransactionsDataToProps = (transactions) => ({
  transactions
})

export default compose(
  withNetworkData(),
  withAuthData(),
  withData(transactionHistoryActions, mapTransactionsDataToProps),
  withProgressComponents(transactionHistoryActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }, {
    strategy: alreadyLoaded
  })
)(TransactionHistoryPanel)
