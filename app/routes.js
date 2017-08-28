import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import LoginNep2 from './components/LoginNep2';
import LoginPrivateKey from './components/LoginPrivateKey';
import LoginLocalStorage from './components/LoginLocalStorage';
import CreateWallet from './components/CreateWallet';
import Send from './components/Send';
import Dashboard from './containers/Dashboard';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={LoginNep2} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/create" component={CreateWallet} />
		<Route path="/loginPrivateKey" component={LoginPrivateKey} />
		<Route path="/loginLocalStorage" component={LoginLocalStorage} />
	</Route>
);
