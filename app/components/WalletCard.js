import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdSync from 'react-icons/lib/md/sync';
import { login } from '../actions/index.js';

// need handlers on these as otherwise the interval is not cleared when switching between accounts

class WalletCard extends Component {

  onWalletClick = () => {
    this.props.dispatch(login(this.props.wif))
  }

  render = () => {
    return (
        <li><div className="walletCard" onClick={this.onWalletClick}>{this.props.name}</div></li>
    );
  }
}

const mapStateToProps = (state) => ({
});

WalletCard = connect(mapStateToProps)(WalletCard);

export default WalletCard;
