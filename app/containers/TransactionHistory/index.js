// @flow
import { compose, withProps } from 'recompose'
import { withData, withProgress, progressValues } from 'spunky'

import TransactionHistory from './TransactionHistory'
import transactionHistoryActions from '../../actions/transactionHistoryActions'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import withoutProps from '../../hocs/withoutProps'

const { LOADING } = progressValues

const PROGRESS_PROP = 'progress'

const mapTransactionsDataToProps = (transactions) => ({
  transactions
})

const mapLoadingProp = (props) => ({
  loading: props[PROGRESS_PROP] === LOADING
})

export default compose(
  withNetworkData(),
  withAuthData(),
  withData(transactionHistoryActions, mapTransactionsDataToProps),

  // pass `loading` boolean to component
  withProgress(transactionHistoryActions, { propName: PROGRESS_PROP }),
  withProps(mapLoadingProp),
  withoutProps(PROGRESS_PROP)
)(TransactionHistory)
