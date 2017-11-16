// @flow
import React, { Component } from 'react'
import NetworkSwitch from '../NetworkSwitch'
import Page from '../../components/Page'
import HomeButtonLink from '../../components/HomeButtonLink'

type Props = {
  address: string,
  neo: number,
  rpx: number,
  net: NetworkType,
  initiateGetBalance: Function,
  updateRpxBalance: Function,
  participateInSale: Function,
  refreshTokenBalance: Function
}

type State = {
  scriptHash: string,
  neoToSend: string
}

export default class TokenSale extends Component<Props, State> {
  state = {
    scriptHash: '',
    neoToSend: ''
  }

  componentDidMount () {
    const { scriptHash } = this.state
    const { initiateGetBalance, refreshTokenBalance, updateRpxBalance, net, address } = this.props
    updateRpxBalance(0)
    initiateGetBalance(net, address)
    refreshTokenBalance(scriptHash, true)
  }

  participateInSale = () => {
    const { participateInSale } = this.props
    const { neoToSend, scriptHash } = this.state
    const result = participateInSale(neoToSend, scriptHash)
    if (!result) {
      this.setState({
        neoToSend: ''
      })
    }
  }

  render () {
    const { neo, rpx, refreshTokenBalance } = this.props
    const { neoToSend, scriptHash } = this.state
    const refreshTokenBalanceButtonDisabled = !scriptHash
    const submitSaleButtonDisabled = !neoToSend || !scriptHash

    return (
      <Page id='tokenSale'>
        <NetworkSwitch />
        <div className='description'>Participate in Token Sale</div>
        <div className='warning'>
          <b>WARNING:</b> Be very careful with how you participate in a sale! This interface may not work for all sales! Submitting NEO multiple times to a sale may result in lost funds
        or a delayed refund depending on the policy of the sale. CoZ is not responsible for any mistakes you make participating in
        a sale. After submitting to a sale, you will need to <b>WAIT SOME TIME</b> for the balance of tokens to refresh. You can click
        "Refresh Token" after 10s if you still do not see anything. It is also possible that nodes may not update properly with your token balance,
        so <b>THINK VERY CAREFULLY</b> before resubmitting to a sale. Do not click "Submit" twice. CoZ does not endorse any token sale!
        </div>
        <div className='settingsForm'>
          <div className='settingsItem'>
            <div className='itemTitle'>NEO Balance:</div>
            <div>{neo}</div>
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Token Balance:</div>
            <div>{rpx}</div>
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Script Hash:</div>
            <input
              autoFocus
              type='text'
              className='scriptHash'
              value={scriptHash}
              onChange={(e) => this.setState({ scriptHash: e.target.value })}
            />
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Amount of NEO to Send:</div>
            <input
              type='text'
              className='neoAmount'
              placeholder='e.g., 100'
              value={neoToSend}
              onChange={(e) => this.setState({ neoToSend: e.target.value })}
            />
          </div>
          <button
            className={submitSaleButtonDisabled ? 'disabled' : ''}
            onClick={this.participateInSale}
            disabled={submitSaleButtonDisabled}>Submit for Sale</button>
          <button
            className={refreshTokenBalanceButtonDisabled ? 'disabled' : ''}
            onClick={() => refreshTokenBalance(scriptHash)}
            disabled={refreshTokenBalanceButtonDisabled}>Refresh Token Balance</button>
        </div>
        <HomeButtonLink />
      </Page>
    )
  }
}
