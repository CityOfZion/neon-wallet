// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import { NETWORK } from '../../core/constants'

import styles from './NetworkSwitch.scss'

export let intervals = {}

type Props = {
  net: NetworkType,
  address: string,
  setNetwork: Function,
  loadWalletData: Function
}

export default class NetworkSwitch extends Component<Props> {
  componentDidMount () {
    const { address, net } = this.props
    this.resetBalanceSync(net, address)
  }

  resetBalanceSync = (net: NetworkType, address: string) => {
    const { loadWalletData } = this.props
    if (intervals.balance !== undefined) {
      clearInterval(intervals.balance)
    }
    intervals.balance = setInterval(() => {
      loadWalletData(net, address)
    }, 30000)
  }

  toggleNet = (net: NetworkType, address: string) => {
    const { setNetwork, loadWalletData } = this.props
    const newNet = net === NETWORK.MAIN ? NETWORK.TEST : NETWORK.MAIN
    setNetwork(newNet)
    this.resetBalanceSync(newNet, address)
    if (address !== null) {
      loadWalletData(newNet, address)
    }
  }

  render () {
    const { address, net } = this.props
    return (
      <div id='network' className={styles.container}>
        <span className={styles.label}>Running on</span>
        <span className={classNames('netName', styles.netName)} onClick={() => this.toggleNet(net, address)}>{net}</span>
      </div>
    )
  }
}
