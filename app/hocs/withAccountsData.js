// @flow
import React from 'react'

import { useAccountsStore } from '../actions-migrated/accounts'
import { useN3AccountsStore } from '../actions-migrated/n3Accounts'

function withAccountsData(WrappedComponent: React$ComponentType<any>) {
  return function EnhancedComponent(props: any) {
    const { accounts, updateAccountsActions } = useAccountsStore()
    const {
      accounts: n3Accounts,
      updateAccountsActions: updateN3AccountsActions,
    } = useN3AccountsStore()

    return (
      <WrappedComponent
        {...props}
        accounts={accounts}
        n3Accounts={n3Accounts}
        updateAccountsActions={updateAccountsActions}
        updateN3AccountsActions={updateN3AccountsActions}
      />
    )
  }
}

export default withAccountsData
