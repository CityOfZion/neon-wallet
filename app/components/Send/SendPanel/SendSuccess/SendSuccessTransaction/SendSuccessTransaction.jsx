// @flow
import React, { Component } from 'react'

import SendIcon from '../../../../../assets/navigation/send.svg'
import AddContactIcon from '../../../../../assets/icons/contacts-add.svg'
import InfoIcon from '../../../../../assets/icons/info.svg'
import CopyToClipboard from '../../../../CopyToClipboard'
import { openExplorerTx } from '../../../../../core/explorer'

import styles from './SendSuccessTransaction.scss'

const { shell } = require('electron')

type Props = {
  asset: string,
  amount: string,
  address: string,
  showAddContactModal: ({ address: string }) => null,
  networkId: string,
  txid: string,
  explorer: ExplorerType
}

class SendSuccessTransaction extends Component<Props> {
  displayModal = () => {
    const { showAddContactModal, address } = this.props
    showAddContactModal({ address })
  }

  handleViewClick = () => {
    const { networkId, explorer, txid } = this.props
    openExplorerTx(networkId, explorer, txid)
  }

  render() {
    const { asset, amount, address } = this.props
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
            tooltip="Copy Public Address"
          />
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
