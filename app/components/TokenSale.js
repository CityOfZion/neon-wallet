import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { setKeys } from '../modules/account';
import Delete from 'react-icons/lib/md/delete';
import _ from 'lodash';
import storage from 'electron-json-storage';
import * as Neon from 'neon-js'
import { initiateGetBalance, intervals, NetworkSwitch } from "../components/NetworkSwitch";
import { sendEvent, clearTransactionEvent } from '../modules/transactions';
import { updateRpxBalance } from '../modules/rpx';

const logo = require('../images/neon-logo2.png');

let scriptHashElement, neoToSend;

const refreshTokenBalance = (dispatch, net, address, silent = false) => {
  // TODO: add other check
  if (scriptHashElement.value.slice(0,1) != "0x" && scriptHashElement.value.length !== 42){
    if (!silent){
      dispatch(sendEvent(false, "Not a valid script hash."));
      setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    }
    return false;
  }
  Neon.getTokenBalance(net, scriptHashElement.value.slice(2, scriptHashElement.value.length), address).then((balance) => {
    dispatch(updateRpxBalance(balance))
  }).catch((e) => {
    dispatch(updateRpxBalance(0))
    dispatch(sendEvent(false, "There is no ability to display tokens at that script hash."));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    return false;
  });
}

const participateInSale = (dispatch, net, wif, totalNeo) => {
  const account = Neon.getAccountFromWIFKey(wif);
  if (parseFloat(neoToSend.value) !== parseInt(neoToSend.value)){
    dispatch(sendEvent(false, "You cannot send fractional Neo to a token sale."));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    return false;
  }
  const toMint = parseInt(neoToSend.value);
  neoToSend.value = "";
  if (toMint > totalNeo){
    dispatch(sendEvent(false, "You do not have enough Neo to send."));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    return false;
  }
  let scriptHash;
  if (scriptHashElement.value.slice(0,1) != "0x" && scriptHashElement.value.length !== 42){
    dispatch(sendEvent(false, "Not a valid script hash."));
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    return false;
  }
  scriptHash = scriptHashElement.value.slice(2, scriptHashElement.value.length)
  Neon.getTokenBalance(net, scriptHash, account.address).then((balance) => {
      dispatch(sendEvent(true, "Processing..."));
      setTimeout(() => dispatch(clearTransactionEvent()), 5000);
      Neon.doMintTokens(net, scriptHash, wif, toMint, 0).then((response) => {
        dispatch(sendEvent(true, "Processing..."));
        setTimeout(() => dispatch(clearTransactionEvent()), 5000);
        if(response.result === true){
          dispatch(sendEvent(true, "Sale participation was successful."));
          setTimeout(() => dispatch(clearTransactionEvent()), 5000);
          return true;
        }
        else{
          dispatch(sendEvent(false, "Sale participation failed."));
          setTimeout(() => dispatch(clearTransactionEvent()), 5000);
          return false;
        }
      })
  }).catch((e) => {
    dispatch(sendEvent(false, "This script hash cannot mint tokens."));
    console.log(e)
    setTimeout(() => dispatch(clearTransactionEvent()), 5000);
    return false;
  });
};

const saveSettings = (settings) => {
  storage.set('settings', settings);
};

class TokenSale extends Component {

  componentDidMount = () => {
    this.props.dispatch(updateRpxBalance(0))
    initiateGetBalance(this.props.dispatch, this.props.net, this.props.address)
    refreshTokenBalance(this.props.dispatch, this.props.net, this.props.address, true)

  }

  componentDidUpdate = () => {
    // refreshTokenBalance(this.props.dispatch, this.props.net, this.props.address, true)
  }

  render = () =>
    <div id="tokenSale">
      <div className="logo"><img src={logo} width="60px"/></div>
      <NetworkSwitch />
      <div className="description">Participate in Token Sale</div>
      <div className="warning">
        <b>WARNING:</b> Be very careful with how you participate in a sale! This interface may not work for all sales! Submitting NEO multiple times to a sale may result in lost funds
        or a delayed refund depending on the policy of the sale. CoZ is not responsible for any mistakes you make participating in
        a sale. After submitting to a sale, you will need to <b>WAIT SOME TIME</b> for the balance of tokens to refresh. You can click
        "Refresh Token" after 10s if you still do not see anything. It is also possible that nodes may not update properly with your token balance,
        so <b>THINK VERY CAREFULLY</b> before resubmitting to a sale. Do not click "Submit" twice. CoZ does not endorse any token sale!
      </div>
      <div className="settingsForm">
        <div className="settingsItem">
          <div className="itemTitle">NEO Balance:</div>
          <div>{this.props.neo}</div>
        </div>
        <div className="settingsItem">
          <div className="itemTitle">Token Balance:</div>
          <div>{this.props.rpx}</div>
        </div>
        <div className="settingsItem">
        <div className="itemTitle">Script Hash:</div>
          <input type="text" className="scriptHash" ref={(node) => scriptHashElement = node}></input>
        </div>
          <div className="settingsItem">
            <div className="itemTitle">Amount of NEO to Send:</div>
            <input type="text" className="neoAmount" placeholder="e.g., 100" ref={(node) => neoToSend = node}/>
          </div>
          <button onClick={() => participateInSale(this.props.dispatch, this.props.net, this.props.wif, this.props.neo)}>Submit for Sale</button>
          <button onClick={() => refreshTokenBalance(this.props.dispatch, this.props.net, this.props.address)}>Refresh Token Balance</button>
        </div>
      <Link to="/"><button className="altButton">Home</button></Link>
    </div>;
}

const mapStateToProps = (state) => ({
  explorer: state.metadata.blockExplorer,
  wif: state.account.wif,
  neo: state.wallet.Neo,
  net: state.metadata.network,
  address: state.account.address,
  wallets: state.account.accountKeys,
  rpx: state.rpx.RPX
});

TokenSale = connect(mapStateToProps)(TokenSale);

export default TokenSale;
