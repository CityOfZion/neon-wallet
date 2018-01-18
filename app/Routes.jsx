import React from 'react'
import { ROUTES } from './core/constants'
import { Switch, Route } from 'react-router-dom'
import App from './containers/App'
import LoginPrivateKey from './containers/LoginPrivateKey'
import LoginLedgerNanoS from './containers/LoginLedgerNanoS'
import CreateWallet from './containers/CreateWallet'
import Dashboard from './containers/Dashboard'
import LoginLocalStorage from './containers/LoginLocalStorage'
import LoginNep2 from './containers/LoginNep2'
import Settings from './containers/Settings'
import DisplayWalletAccounts from './containers/DisplayWalletAccounts'
import Home from './containers/Home'

export default () => (
  <App>
    <Switch>
      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route
        path={ROUTES.CREATE_WALLET}
        render={props => <CreateWallet {...props} encryptWIF={false} />}
      />
      <Route
        path={ROUTES.ENCRYPT_KEY}
        render={props => <CreateWallet {...props} encryptWIF />}
      />
      <Route path={ROUTES.LOGIN_PRIVATE_KEY} component={LoginPrivateKey} />
      <Route path={ROUTES.LOGIN_LOCAL_STORAGE} component={LoginLocalStorage} />
      <Route path={ROUTES.LOGIN_NEP2} component={LoginNep2} />
      <Route path={ROUTES.LOGIN_LEDGER_NANO_S} component={LoginLedgerNanoS} />
      <Route path={ROUTES.SETTINGS} component={Settings} />
      <Route
        path={ROUTES.DISPLAY_WALLET_KEYS}
        component={DisplayWalletAccounts}
      />
      <Route path={ROUTES.HOME} component={Home} />
    </Switch>
  </App>
)
