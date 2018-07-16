// @flow
import React, { Component } from 'react'

import SendIcon from '../../../../../assets/navigation/send.svg'
import AddContactIcon from '../../../../../assets/icons/contacts-add.svg'
import InfoIcon from '../../../../../assets/icons/info.svg'
import CopyToClipboard from '../../../../CopyToClipboard'

import styles from './SendSuccessTransaction.scss'

const { shell } = require('electron')

type Props = {
  asset: string,
  amount: string,
  address: string,
  showAddContactModal: () => null,
  note: string,
  network: string,
  txid: string
}

class SendSuccessTransaction extends Component<Props> {
  displayModal = () => {
    const { showAddContactModal, address } = this.props
    showAddContactModal({ address })
  }

  createNeoscanUrl = () => {
    const { net, txid } = this.props

    if (net === 'TestNet') {
      return `https://neoscan-testnet.io/transaction/${txid}`
    }
    return `https://neoscan.io/transaction/${txid}`
  }

  handleViewClick = () => shell.openExternal(this.createNeoscanUrl())

  handleNoteLength = note =>
    note.length > 20 ? `${note.substr(0, 19)}...` : note

  render() {
    const { asset, amount, address, note } = this.props
    return (
      <li className={styles.sendSuccessTransaction}>
        <div className={styles.sendIconContainer}>
          <SendIcon />
        </div>
        <div className={styles.assetContainer}>
          <p className={styles.asset}>{asset}</p>
        </div>
        <div className={styles.amountContainer}>
          <p className={styles.amount}>{amount}</p>
        </div>
        <div className={styles.addressContainer}>
          <p className={styles.address}>{address}</p>
          <CopyToClipboard
            className={styles.sendSuccessButton}
            text={address}
          />
        </div>
        <div className={styles.noteContainer}>
          <p className={styles.note}>{this.handleNoteLength(note)}</p>
        </div>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={styles.sendSuccessButton}
            onClick={this.displayModal}
          >
            <AddContactIcon />Add
          </button>

          <button
            type="button"
            className={styles.sendSuccessButton}
            onClick={this.handleViewClick}
          >
            <InfoIcon />View
          </button>
        </div>
      </li>
    )
  }
}

export default SendSuccessTransaction
