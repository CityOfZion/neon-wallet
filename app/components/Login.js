import React from 'react';
import { connect } from 'react-redux';
import { login, setBalance, resetPrice } from '../actions/index.js';
import { Link } from 'react-router';
import CreateWallet from './CreateWallet.js'
import { getBlockByIndex } from '../wallet/api.js';
import { getWIFFromHexPrivateKey } from '../wallet/index.js';

let input_wif;

const onWifChange = (dispatch) => {
  // lookup wif address to check whether it is valid and enable login
  if (input_wif.value.length > 51) {
    dispatch(login(getWIFFromHexPrivateKey(input_wif.value)));  
  } else {
    dispatch(login(input_wif.value));  
  }
};

let Login = ({ dispatch, loggedIn, wif }) =>
  <div id="loginPage">
    <div className="login">
      <input type="text" placeholder="Enter your private key here (WIF or Hex)" onChange={() => onWifChange(dispatch)} ref={node => {input_wif = node;}} />
      <div className="loginButtons">
        {loggedIn ? <button><Link to="/dashboard">Login</Link></button> : <button disabled="true">Login</button>}
        <button><Link to="/create">New Wallet</Link></button>
      </div>
    </div>
  </div>;

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
});

Login = connect(mapStateToProps)(Login);

export default Login;
