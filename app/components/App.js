import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import { Link } from 'react-router';

let App = ({ children }) => {
  return <div>{ children }</div>;
};

const mapStateToProps = (state) => ({
});

App = connect(mapStateToProps)(App);

export default App;
