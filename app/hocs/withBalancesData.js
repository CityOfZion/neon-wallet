// @flow
import React, { type ComponentType } from 'react'
import { useStore } from 'zustand'

import { useBalancesStore } from '../actions-migrated/balances'

function withBalancesData(mapDataToProps?: Function): Function {
  return function WithBalancesData(WrappedComponent: ComponentType<any>) {
    return function WithBalancesDataWrapper(props: any) {
      const { balances, loading } = useStore(useBalancesStore)
      const data = mapDataToProps ? mapDataToProps(balances) : balances
      return <WrappedComponent {...props} {...data} />
    }
  }
}

export default withBalancesData
