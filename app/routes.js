import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Login2 from './components/Login2';
import CreateWallet2 from './components/CreateWallet2';
import Send from './components/Send';
import Dashboard from './containers/Dashboard';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Login2} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/create" component={CreateWallet2} />
		<Route path="/send" component={Send} />
	</Route>
);
