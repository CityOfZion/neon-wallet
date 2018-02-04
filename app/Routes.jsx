// @flow
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './containers/App'
import RedirectHome from './RedirectHome'
import LoginPrivateKey from './containers/LoginPrivateKey'
import LoginLedgerNanoS from './containers/LoginLedgerNanoS'
import CreateWallet from './containers/CreateWallet'
import Dashboard from './containers/Dashboard'
import LoginLocalStorage from './containers/LoginLocalStorage'
import LoginNep2 from './containers/LoginNep2'
import Settings from './containers/Settings'
import DisplayWalletAccounts from './containers/DisplayWalletAccounts'
import Home from './containers/Home'
import { ROUTES } from './core/constants'

export default () => (
  <App>
    <RedirectHome />
    <Switch>
      <Route exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route
        exact
        path={ROUTES.CREATE_WALLET}
        render={props => <CreateWallet {...props} encryptWIF={false} />}
      />
      <Route
        exact
        path={ROUTES.ENCRYPT_KEY}
        render={props => <CreateWallet {...props} encryptWIF />}
      />
      <Route exact path={ROUTES.LOGIN_PRIVATE_KEY} component={LoginPrivateKey} />
      <Route exact path={ROUTES.LOGIN_LOCAL_STORAGE} component={LoginLocalStorage} />
      <Route exact path={ROUTES.LOGIN_NEP2} component={LoginNep2} />
      <Route exact path={ROUTES.LOGIN_LEDGER_NANO_S} component={LoginLedgerNanoS} />
      <Route exact path={ROUTES.SETTINGS} component={Settings} />
      <Route exact path={ROUTES.DISPLAY_WALLET_KEYS} component={DisplayWalletAccounts} />
      <Route exact path={ROUTES.HOME} component={Home} />
    </Switch>
  </App>
)
