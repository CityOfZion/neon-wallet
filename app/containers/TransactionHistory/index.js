// @flow
import React from 'react'
import { compose, withProps } from 'recompose'
import { withData, withProgress, withProgressComponents, alreadyLoadedStrategy, progressValues } from 'spunky'

import TransactionHistory from './TransactionHistory'
import transactionHistoryActions from '../../actions/transactionHistoryActions'
import withNetworkData from '../../hocs/withNetworkData'
import withAuthData from '../../hocs/withAuthData'
import withoutProps from '../../hocs/withoutProps'

const { LOADING, FAILED } = progressValues

const PROGRESS_PROP = 'progress'

const mapTransactionsDataToProps = (transactions) => ({
  transactions
})

const mapLoadingProp = (props) => ({
  loading: props[PROGRESS_PROP] === LOADING
})

const Failed = <div>Failed to load.</div>

export default compose(
  withNetworkData(),
  withAuthData(),

  // pass `loading` boolean to component
  withProgress(transactionHistoryActions, { propName: PROGRESS_PROP }),
  withProgressComponents(transactionHistoryActions, {
    [FAILED]: Failed
  }, {
    strategy: alreadyLoadedStrategy
  }),
  withProps(mapLoadingProp),
  withData(transactionHistoryActions, mapTransactionsDataToProps),
  withoutProps(PROGRESS_PROP)
)(TransactionHistory)
