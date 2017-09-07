import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import FaArrowUpward from 'react-icons/lib/fa/arrow-circle-up';
import { NetworkSwitch } from '../components/NetworkSwitch';
import WalletInfo from '../components/WalletInfo';
import TransactionHistory from '../components/TransactionHistory';
import Logout from '../components/Logout';
import Send from '../components/Send';
import { togglePane } from '../modules/dashboard';
import { version } from '../../package.json'
import { log } from '../util/Logs';

const logo = require('../images/neon-logo2.png');

class Dashboard extends Component {

  componentDidMount = () => {
    // only logging public information here
    log(this.props.net, "LOGIN", this.props.address, {});
  }

  render = () => {
    let sendPaneClosed;
    if (this.props.sendPane == true){
      sendPaneClosed = "0%";
    } else {
      if (this.props.confirmPane == false){
        sendPaneClosed = "21%";
      } else {
        sendPaneClosed = "15%";
      }
    }

    return (<div id="dashboard">
          <SplitPane className="navSplit" split="horizontal" size="40px" allowResize={false}>
            <div id="navBar">
              <div id="title"><img src={logo} width="60px"/></div>
              <div id="version"><span className="grey">Version</span><span className="darker">{version}</span></div>
              <div id="height"><span className="grey">Block</span><span className="darker">{this.props.blockHeight}</span></div>
              <NetworkSwitch />
              <Logout />
            </div>
            <SplitPane split="vertical" size="50%" allowResize={false}>
              <SplitPane className="leftSplit" split="horizontal" size="55px" allowResize={false}>
                <div id="send" onClick={() => this.props.dispatch(togglePane("sendPane"))}>
                  <FaArrowUpward id="upArrow" /> <span>Send</span>
                </div>
                <SplitPane className="sendSplit" split="horizontal" size={sendPaneClosed} allowResize={false}>
                  <Send />
                  <WalletInfo />
                </SplitPane>
              </SplitPane>
              <TransactionHistory />
            </SplitPane>
          </SplitPane>
        </div>);
  }

}

const mapStateToProps = (state) => ({
  sendPane: state.dashboard.sendPane,
  confirmPane: state.dashboard.confirmPane,
  blockHeight: state.metadata.blockHeight,
  net: state.metadata.network,
  address: state.account.address
});

Dashboard = connect(mapStateToProps)(Dashboard);

export default Dashboard;
