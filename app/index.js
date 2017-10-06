import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';
import './styles/main.scss';

function getQueryParams(qs) {
    const qs_ = qs.split('+').join(' ');

    let params = {};
    let tokens;
    const re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs_)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

const query = getQueryParams(document.location.search);

const store = configureStore();

render(
    <AppContainer>
      <Root store={store} history={hashHistory} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NewRoot = require('./containers/Root').default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}

export default store.dispatch;
