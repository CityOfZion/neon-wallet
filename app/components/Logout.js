import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/index.js';
import { Link } from 'react-router';
import Power from 'react-icons/lib/md/power-settings-new';


let Logout = ({dispatch}) =>
  <div id="logout" onClick={() => dispatch(logout())}>
    <Link to="/"><Power /></Link>
  </div>

  const mapStateToProps = (state) => ({
  });

  Logout = connect(mapStateToProps)(Logout);

  export default Logout;
