import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import QRCode from 'qrcode';

class Dashboard extends Component {

  componentDidMount = () => {
    QRCode.toCanvas(this.canvas, "AU2CRdjozCr1LKmAAs32BVdyyM7RWcQQTA", { version: 5 }, (err) => {
      if (err) console.log(err)
    });
  }

  render = () =>
    <div id="dashboard">
    <SplitPane className="navSplit" split="horizontal" size="40px" allowResize={false}>
      <div id="navBar"><div id="title">NEO WALLET</div></div>
      <SplitPane split="vertical" size="50%" allowResize={false}>
        <SplitPane className="leftSplit" split="horizontal" size="55px" allowResize={false}>
          <div id="send">
            Send
          </div>
          <div id="accountInfo">
            <div className="label">Your Current Neo Address:</div>
            <div className="address">AU2CRdjozCr1LKmAAs32BVdyyM7RWcQQTA</div>
            <div className="spacer"></div>
            <div id="balance">
              <div className="split">
                <div className="label">NEO</div>
                <div className="amountBig">1936</div>
              </div>
              <div className="split">
                <div className="label">GAS</div>
                <div className="amountBig">0</div>
              </div>
              <div className="fiat">US $9344</div>
            </div>
            <div className="spacer"></div>
            <div className="qrCode"><canvas ref={(node) => this.canvas = node}></canvas></div>
          </div>
        </SplitPane>
        <div id="transactionInfo">
          <div className="columnHeader">Transaction History</div>
          <div className="headerSpacer"></div>
        </div>
      </SplitPane>
    </SplitPane>
    </div>
}

export default Dashboard;
