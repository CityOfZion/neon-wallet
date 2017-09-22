import React from 'react';
import { Link } from 'react-router';

const logo = require('../images/neon-logo2.png');

const Home = ({}) =>
  <div id="home">
    <div className="logo"><img src={logo} width="60px"/></div>
    <Link to="/LoginLocalStorage"><div className="linkBox">Login using a saved wallet</div></Link>
    <Link to="/LoginEncrypted"><div className="linkBox">Login using an encrypted key</div></Link>
    <Link to="/LoginPrivateKey"><div className="linkBox">Login using a private key</div></Link>
    <Link to="/LoginLedgerNanoS"><div className="linkBox">Login using the Ledger Nano S</div></Link>
    <Link to="/create"><div className="linkBox alt">Create a new wallet</div></Link>
    <Link to="/encryptKey"><div className="linkBox alt">Encrypt an existing key</div></Link>
    <Link to="/settings"><div className="linkBox alt">Manage Neon settings</div></Link>
    <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
  </div>

export default Home;
