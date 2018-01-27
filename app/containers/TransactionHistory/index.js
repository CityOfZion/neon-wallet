// @flow
import { compose, mapProps } from 'recompose'
import { omit } from 'lodash'

import TransactionHistory from './TransactionHistory'
import transactionHistoryActions from '../../actions/transactionHistoryActions'
import withFetch from '../../hocs/api/withFetch'
import withData from '../../hocs/api/withData'
import withProgressProp from '../../hocs/api/withProgressProp'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import { LOADING } from '../../values/state'

const mapTransactionsDataToProps = (transactions) => ({
  transactions
})

const mapLoadingProp = (props) => ({
  ...omit(props, 'progress'),
  loading: props.progress === LOADING
})

export default compose(
  withNetworkData(),
  withAuthData(),
  withFetch(transactionHistoryActions),
  withData(transactionHistoryActions, mapTransactionsDataToProps),
  withProgressProp(transactionHistoryActions, { propName: 'progress' }),
  mapProps(mapLoadingProp)
)(TransactionHistory)
