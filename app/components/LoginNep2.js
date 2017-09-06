import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { login, decrypting } from '../modules/account';
import CreateWallet from './CreateWallet.js'
import { decrypt_wif } from 'neon-js';
// TODO: these event messages should be refactored from transactions
import { sendEvent, clearTransactionEvent } from '../modules/transactions';
import selectWallet from '../modules/selectWallet';
import readAndDecrypt from '../modules/decryptJSONWallet';


const logo = require('../images/neon-logo2.png');

let wif_input;
let passphrase_input;
let selected_paths;

const onWifChange = (dispatch, history) => {
  if (passphrase_input.value.length < 4){
    dispatch(sendEvent(false, "Passphrase too short"));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    return;
  }
  // console.log(wif_input, passphrase_input);
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  dispatch(sendEvent(true, "Decrypting encoded key..."));
  setTimeout(() => {
    const encWifValue = wif_input.value;

    const loadedKey = readAndDecrypt(selected_paths[0], passphrase_input.value);
    const readKey = decrypt_wif(encWifValue, passphrase_input.value);

    const wiffer = wif_input.value ? readKey : loadedKey;

    wiffer.then((wif) => {
      dispatch(login(wif));
      history.push('/dashboard');
      dispatch(clearTransactionEvent());
    }).catch(() => {
      dispatch(sendEvent(false, "Wrong passphrase or invalid encrypted key"));
      setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    });
  }, 500);
};

const select = () => {
  selectWallet().then((paths) => {
    selected_paths = paths;
  })
};

class LoginNep2 extends Component {

  render = () => {
    const dispatch = this.props.dispatch;
    return (<div id="loginPage">
      <div className="login">
        <div className="logo"><img src={logo} width="60px"/></div>
        <div className="loginForm">
          <input type="password" placeholder="Enter your passphrase here" ref={(node) => passphrase_input = node}  />
          <div className="halfField">
            <input type="text" placeholder="Enter your encrypted key here" ref={(node) => wif_input = node}  />
            OR
            <input type="button" value="Select wallet" onClick={select}  />
          </div>
        </div>
        <div className="loginButtons">
          <button className="loginButton" onClick={(e) => onWifChange(dispatch, this.props.history)}>Login</button>
          <Link to="/"><button className="altButton">Home</button></Link>
        </div>
        {this.props.decrypting === true ? <div className="decrypting">Decrypting keys...</div> : <div></div>}
        <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
      </div>
    </div>);
  }

}

const mapStateToProps = (state) => ({
  decrypting: state.account.decrypting
});

LoginNep2 = connect(mapStateToProps)(LoginNep2);

export default LoginNep2;
