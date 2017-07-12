import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'

let Balance = ({ ans, anc }) =>
  <div id="balancePage">
    <div id="balanceList">
      <div><span className="asset">AntShares:</span><span className="amount">{ ans }</span></div>
      <div><span className="asset">AntCoins:</span><span className="amount">{ anc }</span></div>
    </div>
    <button><Link to="/">Logout</Link></button>
  </div>;

const mapStateToProps = (state) => ({
  ans: state.wallet.ANS,
  anc: state.wallet.ANC
});

Balance = connect(mapStateToProps)(Balance);

export default Balance;
