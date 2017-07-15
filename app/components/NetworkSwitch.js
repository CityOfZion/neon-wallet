import React from 'react';
import { connect } from 'react-redux';
import { setNetwork } from '../actions/index.js';

let netSelect;

const switchNet = (dispatch) => {
  if (netSelect.checked == true){ 
    dispatch(setNetwork("MainNet"))
  }
  else {
    dispatch(setNetwork("TestNet"))
  }
};

let NetworkSwitch = ({dispatch, net}) =>

  //offState = net === "MainNet" ? "MainNet" : "TestNet";
// <div>
//   <div id="networkSwitch">
//     <select ref={node => {netSelect = node;}} onChange={() => switchNet(dispatch)}>
//       {(net === "MainNet") ? <option selected>MainNet</option> : <option>MainNet</option>}
//       {(net === "TestNet") ? <option selected>TestNet</option> : <option>TestNet</option>}
//     </select>
//   </div>

  <div id="networkSwitch">
    <input id="a" type="checkbox" ref={node => {netSelect = node;}} onChange={() => switchNet(dispatch)} />
    <label htmlFor="a">
      {(net === "MainNet") ? <div className="can-toggle__switch" data-checked={net} data-unchecked="TestNet" /> : <div className="can-toggle__switch" data-checked="MainNet" data-unchecked={net} />}
    </label>
  </div>

  const mapStateToProps = (state) => ({
    net:state.network.net
  });

  NetworkSwitch = connect(mapStateToProps)(NetworkSwitch);

  export default NetworkSwitch;
