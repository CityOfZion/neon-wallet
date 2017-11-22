// @flow
import React from 'react'
import styles from './SendModal.scss'

type Props = {
  sendAddress: string,
  sendAmount: string,
  sendToken: string,
  confirmTransaction: Function,
  cancelTransaction: Function
}

const ConfirmDisplay = ({ sendAddress, sendAmount, sendToken, confirmTransaction, cancelTransaction }: Props) => {
  return (<div>
    <p>Please confirm the following transaction:</p>
    <p>You are sending {sendAmount} {sendToken} to:</p>
    <p>{sendAddress}</p>
    <button onClick={confirmTransaction}>confirm</button>
    <button onClick={cancelTransaction}>cancel</button>
  </div>)
}

export default ConfirmDisplay
