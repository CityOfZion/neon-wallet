import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newWallet } from '../actions/index.js';
import { Link } from 'react-router';
import WalletInfo from './WalletInfo.js';
import QRCode from 'qrcode';
import { clipboard } from 'electron';
import Copy from 'react-icons/lib/md/content-copy';
import ReactTooltip from 'react-tooltip';


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
      <div className="keyList">
        <span className="label">Public Address:</span>
        <span className="key">{this.props.address}</span>
        <span className="copyKey" onClick={() => clipboard.writeText(this.props.address, 'selection')}><Copy data-tip data-for="copyPublicKeyTip" /></span>
      </div>
      <div className="keyList">
        <span className="label">Private Key:</span>
        <span className="key">{this.props.wif}</span>
        <span className="copyKey" onClick={() => clipboard.writeText(this.props.wif, 'selection')}><Copy data-tip data-for="copyPrivateKeyTip" /></span>
      </div>
      <Link to="/"><button>Back to Login</button></Link>
      <ReactTooltip class="solidTip" id="copyPublicKeyTip" place="bottom" type="dark" effect="solid">
        <span>Copy Public Key</span>
      </ReactTooltip>
      <ReactTooltip class="solidTip" id="copyPrivateKeyTip" place="bottom" type="dark" effect="solid">
        <span>Copy Private Key</span>
      </ReactTooltip>
    </div>;

}

const mapStateToProps = (state) => ({
  wif: state.generateWallet.wif,
  address: state.generateWallet.address
});

CreateWallet = connect(mapStateToProps)(CreateWallet);

export default CreateWallet;
