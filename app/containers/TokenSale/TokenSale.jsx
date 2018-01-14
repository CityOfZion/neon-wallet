// @flow
import React, { Component } from 'react';

import HomeButtonLink from '../../components/HomeButtonLink';

type Props = {
  NEO: number,
  GAS: number,
  loadWalletData: Function,
  participateInSale: Function,
  refreshTokenBalance: Function
};

type State = {
  scriptHash: string,
  neoToSend: string,
  gasToSend: string
};

export default class TokenSale extends Component<Props, State> {
  state = {
    scriptHash: '',
    neoToSend: '',
    gasToSend: ''
  };

  componentDidMount() {
    const { loadWalletData } = this.props;
    loadWalletData();
  }

  participateInSale = () => {
    const { participateInSale } = this.props;
    const { neoToSend, gasToSend, scriptHash } = this.state;
    const result = participateInSale(neoToSend, gasToSend, scriptHash);
    if (!result) {
      this.setState({
        neoToSend: ''
      });
    }
  };

  render() {
    const { NEO, GAS, refreshTokenBalance } = this.props;
    const { neoToSend, gasToSend, scriptHash } = this.state;
    const refreshTokenBalanceButtonDisabled = !scriptHash;
    const submitSaleButtonDisabled = !neoToSend || !scriptHash;

    return (
      <div id="tokenSale">
        <div className="description">Participate in Token Sale</div>
        <div className="warning">
          <b>WARNING:</b> Be very careful with how you participate in a sale!
          This interface may not work for all sales! Submitting NEO multiple
          times to a sale may result in lost funds or a delayed refund depending
          on the policy of the sale. Some sales also might only accept GAS or
          NEO and not both. Please make sure you are sending the correct assets.
          CoZ is not responsible for any mistakes you make participating in a
          sale. After submitting to a sale, you will need to{' '}
          <b>WAIT SOME TIME</b> for the balance of tokens to refresh. You can
          click "Refresh Token" after 10s if you still do not see anything. It
          is also possible that nodes may not update properly with your token
          balance, so <b>THINK VERY CAREFULLY</b> before resubmitting to a sale.
          Do not click "Submit" twice. CoZ does not endorse any token sale!
        </div>
        <div className="settingsForm">
          <div className="settingsItem">
            <div className="itemTitle">NEO Balance:</div>
            <div>{NEO}</div>
          </div>
          <div className="settingsItem">
            <div className="itemTitle">GAS Balance:</div>
            <div>{GAS}</div>
          </div>
          <div className="settingsItem">
            <div className="itemTitle">Token Balance:</div>
            <div />
          </div>
          <div className="settingsItem">
            <div className="itemTitle">Amount of NEO to Send:</div>
            <input
              type="text"
              className="neoAmount"
              placeholder="e.g., 100"
              value={neoToSend}
              onChange={e => this.setState({ neoToSend: e.target.value })}
            />
          </div>
          <div className="settingsItem">
            <div className="itemTitle">Amount of GAS to Send:</div>
            <input
              type="text"
              className="gasAmount"
              placeholder="e.g., 10.51"
              value={gasToSend}
              onChange={e => this.setState({ gasToSend: e.target.value })}
            />
          </div>
          <Button
            onClick={this.participateInSale}
            disabled={submitSaleButtonDisabled}
          >
            Submit for Sale
          </button>
          <button
            className={refreshTokenBalanceButtonDisabled ? 'disabled' : ''}
            onClick={() => refreshTokenBalance(scriptHash)}
            disabled={refreshTokenBalanceButtonDisabled}
          >
            Refresh Token Balance
          </button>
        </div>
        <HomeButtonLink />
      </div>
    );
  }
}
