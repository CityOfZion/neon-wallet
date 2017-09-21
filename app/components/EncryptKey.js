import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newWallet, generating } from '../modules/generateWallet';
import { Link } from 'react-router';
import WalletInfo from './WalletInfo.js';
import QRCode from 'qrcode';
import { clipboard } from 'electron';
import Copy from 'react-icons/lib/md/content-copy';
import ReactTooltip from 'react-tooltip';
import DisplayWalletKeys from './DisplayWalletKeys';
import { encryptWifAccount } from 'neon-js';
import { sendEvent, clearTransactionEvent } from '../modules/transactions';

const logo = require('../images/neon-logo2.png');

let wif_input, passphrase, passphrase2;

// TODO: move to neon-js
// what is the correct length to check for?
const validatePassphrase = (passphrase) => {
  return passphrase.length >= 4;
};

const generateNewWallet = (dispatch) => {
  const current_phrase = passphrase.value;
  const current_wif = wif_input.value;
  if (passphrase.value !== passphrase2.value){
    dispatch(sendEvent(false, "Passphrases do not match"));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    return;
  }
  if (validatePassphrase(current_phrase)){
    // TODO: for some reason this blocks, so giving time to processes the earlier
    // dispatch to display "generating" text, should fix this in future
    dispatch(sendEvent(true, "Generating encoded key..."));
    setTimeout(() => {
      encryptWifAccount(current_wif, current_phrase).then((result) => {
        dispatch(newWallet(result));
        dispatch(clearTransactionEvent());
      }).catch(() => {
        dispatch(sendEvent(false, "The private key is not valid"));
        setTimeout(() => dispatch(clearTransactionEvent()), 5000);
      });
    }, 500);
  }
  else {
    dispatch(sendEvent(false, "Please choose a longer passphrase"));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    passphrase.value = '';
    passphrase2.value = '';
  }
}

class CreateWallet extends Component {

  render = () => {
    const passphraseDiv = (<div>
        <div className="info">
          Choose a passphrase to encrypt your existing private key:
        </div>
        <input type="text" ref={(node) => passphrase = node} placeholder="Enter passphrase here"/>
        <input type="text" ref={(node) => passphrase2 = node} placeholder="Enter passphrase again"/>
        <input type="text" ref={(node) => wif_input = node} placeholder="Enter existing WIF here"/>
        <button onClick={() => generateNewWallet(this.props.dispatch)} > Generate encrypted key </button>
        <Link to="/"><button className="altButton">Home</button></Link>
      </div>);
      return (<div id="newWallet">
        <div className="logo"><img src={logo} width="60px"/></div>
        {this.props.wif === null ? passphraseDiv : <div></div>}
        {this.props.generating === true ? <div className="generating">Generating keys...</div> : <div></div>}
        {this.props.generating === false && this.props.wif !== null ? <DisplayWalletKeys address={this.props.address} wif={this.props.wif} passphrase={this.props.passphrase} passphraseKey={this.props.encryptedWif} /> : <div></div>}
      </div>)
  }

}

const mapStateToProps = (state) => ({
  wif: state.generateWallet.wif,
  address: state.generateWallet.address,
  encryptedWif: state.generateWallet.encryptedWif,
  passphrase: state.generateWallet.passphrase,
  generating: state.generateWallet.generating
});

CreateWallet = connect(mapStateToProps)(CreateWallet);

export default CreateWallet;
