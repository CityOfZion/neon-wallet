// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as Neon from 'neon-js'
import NetworkSwitch, { initiateGetBalance } from '../components/NetworkSwitch'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { updateRpxBalance } from '../modules/rpx'
import Logo from './Logo'

type Props = {
  dispatch: DispatchType,
  address: string,
  neo: number,
  rpx: number,
  net: NetworkType,
  wif: string
}

let TokenSale = class TokenSale extends Component<Props> {
  scriptHashInput: ?HTMLInputElement
  neoToSendInput: ?HTMLInputElement

  componentDidMount () {
    const { dispatch, net, address } = this.props
    dispatch(updateRpxBalance(0))
    initiateGetBalance(dispatch, net, address)
    this.refreshTokenBalance(true)
  }

  refreshTokenBalance = (silent: boolean = false) => {
    const { dispatch, net, address } = this.props
    const scriptHashInputValue = this.scriptHashInput && this.scriptHashInput.value
    if (!scriptHashInputValue) { return null }

    // TODO: add other check
    if (scriptHashInputValue.slice(0, 1) !== '0x' && scriptHashInputValue.length !== 42) {
      if (!silent) {
        dispatch(sendEvent(false, 'Not a valid script hash.'))
        setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      }
      return false
    }
    Neon.getTokenBalance(net, scriptHashInputValue.slice(2, scriptHashInputValue.length), address).then((balance) => {
      dispatch(updateRpxBalance(balance))
    }).catch((e) => {
      dispatch(updateRpxBalance(0))
      dispatch(sendEvent(false, 'There is no ability to display tokens at that script hash.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    })
  }

  participateInSale = () => {
    const { dispatch, net, wif, neo } = this.props
    const neoToSendInputValue = this.neoToSendInput && this.neoToSendInput.value
    const scriptHashInputValue = this.scriptHashInput && this.scriptHashInput.value

    if (!neoToSendInputValue || !scriptHashInputValue) { return null }

    const account = Neon.getAccountFromWIFKey(wif)
    if (parseFloat(neoToSendInputValue) !== parseInt(neoToSendInputValue)) {
      dispatch(sendEvent(false, 'You cannot send fractional Neo to a token sale.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    }
    const toMint = parseInt(neoToSendInputValue)
    if (this.neoToSendInput) {
      this.neoToSendInput.value = ''
    }
    if (toMint > neo) {
      dispatch(sendEvent(false, 'You do not have enough Neo to send.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    }
    let scriptHash
    if (scriptHashInputValue.slice(0, 1) !== '0x' && scriptHashInputValue.length !== 42) {
      dispatch(sendEvent(false, 'Not a valid script hash.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    }
    scriptHash = scriptHashInputValue.slice(2, scriptHashInputValue.length)
    Neon.getTokenBalance(net, scriptHash, account.address).then((balance) => {
      dispatch(sendEvent(true, 'Processing...'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      Neon.doMintTokens(net, scriptHash, wif, toMint, 0).then((response) => {
        dispatch(sendEvent(true, 'Processing...'))
        setTimeout(() => dispatch(clearTransactionEvent()), 5000)
        if (response.result === true) {
          dispatch(sendEvent(true, 'Sale participation was successful.'))
          setTimeout(() => dispatch(clearTransactionEvent()), 5000)
          return true
        } else {
          dispatch(sendEvent(false, 'Sale participation failed.'))
          setTimeout(() => dispatch(clearTransactionEvent()), 5000)
          return false
        }
      })
    }).catch((e) => {
      dispatch(sendEvent(false, 'This script hash cannot mint tokens.'))
      console.log(e)
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
      return false
    })
  }

  render () {
    const { neo, rpx } = this.props

    return (
      <div id='tokenSale'>
        <Logo />
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
            <input type='text' className='scriptHash' ref={(node) => { this.scriptHashInput = node }} />
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Amount of NEO to Send:</div>
            <input type='text' className='neoAmount' placeholder='e.g., 100' ref={(node) => { this.neoToSendInput = node }} />
          </div>
          <button onClick={(this.participateInSale)}>Submit for Sale</button>
          <button onClick={this.refreshTokenBalance}>Refresh Token Balance</button>
        </div>
        <Link to='/'><button className='altButton'>Home</button></Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  explorer: state.metadata.blockExplorer,
  wif: state.account.wif,
  neo: state.wallet.Neo,
  net: state.metadata.network,
  address: state.account.address,
  wallets: state.account.accountKeys,
  rpx: state.rpx.RPX
})

TokenSale = connect(mapStateToProps)(TokenSale)

export default TokenSale
