import React from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';

// import { Link } from 'react-router';

const StatusMessage = ({status, statusMessage}) => {
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

let App = ({ children, status, statusMessage }) => {
  let statusPaneSize;
  if (status !== null){
    statusPaneSize = "30px";
  } else {
    statusPaneSize = "0px";
  }
  return (<div id="pageWrapper">
  <SplitPane className="statusSplit" split="horizontal" size={statusPaneSize} allowResize={false}>
    <StatusMessage status={status} statusMessage={statusMessage}/>
    <div>{ children }</div>
  </SplitPane>
  </div>);
};

const mapStateToProps = (state) => ({
  status: state.transactions.success,
  statusMessage: state.transactions.message,
});

App = connect(mapStateToProps)(App);

export default App;
