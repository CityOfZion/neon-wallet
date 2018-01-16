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
import FaRocketShip from 'react-icons/lib/fa/rocket'

import styles from './Dashboard.scss'

type Props = {
  net: string,
  address: string,
  showModal: Function,
  showErrorNotification: Function,
  sendTransaction: Function,
  NEO: string,
  GAS: string,
  tokenBalances: Array<TokenBalanceType>,
  loaded: boolean,
  loadWalletData: Function,
  oldParticipateInSale: Function,
  participateInSale: Function,
  allTokens: Array<TokenItemType>,
  setUserGeneratedTokens: Function,
  networks: Array<NetworkItemType>
}

const REFRESH_INTERVAL_MS = 30000
let walletDataInterval

export default class Dashboard extends Component<Props> {
  componentDidMount() {
    const { loadWalletData, net, address } = this.props
    // only logging public information here
    log(net, 'LOGIN', address, {})
    loadWalletData()
    walletDataInterval = setInterval(loadWalletData, REFRESH_INTERVAL_MS)
  }

  componentWillUnmount() {
    clearInterval(walletDataInterval)
  }

  render() {
    const {
      showModal,
      net,
      address,
      NEO,
      GAS,
      tokenBalances,
      showErrorNotification,
      sendTransaction,
      loaded,
      participateInSale,
      oldParticipateInSale,
      loadWalletData,
      networks,
      allTokens,
      setUserGeneratedTokens
    } = this.props

    if (!loaded) {
      return <Loader />
    }

    return (
      <div id="dashboard" className={styles.container}>
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
                    showErrorNotification,
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
              <div
                className={(styles.walletButton, styles.icoButton)}
                onClick={() =>
                  showModal(MODAL_TYPES.ICO, {
                    NEO,
                    GAS,
                    loadWalletData,
                    oldParticipateInSale,
                    participateInSale,
                    tokenBalances,
                    showModal,
                    networks,
                    allTokens,
                    setUserGeneratedTokens,
                    showErrorNotification
                  })
                }
              >
                <FaArrowUpward className={styles.walletButtonIcon} />
                <span className={styles.walletButtonText}>Token Sale</span>
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
