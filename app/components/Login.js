import React from 'react';
import { connect } from 'react-redux';
import { login, setBalance, resetPrice } from '../actions/index.js';
import { Link } from 'react-router';
import CreateWallet from './CreateWallet.js'
import { getWIFFromPrivateKey } from '../wallet/index.js';

const logo = require('../images/neon-logo2.png');

let input_wif;

const onWifChange = (dispatch) => {
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  dispatch(login(input_wif.value));
};

let Login = ({ dispatch, loggedIn, wif }) =>
  <div id="loginPage">
    <div className="login">
      <div className="logo"><img src={logo} width="60px"/></div>
      <input type="text" placeholder="Enter your private key here (WIF)" onChange={() => onWifChange(dispatch)} ref={node => {input_wif = node;}} />
      <div className="loginButtons">
        {loggedIn ? <Link to="/dashboard"><button>Login</button></Link> : <button disabled="true">Login</button>}
        <Link to="/create"><button>New Wallet</button></Link>
      </div>
      <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
    </div>
  </div>;

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
});

Login = connect(mapStateToProps)(Login);

export default Login;
