import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import BlockchainExplorerSetting from './components/BlockchainExplorerSetting';
import Login from './components/Login';
import CreateWallet from './components/CreateWallet';
import Send from './components/Send';
import Settings from './components/Settings';
import Dashboard from './containers/Dashboard';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Login} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/create" component={CreateWallet} />
		<Route path="/send" component={Send} />
		<Route path="/settings/explorer" component={BlockchainExplorerSetting} />
		<Route path="/settings" component={Settings} />
	</Route>
);
