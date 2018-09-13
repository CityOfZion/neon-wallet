// @flow
import React from 'react'
import classNames from 'classnames'
import moment from 'moment'

import { openExplorerTx } from '../../../core/explorer'
import styles from './Transaction.scss'
import { ASSETS } from '../../../core/constants'
import { isZero } from '../../../core/math'
import { formatBalance } from '../../../core/formatters'
import ClaimIcon from '../../../assets/icons/claim.svg'

type Props = {
  className?: string,
  tx: Object,
  networkId: string,
  explorer: ExplorerType
}

export default class Transaction extends React.Component<Props> {
  render = () => {
    const { tx, className } = this.props
    const { txid, type, time } = tx

    return (
      <div className={styles.transactionContainer}>
        <div className={styles.txTypeIconContainer}>
          {this.renderTxTypeIcon(type, tx)}
        </div>
        <div className={styles.txDateContainer}>
          {moment.unix(time).format('MM/DD/YYYY')}
        </div>
        <div className={styles.txLabelContainer}>
          {this.renderTxTypeLabel(type, tx)}
        </div>
        <span
          className={classNames(styles.transaction, className)}
          onClick={this.handleClick}
        >
          {txid.substring(0, 32)}
        </span>
        {this.renderAmounts(tx)}
      </div>
    )
  }

  handleClick = () => {
    const { networkId, explorer, tx } = this.props
    const { txid } = tx
    openExplorerTx(networkId, explorer, txid)
  }

  renderAmounts(tx: Object) {
    const forceRenderNEO = !isZero(tx[ASSETS.NEO]) || isZero(tx[ASSETS.GAS])

    return (
      <div className={styles.amounts}>
        {this.renderAmount(tx, ASSETS.NEO, forceRenderNEO)}{' '}
        {this.renderAmount(tx, ASSETS.GAS)}
      </div>
    )
  }

  renderTxTypeIcon = (type: string, tx: Object) => {
    switch (type) {
      case 'ClaimTransaction':
        return (
          <div className={styles.claimIconContainer}>
            <ClaimIcon />
          </div>
        )
      case 'ContractTransaction':
        return null
      case 'InvocationTransaction':
        return null
      default:
        return null
    }
  }

  renderTxTypeLabel = (type: string, tx: Object) => {
    switch (type) {
      case 'ClaimTransaction':
        return <span> GAS Claim </span>
      case 'ContractTransaction':
        return <span> Transaction </span>
      case 'InvocationTransaction':
        return (
          <span className={styles.invocationTransaction}>
            Invocation Transaction
          </span>
        )
      default:
        return null
    }
  }

  renderAmount(tx: Object, symbol: SymbolType, forceRender: boolean = false) {
    const amount = tx[symbol]

    if (forceRender || !isZero(amount)) {
      return (
        <div className={classNames(styles.amount, `amount${symbol}`)}>
          {formatBalance(symbol, amount)} {symbol}
        </div>
      )
    }
  }
}
