import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import MdSync from 'react-icons/lib/md/sync';
import { login } from '../actions/index.js';
import {withRouter} from "react-router-dom";

// need handlers on these as otherwise the interval is not cleared when switching between accounts

class WalletCard extends Component {

  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
     super(props, context);
     this.onWalletClick = this.onWalletClick.bind(this)
  }

  onWalletClick = () => {
    this.props.dispatch(login(this.props.wif))
    this.props.history.push("/dashboard");
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
