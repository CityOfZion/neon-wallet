// @flow
import React from 'react'
import Button from '../../Button'

type Props = {
  sendAddress: string,
  sendAmount: string,
  symbol: TokenSymbolType,
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
    <p>You are sending <strong>{sendAmount} {symbol}</strong> to:</p>
    <p><strong>{sendAddress}</strong></p>
    <Button onClick={confirmTransaction}>Confirm</Button>
    <Button cancel onClick={cancelTransaction}>Cancel</Button>
  </div>
)

export default ConfirmDisplay
