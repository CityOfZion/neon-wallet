// @flow
import React from 'react'
import classNames from 'classnames'

import { openExplorerTx } from '../../../core/explorer'
import styles from './Transaction.scss'

type Props = {
  className?: string,
  txid: string,
  networkId: string,
  explorer: ExplorerType
}

export default class Transaction extends React.Component<Props> {
  handleClick: Function

  constructor (props: Props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    const { txid, className } = this.props

    return (
      <span className={classNames(styles.transaction, className)} onClick={this.handleClick}>
        { txid.substring(0, 32) }
      </span>
    )
  }

  handleClick () {
    const { networkId, explorer, txid } = this.props
    openExplorerTx(networkId, explorer, txid)
  }
}
