import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TopArea from './TopArea';


// import { Link } from 'react-router';

let App = ({ children }) => {
  return <div id="pageWrapper"><TopArea />{ children }</div>;
};

const mapStateToProps = (state) => ({
});

App = connect(mapStateToProps)(App);

export default App;
