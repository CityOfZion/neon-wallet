import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setBalance} from '../actions/index.js';
import {getBalance} from 'neon-js';

let currencyFormatter = require('currency-formatter');

// TODO will be removed if getMarketPrice is imported from neon-js
var _axios2 = require('axios');

// TODO move to neon-js and remove this method
var getMarketPrice = exports.getMarketPrice = function getMarketPrice(amount, currencyCode) {
    return _axios2.default.get(`https://api.coinmarketcap.com/v1/ticker/NEO/?convert=${currencyCode}`).then(function (response) {
        var fieldName = 'price_' + currencyCode.toLowerCase();

        if (response.data[0].hasOwnProperty(fieldName)) {
            var lastPrice = Number(response.data[0][fieldName]);
            return (lastPrice * amount);
        }

        throw new Error(`There is no field ${fieldName} in response json from coinmarketcap.`);

    }).catch( () => {
        throw new Error(`CurrencyCode ${currencyCode} is not supported by coinmarketcap api.`);
    })
};

const formatCurrency = (price, currencyCode) => {
    return currencyFormatter.format(price, { code: currencyCode });
};

const loadMarketPrice = (dispatch, net, address, currencyCode) => {

    return getBalance(net, address).then((resultBalance) => {

        return getMarketPrice(resultBalance, currencyCode).then((resultPrice) => {

            if (resultPrice === undefined || resultPrice === null) {
                dispatch(setBalance(resultBalance.Neo, resultBalance.Gas, '--', currencyCode));
            } else {
                let formattedPrice = formatCurrency(resultPrice, currencyCode);
                dispatch(setBalance(resultBalance.Neo, resultBalance.Gas, formattedPrice, currencyCode));
            }

        }).catch( () => {
            dispatch(setBalance(resultBalance.Neo, resultBalance.Gas, '--', currencyCode));
        })
    });
};

const switchCurrency = (dispatch, net, address, currentCurrencyCode) => {

    let current = currentCurrencyCode;
    current === 'USD' ? current = 'EUR' : current = 'USD';

    return loadMarketPrice(dispatch, net, address, current);
};

class Balance extends Component {

    componentDidMount = () => {
        loadMarketPrice(this.props.dispatch, this.props.net, this.props.address, this.props.currencyCode)
    };

    render = () => {
        return (
            <div className="fiat" onClick={() => switchCurrency(this.props.dispatch, this.props.net, this.props.address, this.props.currencyCode)}>
                {this.props.price}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    neo: state.wallet.Neo,
    gas: state.wallet.Gas,
    price: state.wallet.price,
    currencyCode: state.wallet.currencyCode
});

Balance = connect(mapStateToProps)(Balance);

export { Balance, loadMarketPrice };