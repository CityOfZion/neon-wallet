import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { getBalance } from '../wallet/api.js';
import { setBalance } from '../actions/index.js';

const initiateGetBalance = (dispatch, address) => {
  console.log("address", address);
  getBalance(address).then(function(result){
    console.log(result);
    dispatch(setBalance(result.ANS, result.ANC));
  })
};

let Balance = ({ dispatch, ans, anc, address }) =>
  <div id="balancePage" onLoad={initiateGetBalance(dispatch, address)}>
    <div id="publicAddress"><span className="descriptor">Address:</span><span className="key">{ address }</span></div>
    <div id="balanceList">
      <div><span className="asset">AntShares:</span><span className="amount">{ ans }</span></div>
      <div><span className="asset">AntCoins:</span><span className="amount">{ anc }</span></div>
    </div>
    <button><Link to="/">Logout</Link></button>
  </div>;

const mapStateToProps = (state) => ({
  ans: state.wallet.ANS,
  anc: state.wallet.ANC,
  address: state.account.address,
});

Balance = connect(mapStateToProps)(Balance);

export default Balance;
