import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setKeys } from '../modules/account';
import Delete from 'react-icons/lib/md/delete';
import _ from 'lodash';
import storage from 'electron-json-storage';

const logo = require('../images/neon-logo2.png');

let saleSelect;

const saveSettings = (settings) => {
  storage.set('settings', settings);
};

class TokenSale extends Component {

  componentDidMount = () => {
    storage.get('keys', (error, data) => {
      this.props.dispatch(setKeys(data));
    });
    loadSettings(this.props.dispatch);
  }

  render = () =>
    <div id="settings">
      <div className="logo"><img src={logo} width="60px"/></div>
      <div className="description">Participate in Token Sale</div>
      <div className="settingsForm">
        <div className="settingsItem">
        <div className="itemTitle">Token Sale</div>
          <select ref={(node) => saleSelect = node}>
            <option>RPX</option>
          </select>
        </div>
          <div className="settingsItem">
            <div className="itemTitle">Amount of NEO to Send:</div>
            <input type="text" value="e.g., 100" ref={(node) => neoToSend = neo}/>
          </div>
          <button onClick={() => participateInSale(this.props.wallets)}>Submit for Sale</button>
        </div>
      <Link to="/"><button className="altButton">Home</button></Link>
    </div>;
}

const mapStateToProps = (state) => ({
  explorer: state.metadata.blockExplorer,
  wif: state.account.wif,
  address: state.account.address,
  wallets: state.account.accountKeys
});

TokenSale = connect(mapStateToProps)(TokenSale);

export default TokenSale;
