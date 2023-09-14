// @flow
import React, { useEffect, type ComponentType } from 'react'
import { useStore } from 'zustand'

import usePricesStore from '../actions-migrated/prices'
import { getSettings } from '../context/settings/SettingsContext'

function withPricesData(mapDataToProps?: Function): Function {
  return function WithPricesData(WrappedComponent: ComponentType<any>) {
    return function WithPricesDataWrapper(props: any) {
      const { prices, getPrices, getPricesFromFlamingo } = useStore(
        usePricesStore,
      )
      const data = mapDataToProps ? mapDataToProps(prices, props) : prices
      useEffect(() => {
        async function handleFetchPrices() {
          const { chain } = await getSettings()
          if (chain === 'neo3') return getPricesFromFlamingo()
          return getPrices()
        }
        handleFetchPrices()
      }, [])
      return <WrappedComponent {...props} {...data} />
    }
  }
}

export default withPricesData
