// @flow
import React from 'react'
import styles from './SendModal.scss'

type Props = {
  sendAddress: string,
  sendAmount: string,
  sendToken: string,
  tokens: Array<Object>,
  onChangeHandler: Function,
  openAndValidate: Function
}

const SendDisplay = ({ sendAddress, sendAmount, sendToken, tokens, onChangeHandler, openAndValidate }: Props) => {
  const createTokenOptions = () => {
    const tokenOptions = []
    if (tokens && tokens.length > 0) {
      tokens.forEach(token => {
        const tokenName = Object.keys(token)[0]
        return tokenOptions.push(<option key={tokenName} value={tokenName}>{tokenName}</option>)
      })
    }
    return tokenOptions
  }

  return (<div className={styles.textContainer}>
    <div id='sendAddress' className={styles.row}>
      <label className={styles.label}>Address:</label>
      <input
        autoFocus
        type='text'
        placeholder='Where to send the asset (address)'
        value={sendAddress}
        onChange={onChangeHandler.bind(null, 'sendAddress')}
      />
    </div>
    <div id='sendAmount' className={styles.row}>
      <label className={styles.label}>Amount:</label>
      <input
        type='text'
        value={sendAmount}
        placeholder='Amount'
        onChange={onChangeHandler.bind(null, 'sendAmount')}
      />
    </div>
    <div id='sendAmount' className={styles.row}>
      <label className={styles.label}>Token:</label>
      <div className={styles.sendAmount}>
        <select
          onChange={onChangeHandler.bind(null, 'sendToken')}
          className={styles.sendAmountSelect}
        >
          <option key='Neo' value='Neo'>NEO</option>
          <option key='Gas' value='Gas'>GAS</option>
          {createTokenOptions()}
        </select>
      </div>
    </div>
    <button className={styles.sendButton} id='doSend' onClick={openAndValidate}>Send Asset</button>
  </div>)
}

export default SendDisplay
