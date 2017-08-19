import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { login } from '../modules/account';
import CreateWallet from './CreateWallet.js'
import { getWIFFromPrivateKey } from 'neon-js';
import FaEye from 'react-icons/lib/fa/eye';
import FaEyeSlash from 'react-icons/lib/fa/eye-slash';

const logo = require('../images/neon-logo2.png');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showKey: false,
    };

    this.toggleKeyVisibility = this.toggleKeyVisibility.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  static propTypes = {
    loggedIn: React.PropTypes.bool.isRequired,
    wif: React.PropTypes.string,
    onWifChange: React.PropTypes.func.isRequired,
  };

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey,
    }));
  };

  handleInputChange = (e) => {
    const value = e.target.value;

    this.setState({
      [e.target.name]: value,
    });

    this.props.onWifChange(this.props.dispatch, value);
  };

  render = () => {
    const { loggedIn, wif } = this.props;
    const { showKey } = this.state;

    return (
      <div id="loginPage">
        <div className="login">
          <div className="logo">
            <img src={logo} width="60px" />
          </div>

          <input type={showKey ? 'text' : 'password'}
             placeholder="Enter your private key here (WIF)"
             id="inputKey"
             name="wif"
             onChange={this.handleInputChange} />

          {showKey ?
            <FaEyeSlash className="viewKey" onClick={this.toggleKeyVisibility} /> :
            <FaEye className="viewKey" onClick={this.toggleKeyVisibility} />}

          <div className="loginButtons">
            {loggedIn ?
              <Link to="/dashboard">
                <button>Login</button>
              </Link> :
              <button disabled="true">Login</button>}
              <Link to="/create">
                <button>New Wallet</button>
              </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.account.loggedIn,
  wif: state.account.wif,
});

const mapActionCreators = (dispatch) => {
  return {
    dispatch,
    onWifChange: (dispatch, value) => {
      // TODO: changed back to only WIF login for now, getting weird errors with private key hex login
      dispatch(login(value));
    }
  }
};

export default connect(mapStateToProps, mapActionCreators)(Login);