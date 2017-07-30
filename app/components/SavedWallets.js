import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdSync from 'react-icons/lib/md/sync';
import WalletCard from './WalletCard.js'
import { getAccounts } from '../actions/index.js'

// need handlers on these as otherwise the interval is not cleared when switching between accounts

class SavedWallets extends Component {

  constructor(props){
    super(props)
    this.state = {
        wallets: []
    }
  }

  componentDidMount = () => {
    this.props.dispatch(getAccounts());
  }

  componentDidUpdate = () => {
    let wallets = []
    let accounts = this.props.accounts
    let counter = 0;
    for (var p in accounts) {
        if( accounts.hasOwnProperty(p) ) {
          var formattedName = p.split('_').join(' ')
          wallets.push(<WalletCard name={formattedName} wif={accounts[p].key} key={p} index={accounts[p].index} history={this.props.history}/>)
        } 
      } 
    if (this.state.wallets.length != wallets.length){
        this.setState({
            wallets: wallets
        })
    }
  }

  render = () => {
      return (<div id="savedWallets">
        <div className="row">Your Saved Wallets
        <ul>
        {this.state.wallets}
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
