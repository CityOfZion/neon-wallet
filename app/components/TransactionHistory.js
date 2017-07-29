import React, { Component } from 'react';
import { connect } from 'react-redux';
import { syncTransactionHistory } from "../components/NetworkSwitch";
import { shell } from 'electron';

const openExplorer = (srcLink) => {
  shell.openExternal(srcLink);
}

class TransactionHistory extends Component {

  componentDidMount = () => {
    syncTransactionHistory(this.props.dispatch, this.props.net, this.props.address);
  }

  render = () =>
    <div id="transactionInfo">
      <div className="columnHeader">Transaction History</div>
      <div className="headerSpacer"></div>
      <ul id="transactionList">
        {this.props.transactions.map((t) => <li><div className="txid" onClick={() => openExplorer(this.props.explorer.getTransactionLink(this.props.net, t.txid))}>{t.txid}</div><div className="amount">{t.amount} {t.type}</div></li>)}
      </ul>
    </div>;
}

const mapStateToProps = (state) => ({
  address: state.account.address,
  net: state.wallet.net,
  transactions: state.wallet.transactions,
  explorer: state.settings.explorer
});

TransactionHistory = connect(mapStateToProps)(TransactionHistory);

export default TransactionHistory;
