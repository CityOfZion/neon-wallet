// @flow
import React, { useEffect, type ComponentType } from 'react'
import { useStore } from 'zustand'

import transactionHistoryStore from '../actions-migrated/transactionHistory'

function withTransactionHistory(mapDataToProps?: Function): Function {
  return function WithTransactionHistoryData(
    WrappedComponent: ComponentType<any>,
  ) {
    return function WithTransactionHistoryWrapper(props: any) {
      const { count, page, entries, fetchTransactions } = useStore(
        transactionHistoryStore,
      )

      const { net, address } = props

      const data = mapDataToProps
        ? mapDataToProps({ count, entries }, props)
        : { count, entries }

      // useEffect(() => {
      //   console.log('fetching transactions')
      //   fetchTransactions({ net, address })
      // }, [])

      return (
        <WrappedComponent
          {...props}
          {...data}
          fetchTransactions={fetchTransactions}
          handleFetchAdditionalTxData={({ net, address }) =>
            fetchTransactions({ net, address, shouldIncrementPagination: true })
          }
          handleRefreshTxData={fetchTransactions}
        />
      )
    }
  }
}

export default withTransactionHistory
