// @flow
import React from 'react'
import Button from '../../Button'

type Props = {
  sendAddress: string,
  sendAmount: string,
  sendToken: string,
  confirmTransaction: Function,
  cancelTransaction: Function
}

const ConfirmDisplay = ({
  sendAddress,
  sendAmount,
  sendToken,
  confirmTransaction,
  cancelTransaction
}: Props) => (
  <div>
    <p>Please confirm the following transaction:</p>
    <p>You are sending <strong>{sendAmount} {sendToken}</strong> to:</p>
    <p><strong>{sendAddress}</strong></p>
    <Button onClick={confirmTransaction}>confirm</Button>
    <Button cancel onClick={cancelTransaction}>cancel</Button>
  </div>
)

export default ConfirmDisplay
