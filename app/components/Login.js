import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { login, setRememberLogin, getStoredPrivateKey } from '../modules/account';
import CreateWallet from './CreateWallet.js'
import { getWIFFromPrivateKey } from 'neon-js';
import { withRouter } from 'react-router';

const logo = require('../images/neon-logo2.png');

const onWifChange = (dispatch, value) => {
  // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
  dispatch(login(value));
};

const onRememberLoginChanged = (dispatch, value) => {
  dispatch(setRememberLogin(value));
};

class Login extends Component {
  componentDidMount = () => {
    // If we have a previously stored private key
    // then automatic login was chosen and we should login right away
    var privateKey = getStoredPrivateKey();
    if (privateKey) {
      // Run through the login process
      this.props.dispatch(login(privateKey));

      // Perform a navigation to the dashboard
      this.props.router.push('/dashboard');
    }
  }

  render = () => 
    <div id="loginPage">
      <div className="login">
        <div className="logo"><img src={logo} width="60px"/></div>
        <input type="text" placeholder="Enter your private key here (WIF)" onChange={(e) => onWifChange(this.props.dispatch, e.target.value)} />
        <div className="loginButtons">
          {this.props.loggedIn ? <Link to="/dashboard"><button>Login</button></Link> : <button disabled="true">Login</button>}
          <Link to="/create"><button>New Wallet</button></Link>
        </div>
        <div className="rememberLoginField">
          <input id="rememberLogin" type="checkbox" onClick={(e) => onRememberLoginChanged(this.props.dispatch, e.target.checked)} />
          <label htmlFor="rememberLogin"> Remember my private key and login automatically</label>
        </div>
        <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
      </div>
    </div>;
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif,
  rememberLogin: state.account.rememberLogin
});

Login = connect(mapStateToProps)(withRouter(Login));

export default Login;
