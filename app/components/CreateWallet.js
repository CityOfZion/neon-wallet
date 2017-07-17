import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newWallet } from '../actions/index.js';
import { Link } from 'react-router';
import WalletInfo from './WalletInfo.js';
import QRCode from 'qrcode';

const generateWallet = (dispatch) => {
  dispatch(newWallet());
};

class CreateWallet extends Component {

  componentDidMount = () => {
    generateWallet(this.props.dispatch);
  }

  componentDidUpdate = () => {
    QRCode.toCanvas(this.publicCanvas, this.props.address, { version: 5 }, (err) => {
      if (err) console.log(err)
    });
    QRCode.toCanvas(this.privateCanvas, this.props.wif, { version: 5 }, (err) => {
      if (err) console.log(err)
    });
  }

  render = () =>
    <div id="newWallet">
      <div className="disclaimer">
        Save the keys below. We will never show you this private key again.
      </div>
      <div className="addressBox">
        <canvas ref={(node) => this.publicCanvas = node}></canvas>
        <div>Public Address</div>
      </div>
      <div className="privateKeyBox">
        <canvas ref={(node) => this.privateCanvas = node}></canvas>
        <div>Private Key (WIF)</div>
      </div>
      <div className="keyList"><span className="label">Public Address:</span><span className="key">{this.props.address}</span></div>
      <div className="keyList"><span className="label">Private Key:</span><span className="key">{this.props.wif}</span></div>
      <button><Link to="/">Back to Login</Link></button>
    </div>;

}

const mapStateToProps = (state) => ({
  wif: state.generateWallet.wif,
  address: state.generateWallet.address
});

CreateWallet = connect(mapStateToProps)(CreateWallet);

export default CreateWallet;
