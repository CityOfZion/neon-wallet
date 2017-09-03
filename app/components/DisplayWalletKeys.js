import React, { Component } from 'react';
import { Link } from 'react-router';
import QRCode from 'qrcode';
import { clipboard } from 'electron';
import Copy from 'react-icons/lib/md/content-copy';
import ReactTooltip from 'react-tooltip';
import storage from 'electron-json-storage';
import { resetKey } from '../modules/generateWallet';
import { connect } from 'react-redux';
import { sendEvent, clearTransactionEvent } from '../modules/transactions';

let key_name;

const saveKey = (dispatch, encWifValue) => {
  storage.get('keys', (error, data) => {
    data[key_name.value] = encWifValue
    dispatch(sendEvent(true, "Saved key as "+key_name.value))
    storage.set('keys', data);
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
  });
};

const resetGeneratedKey = (dispatch) => {
  dispatch(resetKey())
};

class DisplayWalletKeys extends Component {

  componentDidMount = () => {
    QRCode.toCanvas(this.publicCanvas, this.props.address, { version: 5 }, (err) => {
      if (err) console.log(err)
    });
    QRCode.toCanvas(this.privateCanvas, this.props.passphraseKey, { version: 5 }, (err) => {
      if (err) console.log(err)
    });
  }

  render = () =>
    <div>
      <div className="disclaimer">
        You must save and backup the keys below. If you lose them, you lose access to your assets.
        You can click "Save Key" to save the encrypted key in local application storage.
        Verify that you can log in to the account and see the correct public address before sending anything to the address below!
      </div>
      <div className="addressBox">
        <canvas ref={(node) => this.publicCanvas = node}></canvas>
        <div>Public Address</div>
      </div>
      <div className="privateKeyBox">
        <canvas ref={(node) => this.privateCanvas = node}></canvas>
        <div>Encrypted Private Key</div>
      </div>
      <div className="keyList">
        <div className="keyListItem">
          <span className="label">Passphrase:</span>
          <span className="key">{this.props.passphrase}</span>
          <span className="copyKey" onClick={() => clipboard.writeText(this.props.passphrase)}><Copy data-tip data-for="copyPassphraseTip" /></span>
        </div>
        <br/>
        <div className="keyListItem">
          <span className="label">Public Address:</span>
          <span className="key">{this.props.address}</span>
          <span className="copyKey" onClick={() => clipboard.writeText(this.props.address)}><Copy data-tip data-for="copyPublicKeyTip" /></span>
        </div>
        <div className="keyListItem">
          <span className="label">Encrypted key:</span>
          <span className="key">{this.props.passphraseKey}</span>
          <span className="copyKey" onClick={() => clipboard.writeText(this.props.passphraseKey)}><Copy data-tip data-for="copyPassphraseKeyTip" /></span>
        </div>
        <div className="keyListItem">
          <span className="label">Private Key:</span>
          <span className="key">{this.props.wif}</span>
          <span className="copyKey" onClick={() => clipboard.writeText(this.props.wif)}><Copy data-tip data-for="copyPrivateKeyTip" /></span>
        </div>
      </div>
      <div className="saveKey">
          <input type="text" placeholder="Name this key" ref={(node) => key_name = node}></input>
          <button onClick={() => saveKey(this.props.dispatch, this.props.passphraseKey)}>Save Key</button>
      </div>
      <Link onClick={() => resetGeneratedKey(this.props.dispatch)} to="/"><button>Back</button></Link>
      <button onClick={() => print()}>Print</button>
      <ReactTooltip class="solidTip" id="copyPublicKeyTip" place="bottom" type="dark" effect="solid">
        <span>Copy Public Key</span>
      </ReactTooltip>
      <ReactTooltip class="solidTip" id="copyPrivateKeyTip" place="bottom" type="dark" effect="solid">
        <span>Copy Private Key</span>
      </ReactTooltip>
      <ReactTooltip class="solidTip" id="copyPassphraseTip" place="bottom" type="dark" effect="solid">
        <span>Copy Passphrase</span>
      </ReactTooltip>
      <ReactTooltip class="solidTip" id="copyPassphraseKeyTip" place="bottom" type="dark" effect="solid">
        <span>Copy Passphrase Encrypted Key</span>
      </ReactTooltip>
    </div>;

}

const mapStateToProps = (state) => ({});

DisplayWalletKeys = connect(mapStateToProps)(DisplayWalletKeys);

export default DisplayWalletKeys;
