import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { getBalance } from '../wallet/api.js';
import { setBalance } from '../actions/index.js';

const initiateGetBalance = (dispatch, net, address) => {
  getBalance(net, address).then(function(result){
    // if account/key has never been used, may not be a valid API call
    // TODO: return/pass something better than undefined
    if(result === undefined){
      dispatch(setBalance(undefined, undefined));
    } else{
      dispatch(setBalance(result.ANS, result.ANC));
    }
  });
};

class Balance extends Component {

  componentDidMount = () => {
    initiateGetBalance(this.props.dispatch, this.props.net, this.props.address);
  }

  componentDidUpdate = () => {
    initiateGetBalance(this.props.dispatch, this.props.net, this.props.address);
  }

  render = () =>
    <div id="balancePage">
    <div className="title">Account Balance:</div>
      <div id="publicAddress"><span className="descriptor">Address:</span><span className="key">{ this.props.address }</span></div>
      <div id="balanceList">
        <div><span className="asset">AntShares:</span><span className="amount">{ this.props.ans }</span></div>
        <div><span className="asset">AntCoins:</span><span className="amount">{ this.props.anc }</span></div>
      </div>
      <div className="margin10">
        <button onClick={() => initiateGetBalance(this.props.dispatch, this.props.net, this.props.address)}>Refresh</button>
        <button><Link to="/send">Send Transaction</Link></button>
      </div>
      <button><Link to="/">Logout</Link></button>
    </div>;
}

const mapStateToProps = (state) => ({
  ans: state.wallet.ANS,
  anc: state.wallet.ANC,
  address: state.account.address,
  net: state.network.net
});

Balance = connect(mapStateToProps)(Balance);

export default Balance;
