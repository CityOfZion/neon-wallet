import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdSync from 'react-icons/lib/md/sync';

// need handlers on these as otherwise the interval is not cleared when switching between accounts

class WalletCard extends Component {

  componentDidMount = () => {
  }

  componentDidUpdate = () => {

  }

  render = () => {
      return (<div>
        <li><div className="walletCard">{this.props.key}</div></li>
      </div>);
  }
}

const mapStateToProps = (state) => ({
});

WalletCard = connect(mapStateToProps)(WalletCard);

export default WalletCard;
