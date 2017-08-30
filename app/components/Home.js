import React from 'react';
import { Link } from 'react-router';

const logo = require('../images/neon-logo2.png');

const Home = ({}) =>
  <div id="home">
    <div className="logo"><img src={logo} width="60px"/></div>
    <Link to="/LoginLocalStorage"><div className="linkBox">Login using a saved wallet</div></Link>
    <Link to="/LoginEncrypted"><div className="linkBox">Login using an encrypted key</div></Link>
    <Link to="/LoginPrivateKey"><div className="linkBox">Login using a private key</div></Link>
    <Link to="/create"><div className="linkBox alt">Create a new wallet</div></Link>
    <Link to="/create"><div className="linkBox alt">Encrypt an existing key</div></Link>
    <Link to="/settings"><div className="linkBox alt">Manage Neon settings</div></Link>
  </div>

export default Home;
