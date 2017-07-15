import React from 'react';
import { connect } from 'react-redux';
import { setNetwork } from '../actions/index.js';
import { getBalance } from '../wallet/api.js';
import { setBalance } from '../actions/index.js';

let netSelect;

const switchNet = (dispatch) => {
  netSelect.checked == true ? dispatch(setNetwork("MainNet")) : dispatch(setNetwork("TestNet"));
};

let NetworkSwitch = ({dispatch, net}) =>

  <div id="networkSwitch">
    <input id="a" type="checkbox" ref={node => {netSelect = node;}} onChange={() => switchNet(dispatch)} />
    <label htmlFor="a">
      {(net === "MainNet") ? <div className="can-toggle__switch" data-checked={net} data-unchecked="TestNet" /> : <div className="can-toggle__switch" data-checked="MainNet" data-unchecked={net} />}
    </label>
  </div>

  const mapStateToProps = (state) => ({
    net:state.wallet.net,
    address:state.account.address
  });

  NetworkSwitch = connect(mapStateToProps)(NetworkSwitch);

  export { NetworkSwitch, initiateGetBalance };
