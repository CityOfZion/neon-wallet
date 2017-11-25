// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import FaArrowUpward from 'react-icons/lib/fa/arrow-circle-up'
import FaArrowDownward from 'react-icons/lib/fa/arrow-circle-down'
import NetworkSwitch from '../NetworkSwitch'
import PriceDisplay from '../../components/PriceDisplay'
import WalletInfo from '../WalletInfo'
import TransactionHistory from '../TransactionHistory'
import Logout from '../../components/Logout'
import { version } from '../../../package.json'
import { log } from '../../util/Logs'
import styles from './Dashboard.scss'
import { MODAL_TYPES } from '../../core/constants'

const logo = require('../../images/neon-logo2.png')

type Props = {
  blockHeight: number,
  net: string,
  address: string,
  neoPrice: number,
  gasPrice: number,
  logout: Function,
  showModal: Function,
  showErrorNotification: Function,
  sendTransaction: Function,
  neo: number,
  gas: number,
  tokens: Array<TokenType>
}

export default class Dashboard extends Component<Props> {
  componentDidMount () {
    const { net, address } = this.props
    // only logging public information here
    log(net, 'LOGIN', address, {})
  }

  render () {
    const {
      blockHeight,
      logout,
      neoPrice,
      gasPrice,
      showModal,
      address,
      neo,
      gas,
      tokens,
      showErrorNotification,
      sendTransaction
    } = this.props

    return (
      <div id='dashboard' className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <img src={logo} width='60px' />
          </div>
          <div className={styles.headerInfo}>
            <PriceDisplay neoPrice={neoPrice} gasPrice={gasPrice} />
            <div className={styles.version}>
              <span className={styles.grey}>Version</span>
              <span className={styles.darker}>{version}</span>
            </div>
            <div className={styles.height}>
              <span className={styles.grey}>Block</span>
              <span className={styles.darker}>{blockHeight}</span>
            </div>
            <NetworkSwitch />
            <Logout logout={logout} />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentBox}>
            <div className={styles.walletButtons}>
              <div
                className={classNames(styles.walletButton, styles.sendButton)}
                onClick={() => showModal(MODAL_TYPES.SEND, { neo, gas, tokens, showErrorNotification, sendTransaction })}>
                <FaArrowUpward className={styles.walletButtonIcon} /><span className={styles.walletButtonText}>Send</span>
              </div>
              <div
                className={styles.walletButton}
                onClick={() => showModal(MODAL_TYPES.RECEIVE, { address })}>
                <FaArrowDownward className={styles.walletButtonIcon} /><span className={styles.walletButtonText}>Receive</span>
              </div>
            </div>
            <WalletInfo />
          </div>
          <div className={styles.contentBox}>
            <TransactionHistory />
          </div>
        </div>
      </div>
    )
  }
}
