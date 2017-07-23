import React, { Component } from 'react';
import { connect } from 'react-redux';
import { syncTransactionHistory } from "../components/NetworkSwitch";

class TransactionHistory extends Component {

  componentDidMount = () => {
    syncTransactionHistory(this.props.dispatch, this.props.net, this.props.address);
  }

  render = () =>
    <div id="transactionInfo">
      <div className="columnHeader">Transaction History</div>
      <div className="headerSpacer"></div>
      <ul id="transactionList">
        {this.props.transactions.map((t) => <li><div className="txid">{t.txid}</div><div className="amount">{t.NEO} NEO</div></li>)}
      </ul>
    </div>;
}

const mapStateToProps = (state) => ({
  address: state.account.address,
  net: state.wallet.net,
  transactions: state.wallet.transactions
});

TransactionHistory = connect(mapStateToProps)(TransactionHistory);

export default TransactionHistory;
