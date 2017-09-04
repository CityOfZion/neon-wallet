import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { login } from '../modules/account';
import { getWIFFromPrivateKey } from 'neon-js';
import { encrypt_wif, decrypt_wif } from 'neon-js';
import { sendEvent, clearTransactionEvent } from '../modules/transactions';
import { getAccountsFromWIFKey } from 'neon-js';

let wif;

const logo = require('../images/neon-logo2.png');

// TODO: move to neon-js
const verifyPrivateKey = (wif) => {
  try {
    // TODO: better check
    getAccountsFromWIFKey(wif)[0].address;
  }
  catch (e){
    return false;
  }
  return true;
};

const onWifChange = (dispatch, history, wif) => {
  const value = wif.value;
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  if (verifyPrivateKey(value) === true){
    dispatch(login(value));
    history.push('/dashboard');
  }
  else {
    dispatch(sendEvent(false, "That is not a valid private key"));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
  }
};

let LoginPrivateKey = ({ dispatch, loggedIn, wif, history }) =>
  <div id="loginPage">
    <div className="login">
      <div className="loginForm">
        <div className="logo"><img src={logo} width="60px"/></div>
        <input type="text" placeholder="Enter your private key here (WIF)" ref={(node) => wif = node}/>
      </div>
      <div className="loginButtons">
        <button onClick={(e) => onWifChange(dispatch, history, wif)}>Login</button>
        <Link to="/"><button className="altButton">Home</button></Link>
      </div>
      <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
    </div>
  </div>;

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
});

LoginPrivateKey = connect(mapStateToProps)(LoginPrivateKey);

export default LoginPrivateKey;
