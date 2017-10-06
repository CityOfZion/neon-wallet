import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setKeys } from '../modules/account';
import Delete from 'react-icons/lib/md/delete';
import _ from 'lodash';
import storage from 'electron-json-storage';
import { initiateGetBalance, intervals, NetworkSwitch } from "../components/NetworkSwitch";

const logo = require('../images/neon-logo2.png');

let saleSelect, neoToSend;

const saveSettings = (settings) => {
  storage.set('settings', settings);
};

class TokenSale extends Component {

  componentDidMount = () => {
    initiateGetBalance(this.props.dispatch, this.props.net, this.props.address)
  }

  render = () =>
    <div id="settings">
      <div className="logo"><img src={logo} width="60px"/></div>
      <div className="description">Participate in Token Sale</div>
      <div className="settingsForm">
        <div className="settingsItem">
          <div className="itemTitle">Network:</div>
          <NetworkSwitch />
        </div>
        <div className="settingsItem">
          <div className="itemTitle">NEO Balance:</div>
          <div>{this.props.neo}</div>
        </div>
        <div className="settingsItem">
        <div className="itemTitle">Token Sale</div>
          <select ref={(node) => saleSelect = node}>
            <option>RPX</option>
          </select>
        </div>
          <div className="settingsItem">
            <div className="itemTitle">Amount of NEO to Send:</div>
            <input type="text" value="e.g., 100" ref={(node) => neoToSend = node}/>
          </div>
          <button onClick={() => participateInSale(this.props.wallets)}>Submit for Sale</button>
        </div>
      <Link to="/"><button className="altButton">Home</button></Link>
    </div>;
}

const mapStateToProps = (state) => ({
  explorer: state.metadata.blockExplorer,
  wif: state.account.wif,
  neo: state.wallet.Neo,
  net: state.metadata.network,
  address: state.account.address,
  wallets: state.account.accountKeys
});

TokenSale = connect(mapStateToProps)(TokenSale);

export default TokenSale;
