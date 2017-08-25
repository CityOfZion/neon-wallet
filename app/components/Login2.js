import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { login } from '../modules/account';
import CreateWallet from './CreateWallet.js'
import { encrypt_wif, decrypt_wif } from '../util/Passphrase.js';

const logo = require('../images/neon-logo2.png');

let wif_input;
let passphrase_input;

const onWifChange = (dispatch, history) => {
  console.log(wif_input, passphrase_input);
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  console.log("decrypting...");
  decrypt_wif(wif_input.value, passphrase_input.value).then((wif) => {
    dispatch(login(wif));
    history.push('/dashboard');
  });
};

class Login2 extends Component {

  render = () => {
    const dispatch = this.props.dispatch;
    const loggedIn = this.props.loggedIn;
    return (<div id="loginPage">
      <div className="login">
        <div className="logo"><img src={logo} width="60px"/></div>
        <input type="text" placeholder="Enter your passphrase here" ref={(node) => passphrase_input = node}  />
        <input type="text" placeholder="Enter your encrypted key here" ref={(node) => wif_input = node}  />
        <div className="loginButtons">
          <button onClick={(e) => onWifChange(dispatch, this.props.history)}>Login</button>
          <Link to="/create"><button>New Wallet</button></Link>
        </div>
        <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
      </div>
    </div>);
  }

}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif
});

Login2 = connect(mapStateToProps)(Login2);

export default Login2;
