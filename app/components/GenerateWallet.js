import React from 'react';
import { connect } from 'react-redux';
import { newWallet } from '../actions/index.js';

const generateWallet = (dispatch) => {
  dispatch(newWallet());
};

let GenerateWallet = ({dispatch, wif}) =>
  <div id="newWallet">
    <div className="title">Generate a new wallet:</div>
    <div id="walletInfo">
      {wif !== null ? <span className="key">{ wif }</span> : <span></span>}
    </div>
    <button onClick={() => generateWallet(dispatch)}>Generate wallet</button>
  </div>

const mapStateToProps = (state) => ({
  wif: state.generateWallet.wif
});

GenerateWallet = connect(mapStateToProps)(GenerateWallet);

export default GenerateWallet;
