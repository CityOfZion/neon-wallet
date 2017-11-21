// @flow
import React, { Component } from 'react'
import BaseModal from '../BaseModal'
import styles from './SendModal.scss'
import { obtainTokenBalance, validateTransactionBeforeSending } from '../../../core/wallet'

type Props = {
    neo: number,
    gas: number,
    tokens: Array<Object>,
    showErrorNotification: Function,
    hideModal: Function,
}

class SendModal extends Component<Props> {
  canvas: ?HTMLCanvasElement
  state = {
    sendAmount: '',
    sendAddress: '',
    sendToken: 'Neo'
  }

  // open confirm pane and validate fields
  openAndValidate = () => {
    const { neo, gas, tokens, showErrorNotification } = this.props
    const { sendAddress, sendAmount, sendToken } = this.state
    const tokenBalance = obtainTokenBalance(tokens, sendToken)
    const { error, valid } = validateTransactionBeforeSending(neo, gas, tokenBalance, sendToken, sendAddress, sendAmount)
    if (valid) {
      console.log('valid transaction')
    } else {
      console.log('invalide transaction');
      showErrorNotification({ message: error })
    }
  }

  createTokenOptions = () => {
    const { tokens } = this.props
    const tokenOptions = []
    if (tokens && tokens.length > 0) {
      tokens.forEach(token => {
        const tokenName = Object.keys(token)[0]
        return tokenOptions.push(<option key={tokenName} value={tokenName}>{tokenName}</option>)
      })
    }
    console.log('here token', tokenOptions);
    return tokenOptions
  }

  render () {
    const { hideModal } = this.props
    const { sendAddress, sendAmount } = this.state

    return (
      <BaseModal
        title='Send'
        hideModal={hideModal}
        style={{
          content: {
            width: '420px',
            height: '390px'
          }
        }}
      >
        <div className={styles.textContainer}>
          <div id='sendAddress' className={styles.row}>
            <label className={styles.label}>Address:</label>
            <input
              autoFocus
              type='text'
              placeholder='Where to send the asset (address)'
              value={sendAddress}
              onChange={(e) => this.setState({ sendAddress: e.target.value })}
            />
          </div>
          <div id='sendAmount' className={styles.row}>
            <label className={styles.label}>Amount:</label>
            <input
              type='text'
              value={sendAmount}
              placeholder='Amount'
              onChange={(e) => this.setState({ sendAmount: e.target.value })}
            />
          </div>
          <div id='sendAmount' className={styles.row}>
            <label className={styles.label}>Token:</label>
            <div className={styles.sendAmount}>
              <select
                onChange={(e) => this.setState({ sendToken: e.target.value })}
                className={styles.sendAmountSelect}
              >
                <option key='Neo' value='Neo'>NEO</option>
                <option key='Gas' value='Gas'>GAS</option>
                {this.createTokenOptions()}
              </select>
            </div>
          </div>
          <button className={styles.sendButton} id='doSend' onClick={this.openAndValidate}>Send Asset</button>
        </div>
      </BaseModal>
    )
  }
}

export default SendModal
