// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import App from '../../containers/App'
import Home from '../../containers/Home'
import CreateWallet from '../../containers/CreateWallet'
import Dashboard from '../../containers/Dashboard'
import Receive from '../../containers/Receive'
import Contacts from '../../containers/Contacts'
import AddContact from '../../containers/AddContact'
import EditContact from '../../containers/EditContact'
import Settings from '../../containers/Settings'
import TransactionHistory from '../../containers/TransactionHistory'
import WalletManager from '../../containers/WalletManager'
import EditWallet from '../../containers/EditWallet'
import DisplayWalletAccounts from '../../containers/DisplayWalletAccounts'
import Send from '../../containers/Send'
import TokenSale from '../../containers/TokenSale'
import Encrypt from '../../containers/Encrypt'
import NodeSelect from '../../containers/NodeSelect'
import { ROUTES } from '../../core/constants'

export default () => (
  <App>
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route
        exact
        path={ROUTES.CREATE_WALLET}
        render={props => <CreateWallet option="CREATE" {...props} />}
      />
      <Route
        exact
        path={ROUTES.CREATE_WALLET_AUTHENTICATED}
        render={props => (
          <CreateWallet option="CREATE" authenticated {...props} />
        )}
      />
      <Route
        exact
        path={ROUTES.IMPORT_WALLET}
        render={props => <CreateWallet option="IMPORT" {...props} />}
      />
      <Route
        exact
        path={ROUTES.IMPORT_WALLET_AUTHENTICATED}
        render={props => (
          <CreateWallet option="IMPORT" authenticated {...props} />
        )}
      />
      <Route
        exact
        path={ROUTES.DISPLAY_WALLET_KEYS}
        component={DisplayWalletAccounts}
      />
      <Route
        exact
        path={ROUTES.DISPLAY_WALLET_KEYS_AUTHENTICATED}
        render={props => <DisplayWalletAccounts {...props} authenticated />}
      />
      <Route exact path={ROUTES.SETTINGS} component={Settings} />
      <PrivateRoute
        exact
        path={ROUTES.WALLET_MANAGER}
        component={WalletManager}
      />
      <PrivateRoute exact path={ROUTES.EDIT_WALLET} component={EditWallet} />
      <PrivateRoute exact path={ROUTES.DASHBOARD} component={Dashboard} />
      <PrivateRoute exact path={ROUTES.RECEIVE} component={Receive} />
      <PrivateRoute exact path={ROUTES.CONTACTS} component={Contacts} />
      <PrivateRoute exact path={ROUTES.ADD_CONTACT} component={AddContact} />
      <PrivateRoute exact path={ROUTES.EDIT_CONTACT} component={EditContact} />
      <PrivateRoute exact path={ROUTES.SEND} component={Send} />
      <PrivateRoute exact path={ROUTES.TOKEN_SALE} component={TokenSale} />
      <PrivateRoute exact path={ROUTES.SEND_ADDRESS} component={Send} />
      <PrivateRoute exact path={ROUTES.ENCRYPT} component={Encrypt} />
      <PrivateRoute exact path={ROUTES.NODE_SELECT} component={NodeSelect} />
      <PrivateRoute
        exact
        path={ROUTES.TRANSACTION_HISTORY}
        component={TransactionHistory}
      />
      <Redirect to={ROUTES.DASHBOARD} />
    </Switch>
  </App>
)
