import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { login, decrypting, setKeys } from '../modules/account';
import CreateWallet from './CreateWallet.js'
import { encrypt_wif, decrypt_wif } from 'neon-js';
import storage from 'electron-json-storage';
import _ from 'lodash';
// TODO: these event messages should be refactored from transactions
import { sendEvent, clearTransactionEvent } from '../modules/transactions';

const logo = require('../images/neon-logo2.png');

let wif_input;
let passphrase_input;

const onWifChange = (dispatch, history) => {
  if (passphrase_input.value.length < 4){
    dispatch(sendEvent(false, "Passphrase too short"));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    return;
  }
  dispatch(sendEvent(true, "Decrypting encoded key..."));
  setTimeout(() => {
    decrypt_wif(wif_input.value, passphrase_input.value).then((wif) => {
      dispatch(login(wif));
      history.push('/dashboard');
      dispatch(clearTransactionEvent());
    }).catch(() => {
      dispatch(sendEvent(false, "Wrong passphrase"));
      setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    });
  }, 500);
};

class LoginLocalStorage extends Component {

  componentDidMount = () => {
    storage.get('keys', (error, data) => {
      this.props.dispatch(setKeys(data));
    });
  }

  render = () => {
    const dispatch = this.props.dispatch;
    const loggedIn = this.props.loggedIn;
    return (<div id="loginPage">
      <div className="login">
        <div className="logo"><img src={logo} width="60px"/></div>
        <div className="loginForm">
          <input type="password" placeholder="Enter your passphrase here" ref={(node) => passphrase_input = node}  />
          <div className="selectBox">
            <label>Wallet:</label>
            <select ref={(node) => wif_input = node}>
              <option selected="selected" disabled="disabled">Select a wallet</option>
              {_.map(this.props.accountKeys, (value, key) => <option value={value}>{key}</option>)}
            </select>
          </div>
        </div>
        <div className="loginButtons">
          { Object.keys(this.props.accountKeys).length === 0 ? <button className="disabled" disabled="disabled">Login</button> : <button onClick={(e) => onWifChange(dispatch, this.props.history)}>Login</button> }
          <Link to="/"><button className="altButton">Home</button></Link>
        </div>
        {this.props.decrypting === true ? <div className="decrypting">Decrypting keys...</div> : <div></div>}
        <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif,
  decrypting: state.account.decrypting,
  accountKeys: state.account.accountKeys
});

LoginLocalStorage = connect(mapStateToProps)(LoginLocalStorage);

export default LoginLocalStorage;
