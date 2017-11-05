// @flow
import React, { Component } from 'react'
import { NETWORK } from '../../core/constants'
import styles from './NetworkSwitch.scss'
import classNames from 'classnames'

export let intervals = {}

type Props = {
  net: NetworkType,
  address: string,
  setNetwork: Function,
  initiateGetBalance: Function
}

export default class NetworkSwitch extends Component<Props> {
  componentDidMount () {
    const { address, net } = this.props
    this.resetBalanceSync(net, address)
  }

  resetBalanceSync = (net: NetworkType, address: string) => {
    const { initiateGetBalance } = this.props
    if (intervals.balance !== undefined) {
      clearInterval(intervals.balance)
    }
    intervals.balance = setInterval(() => {
      initiateGetBalance(net, address)
    }, 30000)
  }

  toggleNet = (net: NetworkType, address: string) => {
    const { setNetwork, initiateGetBalance } = this.props
    const newNet = net === NETWORK.MAIN ? NETWORK.TEST : NETWORK.MAIN
    setNetwork(newNet)
    this.resetBalanceSync(newNet, address)
    if (address !== null) {
      initiateGetBalance(newNet, address)
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
