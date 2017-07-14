import React from 'react';
import { connect } from 'react-redux';
import { setNetwork } from '../actions/index.js';

let netSelect;

const switchNet = (dispatch) => {
  dispatch(setNetwork(netSelect.value))
};

let NetworkSwitch = ({dispatch, net}) =>
  <div id="networkSwitch">
    <select ref={node => {netSelect = node;}} onChange={() => switchNet(dispatch)}>
      {(net === "MainNet") ? <option selected>MainNet</option> : <option>MainNet</option>}
      {(net === "TestNet") ? <option selected>TestNet</option> : <option>TestNet</option>}
    </select>
  </div>

  const mapStateToProps = (state) => ({
    net:state.network.net
  });

  NetworkSwitch = connect(mapStateToProps)(NetworkSwitch);

  export default NetworkSwitch;
