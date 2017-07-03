import React from 'react';
import { connect } from 'react-redux';

// import { Link } from 'react-router';

let Balance = ({ coins }) => {
  console.log(coins);
  return <div>{ coins }</div>;
};

const mapStateToProps = (state) => ({
  coins: state.wallet.coins
});

Balance = connect(mapStateToProps)(Balance);

export default Balance;
