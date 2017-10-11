// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as Neon from 'neon-js'
import { initiateGetBalance, NetworkSwitch } from '../components/NetworkSwitch'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { updateRpxBalance } from '../modules/rpx'

const logo = require('../images/neon-logo2.png')

const refreshTokenBalance = (dispatch: Function, net: string, address: string, silent: boolean = false, scriptHashElement: ?HTMLInputElement) => {
  if (!scriptHashElement) { return null }
  // TODO: add other check
  if (scriptHashElement.value.slice(0, 1) !== '0x' && scriptHashElement.value.length !== 42) {
    if (!silent) {
      dispatch(sendEvent(false, 'Not a valid script hash.'))
      setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    }
    return false
  }
  Neon.getTokenBalance(net, scriptHashElement.value.slice(2, scriptHashElement.value.length), address).then((balance) => {
    dispatch(updateRpxBalance(balance))
  }).catch((e) => {
    dispatch(updateRpxBalance(0))
    dispatch(sendEvent(false, 'There is no ability to display tokens at that script hash.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  })
}

const participateInSale = (dispatch: Function, net: string, wif: string, totalNeo: number, neoToSend: ?HTMLInputElement, scriptHashElement: ?HTMLInputElement) => {
  if (!neoToSend || !scriptHashElement) { return null }

  const account = Neon.getAccountFromWIFKey(wif)
  if (parseFloat(neoToSend.value) !== parseInt(neoToSend.value)) {
    dispatch(sendEvent(false, 'You cannot send fractional Neo to a token sale.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  const toMint = parseInt(neoToSend.value)
  neoToSend.value = ''
  if (toMint > totalNeo) {
    dispatch(sendEvent(false, 'You do not have enough Neo to send.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  let scriptHash
  if (scriptHashElement.value.slice(0, 1) !== '0x' && scriptHashElement.value.length !== 42) {
    dispatch(sendEvent(false, 'Not a valid script hash.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
    return false
  }
  scriptHash = scriptHashElement.value.slice(2, scriptHashElement.value.length)
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

type Props = {
  dispatch: DispatchType,
  address: WalletAddressType,
  neo: NeoAssetType,
  rpx: number,
  net: NeoNetworkType,
  wif: WIFType
}

let TokenSale = class TokenSale extends Component<Props> {
  scriptHashElement: ?HTMLInputElement
  neoToSend: ?HTMLInputElement

  componentDidMount () {
    const { dispatch, net, address } = this.props
    dispatch(updateRpxBalance(0))
    initiateGetBalance(dispatch, net, address)
    refreshTokenBalance(dispatch, net, address, true, this.scriptHashElement)
  }

  render () {
    const { dispatch, neo, rpx, net, wif, address } = this.props
    const neoToSend = this.neoToSend
    const scriptHashElement = this.scriptHashElement
    return (
      <div id='tokenSale'>
        <div className='logo'><img src={logo} width='60px' /></div>
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
            <input type='text' className='scriptHash' ref={(node) => { this.scriptHashElement = node }} />
          </div>
          <div className='settingsItem'>
            <div className='itemTitle'>Amount of NEO to Send:</div>
            <input type='text' className='neoAmount' placeholder='e.g., 100' ref={(node) => { this.neoToSend = node }} />
          </div>
          <button onClick={() => participateInSale(dispatch, net, wif, neo, neoToSend, scriptHashElement)}>Submit for Sale</button>
          <button onClick={() => refreshTokenBalance(dispatch, net, address, false, scriptHashElement)}>Refresh Token Balance</button>
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
