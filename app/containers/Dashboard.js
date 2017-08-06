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

const logo = require('../images/neon-logo2.png');

const TransactionStatus = ({status, statusMessage}) => {
  let message = null;
  if (status === true){
    message = (<div className="statusMessage success">
    {statusMessage}
    </div>);
  }
  else if (status === false){
    message = <div className="statusMessage fail">{statusMessage}</div>;
  }
  return message;
};

class Dashboard extends Component {

  render = () => {
    let sendPaneClosed, statusPaneSize;
    if (this.props.sendPane == true){
      sendPaneClosed = "0%";
    } else {
      if (this.props.confirmPane == false){
        sendPaneClosed = "21%";
      } else {
        sendPaneClosed = "15%";
      }
    }
    if (this.props.status !== null){
      statusPaneSize = "30px";
    } else {
      statusPaneSize = "0px";
    }

    return (<div id="dashboard">
        <SplitPane className="statusSplit" split="horizontal" size={statusPaneSize} allowResize={false}>
          <TransactionStatus status={this.props.status} statusMessage={this.props.statusMessage}/>
          <SplitPane className="navSplit" split="horizontal" size="40px" allowResize={false}>
            <div id="navBar">
              <div id="title"><img src={logo} width="60px"/></div>
              <div id="version"><span className="grey">Version</span><span className="darker">0.0.3</span></div>
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
        </SplitPane>
        </div>);
  }

}

const mapStateToProps = (state) => ({
  sendPane: state.dashboard.sendPane,
  confirmPane: state.dashboard.confirmPane,
  status: state.transactions.success,
  statusMessage: state.transactions.message,
  blockHeight: state.metadata.blockHeight
});

Dashboard = connect(mapStateToProps)(Dashboard);

export default Dashboard;
