import React from 'react'
import { ROUTES } from './core/constants'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import LoginPrivateKey from './containers/LoginPrivateKey'
import TokenSale from './containers/TokenSale'
import CreateWallet from './containers/CreateWallet'
import Dashboard from './containers/Dashboard'
import LoginLocalStorage from './containers/LoginLocalStorage'
import LoginTokenSale from './containers/LoginTokenSale'
import LoginNep2 from './containers/LoginNep2'
import EncryptKey from './containers/EncryptKey'
import Settings from './containers/Settings'
import Home from './components/Home'

export default (
  <Route path={ROUTES.HOME} component={App}>
    <IndexRoute component={Home} />
    <Route path={ROUTES.DASHBOARD} component={Dashboard} />
    <Route path={ROUTES.CREATE_WALLET} component={CreateWallet} />
    <Route path={ROUTES.ENCRYPT_KEY} component={EncryptKey} />
    <Route path={ROUTES.LOGIN_PRIVATE_KEY} component={LoginPrivateKey} />
    <Route path={ROUTES.LOGIN_LOCAL_STORAGE} component={LoginLocalStorage} />
    <Route path={ROUTES.LOGIN_NEP2} component={LoginNep2} />
    <Route path={ROUTES.LOGIN_TOKEN_SALE} component={LoginTokenSale} />
    <Route path={ROUTES.TOKEN_SALE} component={TokenSale} />
    <Route path={ROUTES.SETTINGS} component={Settings} />
  </Route>
)
