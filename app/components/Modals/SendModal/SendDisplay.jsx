// @flow
import React from 'react'

import { ASSETS } from '../../../core/constants'

import styles from './SendModal.scss'

type Props = {
  sendAddress: string,
  sendAmount: string,
  symbol: TokenSymbolType,
  tokens: Array<TokenType>,
  onChangeHandler: Function,
  openAndValidate: Function,
  balance: number
}

const SendDisplay = ({
  sendAddress,
  sendAmount,
  symbol,
  tokens,
  onChangeHandler,
  openAndValidate,
  balance
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
        type='number'
        value={sendAmount}
        placeholder='Amount'
        onChange={(e) => onChangeHandler('sendAmount', e.target.value)}
      />
    </div>
    <div className={styles.row}>
      {[25, 50, 75, 100].map((percent: number) =>
        <button onClick={() => onChangeHandler('sendAmount', percent * parseFloat(balance) / 100)}>%{percent}</button>
      )}
    </div>
    <div id='sendAmount' className={styles.row}>
      <label className={styles.label}>Token:</label>
      <div className={styles.sendAmount}>
        <select
          onChange={(e) => onChangeHandler('symbol', e.target.value)}
          className={styles.sendAmountSelect}
        >
          <option value={ASSETS.NEO}>{ASSETS.NEO}</option>
          <option value={ASSETS.GAS}>{ASSETS.GAS}</option>
          {tokens.map(({ symbol }) => <option key={symbol} value={symbol}>{symbol}</option>)}
        </select> ({balance})
      </div>
    </div>
    <button className={styles.sendButton} id='doSend' onClick={openAndValidate}>Send Asset</button>
  </div>
)

export default SendDisplay
