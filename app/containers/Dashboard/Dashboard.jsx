// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import TransactionHistory from '../TransactionHistory'
import WalletInfo from '../WalletInfo'

import Loader from '../../components/Loader'

import { log } from '../../util/Logs'

import { MODAL_TYPES } from '../../core/constants'

import FaArrowUpward from 'react-icons/lib/fa/arrow-circle-up'
import FaArrowDownward from 'react-icons/lib/fa/arrow-circle-down'

import styles from './Dashboard.scss'

type Props = {
  net: string,
  address: string,
  showModal: Function,
  showErrorNotification: Function,
  sendTransaction: Function,
  NEO: number,
  GAS: number,
  tokens: Object,
  loaded: boolean,
  loadWalletData: Function,
  explorer: ExplorerType,
  isHardwareLogin: boolean,
}

const REFRESH_INTERVAL_MS = 30000
let walletDataInterval

export default class Dashboard extends Component<Props> {
  componentDidMount () {
    const { loadWalletData, net, address } = this.props
    // only logging public information here
    log(net, 'LOGIN', address, {})
    loadWalletData()
    walletDataInterval = setInterval(loadWalletData, REFRESH_INTERVAL_MS)
  }

  componentWillUnmount () {
    clearInterval(walletDataInterval)
  }

  render () {
    const {
      showModal,
      address,
      NEO,
      GAS,
      tokens,
      showErrorNotification,
      sendTransaction,
      loaded,
      explorer,
      net,
      isHardwareLogin
    } = this.props

    if (!loaded) {
      return <Loader />
    }

    return (
      <div id='dashboard' className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentBox}>
            <div className={styles.walletButtons}>
              <div
                className={classNames(styles.walletButton, styles.sendButton)}
                onClick={() => showModal(MODAL_TYPES.SEND, { NEO, GAS, tokens, showErrorNotification, sendTransaction, explorer, net, address, isHardwareLogin })}>
                <FaArrowUpward className={styles.walletButtonIcon} /><span className={styles.walletButtonText}>Send</span>
              </div>
              <div
                className={styles.walletButton}
                onClick={() => showModal(MODAL_TYPES.RECEIVE, { address, net, explorer })}>
                <FaArrowDownward className={styles.walletButtonIcon} /><span className={styles.walletButtonText}>Receive</span>
              </div>
            </div>
            <WalletInfo />
          </div>
          <div className={classNames(styles.contentBox, styles.transactionHistory)}>
            <TransactionHistory />
          </div>
        </div>
      </div>
    )
  }
}
