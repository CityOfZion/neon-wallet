import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdSync from 'react-icons/lib/md/sync';
import WalletCard from './WalletCard.js'
import { getAccounts } from '../actions/index.js'

// need handlers on these as otherwise the interval is not cleared when switching between accounts

class SavedWallets extends Component {

  componentDidMount = () => {
    this.props.dispatch(getAccounts());
  }

  componentDidUpdate = () => {
    let accounts = this.props.accounts
    console.log("accounts: "+accounts);
  }

  render = () => {
      return (<div id="savedWallets">
        <div className="row">Your Saved Wallets
        <ul>
        </ul>
        </div>
      </div>);
  }
}

const mapStateToProps = (state) => ({
    accounts: state.storage.accounts
});

SavedWallets = connect(mapStateToProps)(SavedWallets);

export default SavedWallets;
