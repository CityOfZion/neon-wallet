// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import App from '../../containers/App'
import Home from '../../containers/Home'
import LoginPrivateKey from '../../containers/LoginPrivateKey'
import LoginLedgerNanoS from '../../containers/LoginLedgerNanoS'
import CreateWallet from '../../containers/CreateWallet'
import Dashboard from '../../containers/Dashboard'
import Receive from '../../containers/Receive'
import Contacts from '../../containers/Contacts'
import AddContact from '../../containers/AddContact'
import EditContact from '../../containers/EditContact'
import LoginLocalStorage from '../../containers/LoginLocalStorage'
import LoginNep2 from '../../containers/LoginNep2'
import Settings from '../../containers/Settings'
import DisplayWalletAccounts from '../../containers/DisplayWalletAccounts'
import TransactionHistory from '../../containers/TransactionHistory'
import { ROUTES } from '../../core/constants'

const CreateWalletEncrypted = (props) => <CreateWallet {...props} encryptWIF />

export default () => (
  <App>
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route exact path={ROUTES.CREATE_WALLET} component={CreateWallet} />
      <Route exact path={ROUTES.ENCRYPT_KEY} component={CreateWalletEncrypted} />
      <Route exact path={ROUTES.LOGIN_PRIVATE_KEY} component={LoginPrivateKey} />
      <Route exact path={ROUTES.LOGIN_LOCAL_STORAGE} component={LoginLocalStorage} />
      <Route exact path={ROUTES.LOGIN_NEP2} component={LoginNep2} />
      <Route exact path={ROUTES.LOGIN_LEDGER_NANO_S} component={LoginLedgerNanoS} />
      <Route exact path={ROUTES.DISPLAY_WALLET_KEYS} component={DisplayWalletAccounts} />
      <Route exact path={ROUTES.SETTINGS} component={Settings} />
      <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <PrivateRoute exact path={ROUTES.RECEIVE} component={Receive} />
      <PrivateRoute exact path={ROUTES.CONTACTS} component={Contacts} />
      <PrivateRoute exact path={ROUTES.ADD_CONTACT} component={AddContact} />
      <PrivateRoute exact path={ROUTES.EDIT_CONTACT} component={EditContact} />
      <PrivateRoute exact path={ROUTES.TRANSACTION_HISTORY} component={TransactionHistory} />
      <Redirect to={ROUTES.DASHBOARD} />
    </Switch>
  </App>
)
