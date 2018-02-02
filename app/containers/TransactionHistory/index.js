// @flow
import { compose, withProps } from 'recompose'

import TransactionHistory from './TransactionHistory'
import transactionHistoryActions from '../../actions/transactionHistoryActions'
import withFetch from '../../hocs/api/withFetch'
import withData from '../../hocs/api/withData'
import withProgressProp from '../../hocs/api/withProgressProp'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import withoutProps from '../../hocs/withoutProps'
import { LOADING } from '../../values/state'

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
  withFetch(transactionHistoryActions),
  withData(transactionHistoryActions, mapTransactionsDataToProps),

  // pass `loading` boolean to component
  withProgressProp(transactionHistoryActions, { propName: PROGRESS_PROP }),
  withProps(mapLoadingProp),
  withoutProps(PROGRESS_PROP)
)(TransactionHistory)
