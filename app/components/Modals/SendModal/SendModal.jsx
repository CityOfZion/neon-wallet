// @flow
import React, { Component } from 'react'
import BaseModal from '../BaseModal'
import styles from './SendModal.scss'

type Props = {
    neo: number,
    gas: number,
    hideModal: Function,
}

class SendModal extends Component<Props> {
  canvas: ?HTMLCanvasElement
  state = {
    sendAmount: '',
    sendAddress: '',
    sendAsset: ''
  }

  render () {
    const { hideModal, neo, gas } = this.props
    const { sendAddress, sendAmount, sendAsset } = this.state

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
            <label className={styles.label}>Amount:</label>
            <div className={styles.sendAmount}>
              <select className={styles.sendAmountSelect}>
                <option value='NEO'>NEO</option>
                <option value='GAS'>GAS</option>
                <option value='RPX'>RPX</option>
              </select>
              <div>{neo} NEO</div>
            </div>
          </div>
          <button className={styles.sendButton} id='doSend' onClick={this.openAndValidate}>Send Asset</button>
        </div>
      </BaseModal>
    )
  }
}

export default SendModal
