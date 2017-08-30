import React from 'react';
import { Link } from 'react-router';

const logo = require('../images/neon-logo2.png');

const Settings = ({}) =>
  <div id="settings">
    <div className="logo"><img src={logo} width="60px"/></div>
    <div className="title">Settings:</div>
    <div className="settingsForm">
      <div className="settingsItem">
        <label>Block Explorer:</label>
        <select>
          <option>Neotracker</option>
          <option>Antchain</option>
        </select>
      </div>
    </div>
    <Link to="/"><button className="altButton">Home</button></Link>
  </div>

export default Settings;
