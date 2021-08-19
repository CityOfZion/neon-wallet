// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import classNames from 'classnames'

import ReceiveIcon from '../../../assets/icons/receive-tx.svg'
import Button from '../../Button'
import InfoIcon from '../../../assets/icons/info.svg'
import CheckMarkIcon from '../../../assets/icons/confirm.svg'
import ClockIcon from '../../../assets/icons/clock.svg'
import styles from './Transaction.scss'
import { imageMap } from '../../../assets/nep5/png'
import { toBigNumber } from '../../../core/math'

const electron = require('electron').remote

type Props = {
  tx: {
    time: number,
    tokenname: string,
    assetHash: string,
    destTransactionStatus: Number,
    srcTransactionStatus: number,
    amount: string,
  },
}
const TOKEN_MAP = {
  f46719e2d16bf50cddcef9d4bbfece901f73cbb6: 'nNEO',
  '17da3881ab2d050fea414c80b3fa8324d756f60e': 'nNEO',
  '74f2dc36a68fdc4682034178eb2220729231db76': 'CGAS',
  c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b: 'NEO',
  '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7': 'GAS',
}
export default class MigrationTransaction extends React.Component<Props> {
  renderTxDate = (time: ?number) => {
    if (!time) {
      return null
    }

    return (
      <div className={styles.txDateContainer}>
        {moment.unix(time).format('MM/DD/YYYY | HH:mm:ss')}
      </div>
    )
  }

  render = () => {
    const { tx } = this.props

    return (
      <React.Fragment>
        <div className={styles.migrationTxWrapper}>
          <div
            className={classNames([
              styles.transactionContainer,
              styles.migrationTransaction,
              tx.destTransactionStatus === 0 && tx.srcTransactionStatus === 0
                ? ''
                : styles.errorTransaction,
            ])}
          >
            <div className={styles.txLabelContainer}>
              {imageMap[TOKEN_MAP[tx.assetHash]] && (
                <img src={imageMap[TOKEN_MAP[tx.assetHash]]} />
              )}
              {TOKEN_MAP[tx.assetHash]}
            </div>
            <div className={styles.txAmountContainer}>
              {toBigNumber(tx.amount).toString()}
            </div>

            {this.renderTxDate(tx.time)}

            <div className={styles.statusContainer}>
              {tx.destTransactionStatus === 0 &&
              tx.srcTransactionStatus === 0 ? (
                <div className={styles.statusCompleteContainer}>
                  <CheckMarkIcon /> Completed
                </div>
              ) : (
                <div className={styles.statusPendingContainer}>
                  <ClockIcon />Pending{' '}
                </div>
              )}
            </div>
          </div>
          <div
            className={classNames([
              styles.statusProgessBar,
              tx.destTransactionStatus === 0 && tx.srcTransactionStatus === 0
                ? styles.isComplete
                : '',
            ])}
          />
        </div>
      </React.Fragment>
    )
  }

  displayModal = (address: string) => {
    // this.props.showAddContactModal({ address })
  }

  // handleViewTransaction = () => {
  //   const { tx } = this.props

  //   electron.shell.openExternal(
  //     `https://explorer.poly.network/testnet/tx/${tx.txhash}`,
  //   )
  // }

  renderTxDate = (time: ?number) => {
    if (!time) {
      return null
    }

    return (
      <div className={styles.txDateContainer}>
        {moment.unix(time).format('MM/DD/YYYY | HH:mm:ss')}
      </div>
    )
  }
}
