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
  sendTransaction: Function,
  NEO: string,
  GAS: string,
  tokenBalances: Array<TokenBalanceType>,
  loaded: boolean,
  networkId: string,
  loadWalletData: Function,
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

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.networkId !== nextProps.networkId) {
      this.props.loadWalletData()
    }
  }

  render () {
    const {
      showModal,
      net,
      address,
      NEO,
      GAS,
      tokenBalances,
      sendTransaction,
      loaded
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
                onClick={() =>
                  showModal(MODAL_TYPES.SEND, {
                    NEO,
                    GAS,
                    tokenBalances,
                    sendTransaction,
                    net,
                    address
                  })
                }
              >
                <FaArrowUpward className={styles.walletButtonIcon} />
                <span className={styles.walletButtonText}>Send</span>
              </div>
              <div
                className={styles.walletButton}
                onClick={() => showModal(MODAL_TYPES.RECEIVE, { address })}
              >
                <FaArrowDownward className={styles.walletButtonIcon} />
                <span className={styles.walletButtonText}>Receive</span>
              </div>
            </div>
            <WalletInfo />
          </div>
          <div
            className={classNames(styles.contentBox, styles.transactionHistory)}
          >
            <TransactionHistory />
          </div>
        </div>
      </div>
    )
  }
}
