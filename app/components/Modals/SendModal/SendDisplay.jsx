// @flow
import React from 'react'
import styles from './SendModal.scss'
import { ASSETS_LABELS, ASSETS } from '../../../core/constants'

type Props = {
  sendAddress: string,
  sendAmount: string,
  sendToken: string,
  tokens: Array<Object>,
  onChangeHandler: Function,
  openAndValidate: Function
}

const SendDisplay = ({
  sendAddress,
  sendAmount,
  sendToken,
  tokens,
  onChangeHandler,
  openAndValidate
}: Props) => (
  <div className={styles.textContainer}>
    <div id='sendAddress' className={styles.row}>
      <label className={styles.label}>Address:</label>
      <input
        autoFocus
        type='text'
        placeholder='Where to send the asset (address)'
        value={sendAddress}
        onChange={(e) => onChangeHandler('sendAddress', e.target.value)}
      />
    </div>
    <div id='sendAmount' className={styles.row}>
      <label className={styles.label}>Amount:</label>
      <input
        type='text'
        value={sendAmount}
        placeholder='Amount'
        onChange={(e) => onChangeHandler('sendAmount', e.target.value)}
      />
    </div>
    <div id='sendAmount' className={styles.row}>
      <label className={styles.label}>Token:</label>
      <div className={styles.sendAmount}>
        <select
          onChange={(e) => onChangeHandler('sendToken', e.target.value)}
          className={styles.sendAmountSelect}
        >
          <option value={ASSETS_LABELS.NEO}>{ASSETS.NEO}</option>
          <option value={ASSETS_LABELS.GAS}>{ASSETS.GAS}</option>
          {tokens.map(({ symbol }) => <option key={symbol} value={symbol}>{symbol}</option>)}
        </select>
      </div>
    </div>
    <button className={styles.sendButton} id='doSend' onClick={openAndValidate}>Send Asset</button>
  </div>
)

export default SendDisplay
