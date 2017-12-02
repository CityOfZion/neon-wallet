// @flow
import React from 'react'
import Button from '../../Button'

import { formatBalance } from '../../../core/formatters'

type Props = {
  sendAddress: string,
  sendAmount: string,
  symbol: SymbolType,
  confirmTransaction: Function,
  cancelTransaction: Function
}

const ConfirmDisplay = ({
  sendAddress,
  sendAmount,
  symbol,
  confirmTransaction,
  cancelTransaction
}: Props) => (
  <div>
    <p>Please confirm the following transaction:</p>
    <p>You are sending <strong>{formatBalance(symbol, sendAmount)} {symbol}</strong> to:</p>
    <p><strong>{sendAddress}</strong></p>
    <div>
      <Button onClick={confirmTransaction}>Confirm</Button>
      <Button cancel onClick={cancelTransaction}>Cancel</Button>
    </div>
  </div>
)

export default ConfirmDisplay
