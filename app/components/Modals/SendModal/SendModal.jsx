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
    sendAsset: ''
  }

  // open confirm pane and validate fields
  openAndValidate = () => {
    const { neo, gas, tokens, showErrorNotification } = this.props
    const { sendAddress, sendAmount, sendAsset } = this.state
    const tokenBalance = sendAsset ? obtainTokenBalance(tokens, sendAsset) : 0
    const { error, valid } = validateTransactionBeforeSending(neo, gas, tokenBalance, sendAsset, sendAddress, sendAmount)
    if (valid) {
      console.log('valid transaction')
    } else {
      console.log('invalide transaction');
      showErrorNotification({ message: error })
    }
  }

  createTokenOptions = () => {
    const { tokens } = this.props
    if (tokens && tokens.length > 0) {
      return Object.keys(tokens).map(tokenName => {
        return (<option key={tokenName} value={tokenName}>{tokenName}</option>)
      })
    }
    return null
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
              <select className={styles.sendAmountSelect}>
                <option key='NEO' value='NEO'>NEO</option>
                <option key='GAS' value='GAS'>GAS</option>
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
