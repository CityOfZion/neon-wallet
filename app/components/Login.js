import React from 'react';
import { connect } from 'react-redux';
import { login, setBalance } from '../actions/index.js';
import { Link } from 'react-router';
import CreateWallet from './CreateWallet.js'

let input_wif;

const onWifChange = (dispatch) => {
  // lookup wif address to check whether it is valid and enable login
  dispatch(login(input_wif.value));
};

let Login = ({ dispatch, loggedIn, wif }) =>
  <div id="loginPage">
    <div className="login">
      <div className="title">Login:</div>
      <input type="text" placeholder="Enter your private key here (WIF)" onChange={() => onWifChange(dispatch)} ref={node => {input_wif = node;}} />
      <div className="margin10">{loggedIn ? <button><Link to="/send">Login</Link></button> : <button disabled="true">Login</button>}</div>
      <div className="margin10"><button><Link to="/create">New Wallet</Link></button></div>
    </div>
  </div>;

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
});

Login = connect(mapStateToProps)(Login);

export default Login;
