// @flow
import React from 'react'
import classNames from 'classnames'

import NumberInput from '../../NumberInput'

import { ASSETS } from '../../../core/constants'
import { formatBalance, toFixedDecimals, COIN_DECIMAL_LENGTH } from '../../../core/formatters'

import styles from './SendModal.scss'

type Props = {
  sendAddress: string,
  sendAmount: string,
  symbol: SymbolType,
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
        <NumberInput
          options={{
            numeralDecimalScale: COIN_DECIMAL_LENGTH
          }}
          value={sendAmount}
          placeholder='Amount'
          onChange={(e) => onChangeHandler('sendAmount', e.target.rawValue)}
        />
      </div>
      <div className={styles.percentRow}>
        {[25, 50, 75, 100].map((percent: number) => {
          const value = percent * parseFloat(balance) / 100
          return (
            <button
              key={`percentButton${percent}`}
              onClick={() => onChangeHandler('sendAmount', symbol === ASSETS.NEO ? Math.ceil(value) : toFixedDecimals(value, COIN_DECIMAL_LENGTH))}
              className={styles.percentButton}>{percent}%</button>
          )
        })
        }
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
        {formatBalance(symbol, balance)}
      </div>
      <button
        className={classNames(styles.sendButton, {'disabled': sendButtonDisabled})}
        id='doSend'
        onClick={openAndValidate}
        disabled={sendButtonDisabled}>Send Asset</button>
    </div>
  )
}
export default SendDisplay
