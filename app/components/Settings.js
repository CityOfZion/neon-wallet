import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setBlockExplorer } from '../modules/metadata';
import { setKeys } from '../modules/account';
import Delete from 'react-icons/lib/md/delete';
import _ from 'lodash';
import fs from 'fs';
import { tryParse, restructureNeoWallet } from '../modules/decryptJSONWallet'

const {dialog} = require('electron').remote;

import storage from 'electron-json-storage';

const logo = require('../images/neon-logo2.png');

let explorer_select;

const saveKeyRecovery = (keys) => {
  const content = JSON.stringify(keys);
  dialog.showSaveDialog({filters: [{
      name: 'JSON',
      extensions: ['json']
    }]}, (fileName) => {
    if (fileName === undefined){
        console.log("File failed to save...");
        return;
    }
    // fileName is a string that contains the path and filename created in the save file dialog.
    fs.writeFile(fileName, content, (err) => {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
        }
        alert("The file has been succesfully saved");
    });
  });
};

const loadKeyRecovery = (dispatch) => {
  dialog.showOpenDialog((fileNames) => {
    // fileNames is an array that contains all the selected
    if(fileNames === undefined){
        console.log("No file selected");
        return;
    }
    const filepath = fileNames[0];
    fs.readFile(filepath, 'utf-8', (err, data) => {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }
        tryParse(data).then(restructureNeoWallet).then(({ name, ...neoWalletRest }) => {
          const keys = {
            [name]: {
              type: "neo-wallet",
              ...neoWalletRest
            }
          };
          storage.get("keys", (err, data) => {
            if (err) {
              alert(`An error occurred parsing the file: ${err.message}`)
              return;
            }

            const mergedWallets = { ...data, ...keys }
            dispatch(setKeys(mergedWallets))
            storage.set('keys', mergedWallets)
          })
        }).catch((error) => {
          tryParse(data).then((keys) => {
            if (_.isNil(keys)) {
              alert('Invalid wallet format; not JSON.')
              return;
            }

            // Previous wallet keys were stored as Strings, here we ensure they
            // are turned into objects with type fields defaulting to 'neon'
            keys = _.map(keys, (value, key) => {
              if (_.isString(value)) {
                return {
                  type: 'neon',
                  privateKey: value
                };
              }

              return value;
            })

            const mergedWallets = { ...data, ...keys }
            dispatch(setKeys(mergedWallets));
            storage.set('keys', mergedWallets);
          })
        })
    });
});
}

const saveSettings = (settings) => {
  storage.set('settings', settings);
};

const loadSettings = (dispatch) => {
  storage.get('settings', (error, settings) => {
    if(settings.blockExplorer !== null && settings.blockExplorer !== undefined){
      dispatch(setBlockExplorer(settings.blockExplorer));
    }
  });
};

const updateSettings = (dispatch) => {
  saveSettings({blockExplorer: explorer_select.value});
  dispatch(setBlockExplorer(explorer_select.value));
};

const deleteWallet = (dispatch, key) => {
  storage.get('keys', (error, data) => {
    delete data[key];
    storage.set('keys', data);
    dispatch(setKeys(data));
  });
}

class Settings extends Component {

  componentDidMount = () => {
    storage.get('keys', (error, data) => {
      this.props.dispatch(setKeys(data));
    });
    loadSettings(this.props.dispatch);
  }

  render = () => {
    const walletElems = _.map(this.props.wallets, (value, walletName) => {
      let wif = value;
      if (_.isObject(value)) {
        wif = '<encrypted key>'
      }
      return (
        <div className="walletList">
          <div className="walletItem">
            <div className="walletName">{walletName.slice(0,20)}</div>
            <div className="walletKey">{wif}</div>
            <div className="deleteWallet" onClick={() => deleteWallet(this.props.dispatch, walletName)}><Delete/></div>
          </div>
        </div>
      );
    });
    return <div id="settings">
      <div className="logo"><img src={logo} width="60px"/></div>
      <div className="description">Manage your Neon wallet keys and settings</div>
      <div className="settingsForm">
        <div className="settingsItem">
        <div className="itemTitle">Block Explorer</div>
          <select value={this.props.explorer} ref={(node) => explorer_select = node} onChange={() => updateSettings(this.props.dispatch)}>
            <option>Neotracker</option>
            <option>Antchain</option>
          </select>
        </div>
          <div className="settingsItem">
            <div className="itemTitle">Saved Wallet Keys</div>
            { walletElems }
          </div>
          <button onClick={() => saveKeyRecovery(this.props.wallets)}>Export key recovery file</button>
          <button onClick={() => loadKeyRecovery(this.props.dispatch)}>Load key recovery file</button>
        </div>
      <Link to="/"><button className="altButton">Home</button></Link>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  explorer: state.metadata.blockExplorer,
  wallets: state.account.accountKeys
});

Settings = connect(mapStateToProps)(Settings);

export default Settings;
