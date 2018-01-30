// @flow
import React, { Component } from 'react'

import Button from '../../components/Button'
import HomeButtonLink from '../../components/HomeButtonLink'

type Props = {
  NEO: string,
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
    const { NEO, refreshTokenBalance } = this.props
    const { neoToSend, scriptHash } = this.state
    const refreshTokenBalanceButtonDisabled = !scriptHash
    const submitSaleButtonDisabled = !neoToSend || !scriptHash

    return (
      <div id='tokenSale'>
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
            <div>{NEO}</div>
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Token Balance:</div>
            <div />
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
          <Button
            onClick={this.participateInSale}
            disabled={submitSaleButtonDisabled}>Submit for Sale</Button>
          <Button
            onClick={() => refreshTokenBalance(scriptHash)}
            disabled={refreshTokenBalanceButtonDisabled}>Refresh Token Balance</Button>
        </div>
        <HomeButtonLink />
      </div>
    )
  }
}
