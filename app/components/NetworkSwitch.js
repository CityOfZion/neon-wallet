// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { getBalance, getTransactionHistory, getClaimAmounts, getWalletDBHeight, getAPIEndpoint } from 'neon-js'
import { setClaim } from '../modules/claim'
import { setBlockHeight, setNetwork } from '../modules/metadata'
import { setBalance, setTransactionHistory } from '../modules/wallet'
import { version } from '../../package.json'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { NETWORK, ASSETS } from '../core/constants'

export let intervals = {}

// notify user if version is out of date

const checkVersion = (dispatch: DispatchType, net: NetworkType) => {
  const apiEndpoint = getAPIEndpoint(net)
  return axios.get(apiEndpoint + '/v2/version').then((res) => {
    if (res === undefined || res === null) {
      // something went wrong
    } else if (res.data.version !== version && res.data.version !== '0.0.5') {
      dispatch(sendEvent(false, 'Your wallet is out of date! Please download version ' + res.data.version + ' from https://github.com/CityOfZion/neon-wallet/releases'))
      setTimeout(() => dispatch(clearTransactionEvent()), 15000)
    }
  }).catch((e) => {
    // something went wrong, but catch to avoid killing interface
  })
}

// putting this back in wallet, does not belong in neon-js
export const getMarketPriceUSD = (amount: number) => {
  return axios.get('https://bittrex.com/api/v1.1/public/getticker?market=USDT-NEO').then((response) => {
    let lastUSDNEO = Number(response.data.result.Last)
    return ('$' + (lastUSDNEO * amount).toFixed(2).toString())
  })
}

// TODO: this is being imported by Balance.js, maybe refactor to helper file

export const initiateGetBalance = (dispatch: DispatchType, net: NetworkType, address: string) => {
  syncTransactionHistory(dispatch, net, address)
  syncAvailableClaim(dispatch, net, address)
  syncBlockHeight(dispatch, net)
  return getBalance(net, address).then((resultBalance) => {
    return getMarketPriceUSD(resultBalance.NEO.balance).then((resultPrice) => {
      if (resultPrice === undefined || resultPrice === null) {
        dispatch(setBalance(resultBalance.NEO.balance, resultBalance.GAS.balance, '--'))
      } else {
        dispatch(setBalance(resultBalance.NEO.balance, resultBalance.GAS.balance, resultPrice))
      }
      return true
    }).catch((e) => {
      dispatch(setBalance(resultBalance.NEO.balance, resultBalance.GAS.balance, '--'))
    })
  }).catch((result) => {
    // If API dies, still display balance
  })
}

const syncAvailableClaim = (dispatch: DispatchType, net: NetworkType, address: string) => {
  getClaimAmounts(net, address).then((result) => {
    dispatch(setClaim(result.available, result.unavailable))
  })
}

const syncBlockHeight = (dispatch: DispatchType, net: NetworkType) => {
  getWalletDBHeight(net).then((blockHeight) => {
    dispatch(setBlockHeight(blockHeight))
  })
}

export const syncTransactionHistory = (dispatch: DispatchType, net: NetworkType, address: string) => {
  getTransactionHistory(net, address).then((transactions) => {
    let txs = []
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].neo_sent === true) {
        txs = txs.concat([{ type: ASSETS.NEO, amount: transactions[i].NEO, txid: transactions[i].txid, block_index: transactions[i].block_index }])
      }
      if (transactions[i].gas_sent === true) {
        txs = txs.concat([{ type: ASSETS.GAS, amount: transactions[i].GAS, txid: transactions[i].txid, block_index: transactions[i].block_index }])
      }
    }
    dispatch(setTransactionHistory(txs))
  })
}

export const resetBalanceSync = (dispatch: DispatchType, net: NetworkType, address: string) => {
  if (intervals.balance !== undefined) {
    clearInterval(intervals.balance)
  }
  intervals.balance = setInterval(() => {
    initiateGetBalance(dispatch, net, address)
  }, 30000)
}

const toggleNet = (dispatch: DispatchType, net: NetworkType, address: string) => {
  const newNet = net === NETWORK.MAIN ? NETWORK.TEST : NETWORK.MAIN
  dispatch(setNetwork(newNet))
  resetBalanceSync(dispatch, newNet, address)
  if (address !== null) {
    initiateGetBalance(dispatch, newNet, address)
  }
}

type Props = {
  dispatch: DispatchType,
  net: NetworkType,
  address: string
}

class NetworkSwitch extends Component<Props> {
  componentDidMount () {
    const { dispatch, address, net } = this.props
    checkVersion(dispatch, net)
    resetBalanceSync(dispatch, net, address)
  }

  render () {
    const { dispatch, address, net } = this.props
    return (
      <div id='network'>
        <span className='transparent'>Running on</span>
        <span className='netName' onClick={() => toggleNet(dispatch, net, address)}>{net}</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  net: state.metadata.network,
  address: state.account.address
})

export default connect(mapStateToProps)(NetworkSwitch)
