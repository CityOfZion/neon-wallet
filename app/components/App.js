import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NetworkSwitch from './NetworkSwitch';

// import { Link } from 'react-router';

let App = ({ children }) => {
  return <div id="pageWrapper">{ children }<NetworkSwitch /></div>;
};

const mapStateToProps = (state) => ({
});

App = connect(mapStateToProps)(App);

export default App;
