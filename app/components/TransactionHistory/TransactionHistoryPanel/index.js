// @flow
import { compose } from 'recompose'
import { withData, withProgressComponents, alreadyLoadedStrategy, progressValues } from 'spunky'

import TransactionHistoryPanel from './TransactionHistoryPanel'
import transactionHistoryActions from '../../../actions/transactionHistoryActions'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import Loading from '../../../containers/App/Loading'
import Failed from '../../../containers/App/Failed'

const { LOADING, FAILED } = progressValues

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
    strategy: alreadyLoadedStrategy
  })
)(TransactionHistoryPanel)
