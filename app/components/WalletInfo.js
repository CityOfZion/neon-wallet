import React from 'react';

let WalletInfo = ({wif, address}) => {
  if (wif !== null){
    return (<div id="walletInfo">
        <div className="margin10">
          <span className="label">Private Key (WIF):</span><span className="key">{ wif }</span>
        </div>
        <div className="margin10">
          <span className="label">Public Address:</span><span className="key">{ address }</span>
        </div>
      </div>);
  } else {
    return null;
  }
}

export default WalletInfo;
