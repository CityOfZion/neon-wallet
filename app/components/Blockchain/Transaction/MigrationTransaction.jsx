// @flow
import React from 'react'
// import type { Node } from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
// import { isEmpty } from 'lodash-es'
import classNames from 'classnames'

import ReceiveIcon from '../../../assets/icons/receive-tx.svg'
// import SendIcon from '../../../assets/icons/send-tx.svg'
// import { TX_TYPES } from '../../../core/constants'
import Button from '../../Button'
// import PendingAbstract from './PendingAbstract'
// import ClaimAbstract from './ClaimAbstract'
// import SendAbstract from './SendAbstract'
// import ReceiveAbstract from './ReceiveAbstract'
import InfoIcon from '../../../assets/icons/info.svg'
// import { openExplorerTx } from '../../../core/explorer'
// import Tooltip from '../../Tooltip'

import styles from './Transaction.scss'
import { imageMap } from '../../../assets/nep5/png'

const electron = require('electron').remote

type Props = {
  tx: {
    timestamp: number,
    tokenname: string,
    txhash: string,
  },
  // tx: TxEntryType,
  // pendingTx: {
  //   asset: {
  //     symbol: string,
  //     image?: string,
  //   },
  //   blocktime: number,
  //   amount: string,
  //   to: string,
  //   confirmations: number,
  // },
  // networkId: string,
  // explorer: ExplorerType,
  // contacts: Object,
  // showAddContactModal: ({ address: string }) => null,
  // address: string,
  // className?: string,
  // isPending?: boolean,
  // chain: string,
}

export default class MigrationTransaction extends React.Component<Props> {
  // static defaultProps = {
  //   tx: {},
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

  render = () => {
    const { tx } = this.props

    return (
      <div
        className={classNames([
          styles.transactionContainer,
          styles.migrationTransaction,
          !tx.tokenname ? styles.errorTransaction : '',
        ])}
      >
        <div className={styles.txTypeIconContainer}>
          <div className={styles.receiveIconContainer}>
            <ReceiveIcon />
          </div>
        </div>
        <div className={styles.txLabelContainer}>
          {tx.tokenname === 'NEP5 NEO' && <img src={imageMap.NEO} />}
          {tx.tokenname || 'N/A'}
        </div>
        {this.renderTxDate(tx.timestamp)}
        <Button
          className={styles.transactionHistoryButton}
          renderIcon={InfoIcon}
          onClick={this.handleViewTransaction}
        >
          <FormattedMessage id="activityViewTx" />
        </Button>
      </div>
    )
  }

  displayModal = (address: string) => {
    // this.props.showAddContactModal({ address })
  }

  handleViewTransaction = () => {
    const { tx } = this.props

    electron.shell.openExternal(
      `https://explorer.poly.network/testnet/tx/${tx.txhash}`,
    )

    // const { txid } = tx
    // openExplorerTx(networkId, explorer, txid, chain)
    // https://explorer.poly.network/testnet/tx/c9e0a814ef14faf1742d049702b85e44b8c85ad0d33263b04692bb237fad0133
  }

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
