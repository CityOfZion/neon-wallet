import React from 'react';
import { connect } from 'react-redux';
import { setNetwork } from '../actions/index.js';
import NetworkSwitch from './NetworkSwitch';
import Balance from './Balance';


let TopArea = ({dispatch, net}) =>

  <div id="topArea">
    <Balance />
    <NetworkSwitch />
  </div>

  const mapStateToProps = (state) => ({
  });

  TopArea = connect(mapStateToProps)(TopArea);

  export default TopArea;
