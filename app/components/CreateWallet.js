import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newWallet } from '../actions/index.js';
import { Link } from 'react-router';
import WalletInfo from './WalletInfo.js'

const generateWallet = (dispatch) => {
  dispatch(newWallet());
};

class CreateWallet extends Component {

  componentDidMount = () => {
    generateWallet(this.props.dispatch);
  }

  render = () =>
    <div id="newWallet">
      <div className="title">Generate a new wallet:</div>
      <WalletInfo wif={this.props.wif} address={this.props.address}/>
      <button onClick={() => generateWallet(this.props.dispatch)}>Regenerate wallet</button>
      <button><Link to="/">Back to Login</Link></button>
    </div>;

}

const mapStateToProps = (state) => ({
  wif: state.generateWallet.wif,
  address: state.generateWallet.address
});

CreateWallet = connect(mapStateToProps)(CreateWallet);

export default CreateWallet;
