// @flow
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import App from '../../containers/App'
import Home from '../../containers/Home'
import CreateWallet from '../../containers/CreateImportWallet/CreateWallet'
import ImportWallet from '../../containers/CreateImportWallet/ImportWallet'
import Dashboard from '../../containers/Dashboard'
import Receive from '../../containers/Receive'
import Contacts from '../../containers/Contacts'
import AddContact from '../../containers/AddContact'
import Settings from '../../containers/Settings'
import TransactionHistory from '../../containers/TransactionHistory'
import WalletManager from '../../containers/WalletManager'
import EditWallet from '../../containers/EditWallet'
import DisplayWalletAccounts from '../../containers/DisplayWalletAccounts'
import DisplayWalletAccountsQrCodes from '../../containers/DisplayWalletAccounts/DisplayWalletAccountsQrCodes/index'
import Send from '../../containers/Send'
import Encrypt from '../../containers/Encrypt'
import NodeSelect from '../../containers/NodeSelect'
import News from '../../containers/News'
import NftGallery from '../../containers/NftGallery'
import EncryptQR from '../Settings/EncryptQR'
import { ROUTES } from '../../core/constants'
import OfflineSigningPrompt from '../../containers/OfflineSigningPrompt'
import Mobile from '../../containers/Mobile'
import Migration from '../../containers/Migration'
import ConnectDapp from '../../containers/ConnectDapp'
import DappRequest from '../../containers/DappRequest'
import MigrateWalletsNeon3 from '../../containers/MigrateWalletsNeon3'
import MigrateWalletsNeon3Steps from '../../containers/MigrateWalletsNeon3Steps'

export default ({ store }: { store: any }) => (
  <App store={store}>
    <Switch>
      <Route exact path={ROUTES.HOME} component={Home} />
      <Route
        exact
        path={ROUTES.CREATE_WALLET}
        render={props => <CreateWallet {...props} />}
      />
      <Route
        exact
        path={ROUTES.CREATE_WALLET_AUTHENTICATED}
        render={props => <CreateWallet authenticated {...props} />}
      />
      <Route
        exact
        path={ROUTES.IMPORT_WALLET}
        render={props => <ImportWallet {...props} />}
      />
      <Route
        exact
        path={ROUTES.MIGRATE_WALLETS_NEON3}
        render={props => <MigrateWalletsNeon3 {...props} />}
      />
      <Route
        exact
        path={ROUTES.MIGRATE_WALLETS_NEON3_STEPS}
        render={props => <MigrateWalletsNeon3Steps {...props} />}
      />
      <Route
        exact
        path={ROUTES.IMPORT_WALLET_AUTHENTICATED}
        render={props => <ImportWallet authenticated {...props} />}
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
      <Route
        exact
        path={ROUTES.DISPLAY_WALLET_QRS_AUTHENTICATED}
        render={props => (
          <DisplayWalletAccountsQrCodes {...props} authenticated />
        )}
      />
      <Route
        exact
        path={ROUTES.DISPLAY_WALLET_QRS}
        render={props => <DisplayWalletAccountsQrCodes {...props} />}
      />
      <Route
        exact
        path={ROUTES.DISPLAY_ENCRYPTED_WIF_QR}
        render={props => <EncryptQR {...props} />}
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
      <PrivateRoute exact path={ROUTES.EDIT_CONTACT} component={AddContact} />
      <PrivateRoute exact path={ROUTES.SEND} component={Send} />
      <PrivateRoute exact path={ROUTES.SEND_ADDRESS} component={Send} />
      <PrivateRoute exact path={ROUTES.ENCRYPT} component={Encrypt} />
      <PrivateRoute exact path={ROUTES.NODE_SELECT} component={NodeSelect} />
      <PrivateRoute
        exact
        path={ROUTES.TRANSACTION_HISTORY}
        component={TransactionHistory}
      />
      <PrivateRoute exact path={ROUTES.NEWS} component={News} />
      <PrivateRoute exact path={ROUTES.NFT} component={NftGallery} />
      <PrivateRoute
        exact
        path={ROUTES.OFFLINE_SIGNING_PROMPT}
        component={OfflineSigningPrompt}
      />
      <PrivateRoute exact path={ROUTES.MOBILE} component={Mobile} />
      <PrivateRoute exact path={ROUTES.MIGRATION} component={Migration} />
      <PrivateRoute exact path={ROUTES.CONNECT_DAPP} component={ConnectDapp} />
      <PrivateRoute exact path={ROUTES.DAPP_REQUEST} component={DappRequest} />
      <Redirect to={ROUTES.DASHBOARD} />
    </Switch>
  </App>
)
