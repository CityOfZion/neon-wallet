// @flow
import React from 'react'

// import { useSettingsContext } from '../context/settings/SettingsContext'

import { useAccountsStore } from '../actions-migrated/accounts'

// NOTE: this is a drop in replacement HOC to replace
// many of the HOCs that provide settings data to components.
function withAccountsData(WrappedComponent: React$ComponentType<any>) {
  return function EnhancedComponent(props: any) {
    const { accounts } = useAccountsStore()

    console.log({ accounts })

    return (
      <WrappedComponent
        {...props}
        accounts={accounts}
        // setSetting={(setting: { [key: string]: any }) => setSetting(setting)}
      />
    )
  }
}

export default withAccountsData
