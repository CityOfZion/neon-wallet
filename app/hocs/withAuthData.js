// @flow
import React, { type ComponentType } from 'react'
import { useStore } from 'zustand'
import { useAuthStore, AUTH_LOGIN_TYPES } from '../actions-migrated/auth'
import { useBalancesStore } from '../actions-migrated/balances'

function withAuthData(
  WrappedComponent: ComponentType<any>,
): ComponentType<any> {
  return function WithAuthData(props: any) {
    const { account, login, n3Login, logout } = useStore(useAuthStore)
    const { resetBalances } = useStore(useBalancesStore)

    function handleLogout() {
      resetBalances()
      logout()
    }

    return (
      <WrappedComponent
        {...props}
        {...account}
        loginNep2={data => {
          login(data, AUTH_LOGIN_TYPES.NEP2)
        }}
        loginLedger={data => login(data, AUTH_LOGIN_TYPES.LEDGER)}
        logout={handleLogout}
        loginWithPrivateKey={data => login(data, AUTH_LOGIN_TYPES.WIF)}
        loginWithN3PrivateKey={data => n3Login(data, AUTH_LOGIN_TYPES.WIF)}
        watchOnlyLogin={data => login(data, AUTH_LOGIN_TYPES.WATCH)}
      />
    )
  }
}

export default withAuthData
