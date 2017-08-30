import React from 'react';
import { Link } from 'react-router';

const Home = ({}) =>
  <div id="home">
    <Link to="/LoginLocalStorage"><div className="linkBox">Login with a saved wallet</div></Link>
    <Link to="/LoginEncrypted"><div className="linkBox">Login with an encrypted key</div></Link>
    <Link to="/LoginPrivateKey"><div className="linkBox">Login with a private key</div></Link>
    <Link to="/create"><div className="linkBox">Create a new wallet</div></Link>
    <Link to="/settings"><div className="linkBox">Manage Neon settings</div></Link>
  </div>

export default Home;
