import React, { Component } from 'react';
import { connect } from 'react-redux';
import { syncTransactionHistory } from "../components/NetworkSwitch";
import { shell } from 'electron';
import Copy from 'react-icons/lib/md/content-copy';
import { clipboard } from 'electron';
import ExplorerSwitch from '../components/ExplorerSwitch'
// TODO: make this a user setting
const getExplorerLink = (net, txid, explorer) => {
  let base;
  if (net === "MainNet"){
    base = explorer.mainnet_url;
  } else {
    base = explorer.testnet_url;
  }
  return `${base}${explorer.hash_path}${txid}`;
}

// helper to open an external web link
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
      <ExplorerSwitch />
      <div className="headerSpacer"></div>
      <ul id="transactionList">
        {this.props.transactions.map((t) => {
          let formatAmount;
          if (t.type === "NEO"){ formatAmount = parseInt(t.amount); }
          else{ formatAmount = parseFloat(t.amount).toPrecision(5); }
          // ignore precision rounding errors for GAS
          if ((formatAmount > 0 && formatAmount < 0.001) || (formatAmount < 0 && formatAmount > -0.001)){
            formatAmount = 0.0.toPrecision(5);
          }
          return (<li key={t.txid}>
              <div className="txid" onClick={() => openExplorer(getExplorerLink(this.props.net, t.txid, this.props.explorer))}>
                {t.txid.substring(0,32)}</div><div className="amount">{formatAmount} {t.type}
              </div></li>);
        })}
      </ul>
    </div>;
}

const mapStateToProps = (state) => ({
  address: state.account.address,
  net: state.metadata.network,
  transactions: state.wallet.transactions,
  explorer: state.explorer.selected
});

TransactionHistory = connect(mapStateToProps)(TransactionHistory);

export default TransactionHistory;
