// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import * as Neon from 'neon-js'
import NetworkSwitch from '../NetworkSwitch'
import Page from '../../components/Page'
import { ROUTES } from '../../core/constants'

type Props = {
  address: string,
  neo: number,
  rpx: number,
  net: NetworkType,
  wif: string,
  initiateGetBalance: Function,
  updateRpxBalance: Function,
  sendEvent: Function,
  clearTransactionEvent: Function
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
    const { initiateGetBalance, updateRpxBalance, net, address } = this.props
    updateRpxBalance(0)
    initiateGetBalance(net, address)
    this.refreshTokenBalance(true)
  }

  refreshTokenBalance = (silent: boolean = false) => {
    const { sendEvent, clearTransactionEvent, updateRpxBalance, net, address } = this.props
    const { scriptHash } = this.state

    // TODO: add other check
    if (scriptHash.slice(0, 1) !== '0x' && scriptHash.length !== 42) {
      if (!silent) {
        sendEvent(false, 'Not a valid script hash.')
        setTimeout(() => clearTransactionEvent(), 5000)
      }
      return false
    }
    Neon.getTokenBalance(net, scriptHash.slice(2, scriptHash.length), address).then((balance) => {
      updateRpxBalance(balance)
    }).catch((e) => {
      updateRpxBalance(0)
      sendEvent(false, 'There is no ability to display tokens at that script hash.')
      setTimeout(() => clearTransactionEvent(), 5000)
      return false
    })
  }

  participateInSale = () => {
    const { sendEvent, clearTransactionEvent, net, wif, neo } = this.props
    const { neoToSend, scriptHash } = this.state

    if (!neoToSend || !scriptHash) { return null }

    const account = Neon.getAccountFromWIFKey(wif)
    if (parseFloat(neoToSend) !== parseInt(neoToSend)) {
      sendEvent(false, 'You cannot send fractional Neo to a token sale.')
      setTimeout(() => clearTransactionEvent(), 5000)
      return false
    }
    const toMint = parseInt(neoToSend)
    this.setState({
      neoToSend: ''
    })
    if (toMint > neo) {
      sendEvent(false, 'You do not have enough Neo to send.')
      setTimeout(() => clearTransactionEvent(), 5000)
      return false
    }
    if (scriptHash.slice(0, 1) !== '0x' && scriptHash.length !== 42) {
      sendEvent(false, 'Not a valid script hash.')
      setTimeout(() => clearTransactionEvent(), 5000)
      return false
    }
    const _scriptHash = scriptHash.slice(2, scriptHash.length)
    Neon.getTokenBalance(net, _scriptHash, account.address).then((balance) => {
      sendEvent(true, 'Processing...')
      setTimeout(() => clearTransactionEvent(), 5000)
      Neon.doMintTokens(net, _scriptHash, wif, toMint, 0).then((response) => {
        sendEvent(true, 'Processing...')
        setTimeout(() => clearTransactionEvent(), 5000)
        if (response.result === true) {
          sendEvent(true, 'Sale participation was successful.')
          setTimeout(() => clearTransactionEvent(), 5000)
          return true
        } else {
          sendEvent(false, 'Sale participation failed.')
          setTimeout(() => clearTransactionEvent(), 5000)
          return false
        }
      })
    }).catch((e) => {
      sendEvent(false, 'This script hash cannot mint tokens.')
      setTimeout(() => clearTransactionEvent(), 5000)
      return false
    })
  }

  render () {
    const { neo, rpx } = this.props
    const { neoToSend, scriptHash } = this.state

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
          <button onClick={(this.participateInSale)}>Submit for Sale</button>
          <button onClick={this.refreshTokenBalance}>Refresh Token Balance</button>
        </div>
        <Link to={ROUTES.HOME}><button className='altButton'>Home</button></Link>
      </Page>
    )
  }
}
