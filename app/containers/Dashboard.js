import React, { Component } from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import FaArrowUpward from 'react-icons/lib/fa/arrow-circle-up';
import { NetworkSwitch } from '../components/NetworkSwitch';
import WalletInfo from '../components/WalletInfo';
import TransactionHistory from '../components/TransactionHistory';
import Logout from '../components/Logout';
import Send from '../components/Send';
import { togglePane } from '../actions/index.js';


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
    // TODO: import this from SASS... (default-button color)
    const sendStyle = !this.props.sendPane ? {backgroundColor:"#4D933B", color:"#fff"} : {};

    return (<div id="dashboard">
        <SplitPane className="statusSplit" split="horizontal" size={statusPaneSize} allowResize={false}>
          <TransactionStatus status={this.props.status} statusMessage={this.props.statusMessage}/>
          <SplitPane className="navSplit" split="horizontal" size="40px" allowResize={false}>
            <div id="navBar">
              <div id="title">Neon</div>
              <div id="version">Version 0.0.1</div>
              <NetworkSwitch />
              <Logout />
            </div>
            <SplitPane split="vertical" size="50%" allowResize={false}>
              <SplitPane className="leftSplit" split="horizontal" size="55px" allowResize={false}>
                <div id="send" onClick={() => this.props.dispatch(togglePane("sendPane"))} style={sendStyle}>
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
  status: state.transactionState.success,
  statusMessage: state.transactionState.message
});

Dashboard = connect(mapStateToProps)(Dashboard);

export default Dashboard;
