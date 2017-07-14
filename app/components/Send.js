import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

let sendAddress, sendAsset, sendAmount;

const sendTransaction = (dispatch, wif) => {
  console.log(sendAddress.value, sendAsset.value, sendAmount.value);
}

let Send = ({dispatch, wif}) =>
  <div id="sendPage">
    <div className="title">Transfer</div>
    <div className="margin10">
      <input id="sendAddress" placeholder="Where to send the asset (address)" ref={node => {sendAddress = node;}}/>
      <select id="sendAsset" ref={node => {sendAsset = node;}}>
        <option>AntShares</option>
        <option>AntCoin</option>
      </select>
      <input id="sendAmount" placeholder="Amount" ref={node => {sendAmount = node;}}/>
    </div>
    <button onClick={() => sendTransaction(dispatch, wif)}>Send Asset</button>
    <div className="margin10"><button><Link to="/balance">Back to balance</Link></button></div>
  </div>

const mapStateToProps = (state) => ({
  wif: state.account.wif
});

Send = connect(mapStateToProps)(Send);

export default Send;
