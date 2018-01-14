// @flow
import React, { Component } from 'react'
import { api } from 'neon-js'

import { asyncWrap } from '../../core/asyncHelper'

import HomeButtonLink from '../../components/HomeButtonLink'

type Props = {
  NEO: number,
  GAS: number,
  saleBalance: number,
  loadWalletData: Function,
  participateInSale: Function,
  updateSaleBalance: Function
}

type State = {
  scriptHash: string,
  neoToSend: string,
  gasToSend: string
}

export default class TokenSale extends Component<Props, State> {
  state = {
    scriptHash: '',
    neoToSend: '0',
    gasToSend: '0'
  }

  componentDidMount() {
    const { loadWalletData } = this.props
    loadWalletData()
  }

  participateInSale = () => {
    const { participateInSale } = this.props
    const { neoToSend, gasToSend, scriptHash } = this.state
    const result = participateInSale(neoToSend, gasToSend, scriptHash)
    if (!result) {
      this.setState({
        neoToSend: ''
      })
    }
  }

  updateSaleBalance = () => {
    const { updateSaleBalance } = this.props
    const { scriptHash } = this.state
    updateSaleBalance(scriptHash)
  }

  render() {
    const { NEO, GAS, saleBalance } = this.props
    const { neoToSend, gasToSend, scriptHash } = this.state
    const submitSaleButtonDisabled =
      (!neoToSend && !gasToSend) ||
      (scriptHash.slice(0, 1) !== '0x' &&
        scriptHash.length !== 42 &&
        scriptHash.length !== 40)
    const updateSaleButtonDisabled =
      scriptHash.slice(0, 1) !== '0x' &&
      scriptHash.length !== 42 &&
      scriptHash.length !== 40

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
            <div>{saleBalance}</div>
            <div />
          </div>
          <div className="settingsItem">
            <div className="itemTitle">Script Hash to Send Assets:</div>
            <input
              type="text"
              className="saleScriptHash"
              placeholder="e.g., 100"
              value={scriptHash}
              onChange={e => this.setState({ scriptHash: e.target.value })}
            />
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
          <button
            onClick={this.participateInSale}
            disabled={submitSaleButtonDisabled}
          >
            Submit for Sale
          </button>
          <button
            onClick={this.updateSaleBalance}
            disabled={updateSaleButtonDisabled}
          >
            Click to See Token Balance for this Script Hash
          </button>
        </div>
        <HomeButtonLink />
      </div>
    )
  }
}
