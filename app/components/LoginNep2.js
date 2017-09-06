import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { login, decrypting } from '../modules/account';
import CreateWallet from './CreateWallet.js'
import { encrypt_wif, decrypt_wif } from 'neon-js';
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
  console.log(wif_input, passphrase_input);
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  dispatch(sendEvent(true, "Decrypting encoded key..."));
  setTimeout(() => {
    const encWifValue = wif_input.value;
    decrypt_wif(encWifValue, passphrase_input.value).then((wif) => {
      dispatch(login(wif));
      history.push('/dashboard');
      dispatch(clearTransactionEvent());
    }).catch(() => {
      dispatch(sendEvent(false, "Wrong passphrase or invalid encrypted key"));
      setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    });
  }, 500);
};

class LoginNep2 extends Component {

  render = () => {
    const dispatch = this.props.dispatch;
    const loggedIn = this.props.loggedIn;
    return (<div id="loginPage">
      <div className="login">
        <div className="logo"><img src={logo} width="60px"/></div>
        <div className="loginForm">
          <input type="password" placeholder="Enter your passphrase here" ref={(node) => passphrase_input = node}  />
          <input type="text" placeholder="Enter your encrypted key here" ref={(node) => wif_input = node}  />
        </div>
        <div className="loginButtons">
          <button onClick={(e) => onWifChange(dispatch, this.props.history)}>Login</button>
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
  decrypting: state.account.decrypting
});

LoginNep2 = connect(mapStateToProps)(LoginNep2);

export default LoginNep2;
