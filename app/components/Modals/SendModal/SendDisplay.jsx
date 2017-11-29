// @flow
import React from 'react'
import classNames from 'classnames'

import { ASSETS } from '../../../core/constants'
import { isToken } from '../../../core/wallet'
import { formatBalance, formatGAS, formatNEO, truncateGAS, truncateTokenBalance } from '../../../core/formatters'

import styles from './SendModal.scss'

type Props = {
  sendAddress: string,
  sendAmount: string,
  symbol: TokenSymbolType,
  tokens: Object,
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
}: Props) => {
  const sendButtonDisabled = !sendAddress || !sendAmount
  return (
    <div className={styles.textContainer}>
      <div id='sendAddress' className={styles.column}>
        <label className={styles.label}>Address:</label>
        <input
          autoFocus
          type='text'
          placeholder='Where to send the asset (address)'
          value={sendAddress}
          onChange={(e) => onChangeHandler('sendAddress', e.target.value)}
        />
      </div>
      <div id='sendAmount' className={styles.column}>
        <label className={styles.label}>Amount:</label>
        <input
          type='number'
          value={sendAmount}
          placeholder='Amount'
          onChange={(e) => onChangeHandler('sendAmount', e.target.value)}
        />
      </div>
      <div className={styles.percentRow}>
        {[25, 50, 75, 100].map((percent: number) => {
          let value = percent * parseFloat(balance) / 100
          if (symbol === ASSETS.NEO) {
            value = Math.ceil(value)
          } else if (symbol === ASSETS.GAS) {
            value = truncateGAS(value)
          } else {
            value = truncateTokenBalance(value, tokens[symbol].info.decimals)
          }
          return (
            <button
              key={`percentButton${percent}`}
              onClick={() => onChangeHandler('sendAmount', symbol === ASSETS.NEO ? Math.ceil(value) : value)}
              className={styles.percentButton}>{percent}%</button>
          )
        })}
      </div>
      <div id='sendAmount' className={styles.column}>
        <label className={styles.label}>Asset:</label>
        <div className={styles.sendAmount}>
          <select
            onChange={(e) => onChangeHandler('symbol', e.target.value, true)}
            className={styles.sendAmountSelect}
          >
            <option value={ASSETS.NEO}>{ASSETS.NEO}</option>
            <option value={ASSETS.GAS}>{ASSETS.GAS}</option>
            {Object.keys(tokens).map((symbol) => <option key={symbol} value={symbol}>{symbol}</option>)}
          </select>
        </div>
      </div>
      <div id='sendAmount' className={styles.column}>
        <label className={styles.label}>Balance:</label>
        {symbol === ASSETS.NEO && formatNEO(balance)}
        {symbol === ASSETS.GAS && formatGAS(balance)}
        {isToken(symbol) && formatBalance(balance, tokens[symbol].info.decimals)}
      </div>
      <button className={classNames(styles.sendButton, {'disabled': sendButtonDisabled})} id='doSend' onClick={openAndValidate} disabled={sendButtonDisabled}>Send Asset</button>
    </div>
  )
}
export default SendDisplay
