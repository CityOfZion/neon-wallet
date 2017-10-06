import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { login } from '../modules/account';
import { getWIFFromPrivateKey } from 'neon-js';
import { encryptWIF, decryptWIF } from 'neon-js';
import { sendEvent, clearTransactionEvent } from '../modules/transactions';
import { getAccountFromWIFKey } from 'neon-js';
import FaEye from 'react-icons/lib/fa/eye';
import FaEyeSlash from 'react-icons/lib/fa/eye-slash';

class LoginPrivateKey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showKey: false,
      wif: '',
    };

    this.toggleKeyVisibility = this.toggleKeyVisibility.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    wif: React.PropTypes.string,
    onWifChange: React.PropTypes.func.isRequired,
    verifyPrivateKey: React.PropTypes.func.isRequired,
  };

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey,
    }));
  };

  handleInputChange = (e) => {
    const value = e.target.value;

    this.setState({
      wif: value,
    });
  }

  handleVerify = () => {
    this.props.onWifChange(this.props.dispatch, this.props.verifyPrivateKey, this.props.history, this.state.wif);
  }

  render = () => {
    let { loggedIn, wif } = this.props;
    const { showKey } = this.state;
    const logo = require('../images/neon-logo2.png');

    return (
      <div id="loginPage">
        <div className="login">
          <div className="loginForm">
            <div className="logo"><img src={logo} width="60px"/></div>
            <input type={showKey ? 'text' : 'password'} placeholder="Enter your private key here (WIF)" onChange={this.handleInputChange} />

            {showKey ?
              <FaEyeSlash className="viewKey" onClick={this.toggleKeyVisibility} /> :
              <FaEye className="viewKey" onClick={this.toggleKeyVisibility} />
            }
          </div>
          <div className="loginButtons">
            <button onClick={this.handleVerify}>Login</button>
            <Link to="/"><button className="altButton">Home</button></Link>
          </div>
          <div id="footer">Created by Ethan Fast and COZ. Donations: Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif,
});

const mapActionCreators = (dispatch) => {
  return {
    dispatch,
    // TODO: move to neon-js
    verifyPrivateKey: (wif) => {
      try {
        // TODO: better check
        getAccountFromWIFKey(wif).address;
      }
      catch (e){
        return false;
      }
      return true;
    },
    onWifChange: (dispatch, verifyPrivateKey, history, wif) => {
      // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
      if (verifyPrivateKey(wif) === true){
        dispatch(login(wif));
        history.push('/dashboard');
      }
      else {
        dispatch(sendEvent(false, "That is not a valid private key"));
        setTimeout(() => dispatch(clearTransactionEvent()), 5000);
      }
    }
  }
};

export default connect(mapStateToProps, mapActionCreators)(LoginPrivateKey);
