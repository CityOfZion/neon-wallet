import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import LoginNep2 from './components/LoginNep2'
import LoginPrivateKey from './components/LoginPrivateKey'
import LoginLedgerNanoS from './components/LoginLedgerNanoS'
import Home from './components/Home'
import Settings from './components/Settings'
import LoginLocalStorage from './components/LoginLocalStorage'
import LoginTokenSale from './components/LoginTokenSale'
import TokenSale from './components/TokenSale'
import CreateWallet from './components/CreateWallet'
import EncryptKey from './components/EncryptKey'
import Dashboard from './containers/Dashboard'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/create' component={CreateWallet} />
    <Route path='/encryptKey' component={EncryptKey} />
    <Route path='/loginPrivateKey' component={LoginPrivateKey} />
    <Route path='/loginLocalStorage' component={LoginLocalStorage} />
    <Route path='/LoginEncrypted' component={LoginNep2} />
    <Route path='/LoginTokenSale' component={LoginTokenSale} />
    <Route path='/TokenSale' component={TokenSale} />
    <Route path='/settings' component={Settings} />
    <Route path='/loginLedgerNanoS' component={LoginLedgerNanoS} />
  </Route>
)
