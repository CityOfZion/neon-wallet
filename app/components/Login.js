import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { login, showKey } from '../modules/account';
import CreateWallet from './CreateWallet.js'
import { getWIFFromPrivateKey } from 'neon-js';
import FaEye from 'react-icons/lib/fa/eye';
import FaEyeSlash from 'react-icons/lib/fa/eye-slash';

const logo = require('../images/neon-logo2.png');

const onWifChange = (dispatch, value) => {
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  dispatch(login(value));
};

const onShowKeyClick = (dispatch, value) => {
  dispatch(showKey(value));
}

let Login = ({ dispatch, loggedIn, wif, showKey }) =>
  <div id="loginPage">
    <div className="login">
      <div className="logo"><img src={logo} width="60px"/></div>
      <input type={showKey ? 'text' : 'password'} placeholder="Enter your private key here (WIF)" id="inputKey" onChange={(e) => onWifChange(dispatch, e.target.value)} />

      { showKey ? <FaEyeSlash className="viewKey" onClick={(e) => onShowKeyClick(dispatch, false)} /> : <FaEye className="viewKey" onClick={(e) => onShowKeyClick(dispatch, true)} /> }
      <div className="loginButtons">
        {loggedIn ? <Link to="/dashboard"><button>Login</button></Link> : <button disabled="true">Login</button>}
        <Link to="/create"><button>New Wallet</button></Link>
      </div>
      <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
    </div>
  </div>;

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif,
  showKey: state.account.showKey
});

Login = connect(mapStateToProps)(Login);

export default Login;
