// @flow
import React, { Component } from 'react'
import { isNil, noop } from 'lodash'
import classNames from 'classnames'

import TransactionHistory from '../TransactionHistory'
import WalletInfo from '../WalletInfo'

import { MODAL_TYPES } from '../../core/constants'

import Tooltip from '../../components/Tooltip'

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
  loadWalletData: Function
};

const REFRESH_INTERVAL_MS = 30000

export default class Dashboard extends Component<Props> {
  walletDataInterval: ?number;

  componentDidMount () {
    this.addPolling()
  }

  componentWillUnmount () {
    this.removePolling()
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.loadWalletData !== nextProps.loadWalletData) {
      this.removePolling()
      this.addPolling()
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
      sendTransaction
    } = this.props

    // if we get a null for NEO or GAS that means the nodes must be down
    const sendDisabled = isNil(NEO) || isNil(GAS)

    return (
      <div id='dashboard' className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentBox}>
            <div className={styles.walletButtons}>
              <div
                className={classNames(styles.walletButton, styles.sendButton, {
                  [styles.sendDisabled]: sendDisabled
                })}
                onClick={() =>
                  sendDisabled
                    ? noop
                    : showModal(MODAL_TYPES.SEND, {
                      NEO,
                      GAS,
                      tokenBalances,
                      sendTransaction,
                      net,
                      address
                    })
                }
              >
                <Tooltip
                  title='There are problems with the network right now. Sending tokens has been disabled until these issues have been resolved.'
                  disabled={!sendDisabled}
                >
                  <FaArrowUpward className={styles.walletButtonIcon} />
                  <span className={styles.walletButtonText}>Send</span>
                </Tooltip>
              </div>
              <div
                className={styles.walletButton}
                onClick={() => showModal(MODAL_TYPES.RECEIVE, { address })}
              >
                <FaArrowDownward className={styles.walletButtonIcon} />
                <span className={styles.walletButtonText}>Receive</span>
              </div>
            </div>
            <WalletInfo {...this.props} />
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

  addPolling = () => {
    this.walletDataInterval = setInterval(
      this.props.loadWalletData,
      REFRESH_INTERVAL_MS
    )
  };

  removePolling = () => {
    if (this.walletDataInterval) {
      clearInterval(this.walletDataInterval)
    }
  };
}
