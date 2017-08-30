import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setBlockExplorer } from '../modules/metadata';

const logo = require('../images/neon-logo2.png');

let explorer_select;

let Settings = ({dispatch, explorer}) =>
  <div id="settings">
    <div className="logo"><img src={logo} width="60px"/></div>
    <div className="title">Settings:</div>
    <div className="settingsForm">
      <div className="settingsItem">
        <label>Block Explorer:</label>
        <select value={explorer} ref={(node) => explorer_select = node} onChange={() => dispatch(setBlockExplorer(explorer_select.value))}>
          <option>Neotracker</option>
          <option>Antchain</option>
        </select>
      </div>
    </div>
    <Link to="/"><button className="altButton">Home</button></Link>
  </div>

const mapStateToProps = (state) => ({
  explorer: state.metadata.blockExplorer,
});

Settings = connect(mapStateToProps)(Settings);

export default Settings;
