import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newWallet } from '../modules/generateWallet';
import { Link } from 'react-router';
import WalletInfo from './WalletInfo.js';
import QRCode from 'qrcode';
import { clipboard } from 'electron';
import Copy from 'react-icons/lib/md/content-copy';
import ReactTooltip from 'react-tooltip';
import DisplayWalletKeys from './DisplayWalletKeys';
import { generateEncryptedWif } from '../util/Passphrase';


let passphrase;

const generateNewWallet = (dispatch, passphrase) => {
  generateEncryptedWif(passphrase).then((result) => {
    console.log("encWif", result);
    dispatch(newWallet(result));
  })
}

class CreateWallet extends Component {

  render = () =>
    <div id="newWallet">
    <div className="info">
      Choose a passphrase to encrypt your private key:
    </div>
    <input type="text" ref={(node) => passphrase = node} placeholder="enter passphrase here"/>
    <button onClick={() => generateNewWallet(this.props.dispatch, passphrase.value)} > Generate keys </button>
    {this.props.wif !== null ? <DisplayWalletKeys address={this.props.address} wif={this.props.wif} passphrase={this.props.passphrase} passphraseKey={this.props.encryptedWif} /> : <div></div>}
    </div>

}

const mapStateToProps = (state) => ({
  wif: state.generateWallet.wif,
  address: state.generateWallet.address,
  encryptedWif: state.generateWallet.encryptedWif,
  passphrase: state.generateWallet.passphrase
});

CreateWallet = connect(mapStateToProps)(CreateWallet);

export default CreateWallet;
