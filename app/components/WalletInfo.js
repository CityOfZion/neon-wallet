import React, { Component } from 'react';
import { connect } from 'react-redux';
import MdSync from 'react-icons/lib/md/sync';
import QRCode from 'qrcode';
import { initiateGetBalance } from "../components/NetworkSwitch";

let handleInterval;

class WalletInfo extends Component {

  componentDidMount = () => {
    if (handleInterval !== undefined){
      clearInterval(handleInterval);
    }
    initiateGetBalance(this.props.dispatch, this.props.net, this.props.address);
    QRCode.toCanvas(this.canvas, this.props.address, { version: 5 }, (err) => {
      if (err) console.log(err)
    });
    handleInterval = setInterval(() => initiateGetBalance(this.props.dispatch, this.props.net, this.props.address), 1000);
  }

  render = () => {
    if (this.props.address !== null){
      return (<div id="accountInfo">
        <div className="label">Your Public Neo Address:</div>
        <div className="address">{this.props.address}</div>
        <div className="spacer"></div>
        <div id="balance">
          <div className="split">
            <div className="label">NEO</div>
            <div className="amountBig">{this.props.ans}</div>
          </div>
          <div className="split">
            <div className="label">GAS</div>
            <div className="amountBig">{this.props.anc}</div>
          </div>
          <div className="fiat">US $9344</div>
          <div onClick={() => initiateGetBalance(this.props.dispatch, this.props.net, this.props.address)}>
            <MdSync id="refresh"/>
          </div>
        </div>
        <div className="spacer"></div>
        <div className="qrCode"><canvas id="qrCanvas" ref={(node) => this.canvas = node}></canvas></div>
      </div>);
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  ans: state.wallet.ANS,
  anc: state.wallet.ANC,
  address: state.account.address,
  net: state.wallet.net
});

WalletInfo = connect(mapStateToProps)(WalletInfo);

export default WalletInfo;
