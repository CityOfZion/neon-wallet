// @flow
import React, { useEffect, type ComponentType } from 'react'
import { useStore } from 'zustand'

// import transactionHistoryStore from '../actions-migrated/transactionHistory'
import pendingTransactionsStore from '../actions-migrated/pendingTransactions'

function withPendingTransactions(mapDataToProps?: Function): Function {
  return function WithPendingTransactionsData(
    WrappedComponent: ComponentType<any>,
  ) {
    return function WithPendingTransactionsWrapper(props: any) {
      const { transactions, getPendingTransactions } = useStore(
        pendingTransactionsStore,
      )

      const { net, address } = props

      const data = mapDataToProps
        ? mapDataToProps(transactions, props)
        : transactions

      return (
        <WrappedComponent
          {...props}
          {...data}
          handleGetPendingTransactionInfo={getPendingTransactions}
          getPendingTransactions={getPendingTransactions}
        />
      )
    }
  }
}

export default withPendingTransactions
