// @flow
import React from 'react'
import classNames from 'classnames'

import { openExplorerTx } from '../../../core/explorer'
import styles from './Transaction.scss'

type Props = {
  className?: string,
  txid: string,
  net: NetworkType,
  explorer: ExplorerType
}

export default class Transaction extends React.Component<Props> {
  render = () => {
    const { txid, className } = this.props

    return (
      <span className={classNames(styles.transaction, className)} onClick={this.handleClick}>
        {txid.substring(0, 32)}
      </span>
    )
  }

  handleClick = () => {
    const { net, explorer, txid } = this.props
    openExplorerTx(net, explorer, txid)
  }
}
