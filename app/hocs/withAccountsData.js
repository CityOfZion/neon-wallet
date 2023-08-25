// @flow
import React from 'react'

// import { useSettingsContext } from '../context/settings/SettingsContext'

import { useAccountsStore } from '../actions-migrated/accounts'
import { useN3AccountsStore } from '../actions-migrated/n3Accounts'

// NOTE: this is a drop in replacement HOC to replace
// many of the HOCs that provide settings data to components.
function withAccountsData(WrappedComponent: React$ComponentType<any>) {
  return function EnhancedComponent(props: any) {
    const { accounts } = useAccountsStore()
    const { accounts: n3Accounts } = useN3AccountsStore()

    console.log({ accounts, n3Accounts })

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
