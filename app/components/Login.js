import React from 'react';
import { connect } from 'react-redux';
import { login, setBalance } from '../actions/index.js';
import { getBalanceWIF } from '../wallet/api.js';
import { Link } from 'react-router';

let input_wif;

const onWifChange = (dispatch) => {
  // lookup wif address to check whether it is valid and enable login
  dispatch(login(input_wif.value));
};

const initiateGetBalance = (dispatch) => {
  getBalanceWIF(input_wif.value).then(function(result){
    console.log(result);
    dispatch(setBalance(result.ANS, result.ANC));
  })
};

let Login = ({ dispatch, loggedIn, wif }) =>
  <div id="loginPage">
    <input type="text" placeholder="Enter your private key here" onChange={() => onWifChange(dispatch)} ref={node => {input_wif = node;}} />
    <div>{loggedIn ? <button><Link onClick={() => initiateGetBalance(dispatch)} to="/balance">Login</Link></button> : <button disabled="true">Login</button>}</div>
  </div>;

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
});

Login = connect(mapStateToProps)(Login);

export default Login;
