// @flow
import React, { useEffect, type ComponentType } from 'react'
import { useStore } from 'zustand'

// import usePricesStore from '../actions-migrated/prices'
import usePriceHistoryStore from '../actions-migrated/priceHistory'

function withPriceHistoryData(mapDataToProps?: Function): Function {
  return function WithPriceHistoryData(WrappedComponent: ComponentType<any>) {
    return function WithPriceHistoryDataWrapper(props: any) {
      const { priceHistory, getPriceHistory } = useStore(usePriceHistoryStore)
      const data = mapDataToProps
        ? mapDataToProps(priceHistory, props)
        : priceHistory

      useEffect(
        () => {
          getPriceHistory()
        },
        [getPriceHistory],
      )

      return (
        <WrappedComponent
          getPriceHistory={getPriceHistory}
          {...props}
          {...data}
        />
      )
    }
  }
}

export default withPriceHistoryData
