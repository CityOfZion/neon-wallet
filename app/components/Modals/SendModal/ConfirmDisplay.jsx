// @flow
import React from 'react'
import Button from '../../Button'

import { formatBalance } from '../../../core/formatters'
import { openExplorerAddress } from '../../../core/explorer'

import styles from './SendModal.scss'

type Props = {
  sendAddress: string,
  sendAmount: string,
  symbol: SymbolType,
  confirmTransaction: Function,
  cancelTransaction: Function,
  explorer: ExplorerType,
  net: NetworkType,
}

const ConfirmDisplay = ({
  sendAddress,
  sendAmount,
  symbol,
  confirmTransaction,
  cancelTransaction,
  explorer,
  net
}: Props) => (
  <div>
    <p>Please confirm the following transaction:</p>
    <p>You are sending <strong>{formatBalance(symbol, sendAmount)} {symbol}</strong> to:</p>
    <div onClick={() => openExplorerAddress(net, explorer, sendAddress)}>
      <div className={styles.externalLink}>{sendAddress}</div>
    </div>
    <div>
      <Button onClick={confirmTransaction}>Confirm</Button>
      <Button cancel onClick={cancelTransaction}>Cancel</Button>
    </div>
  </div>
)

export default ConfirmDisplay
