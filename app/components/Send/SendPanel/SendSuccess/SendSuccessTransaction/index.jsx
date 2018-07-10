// @flow

import React from 'react'

import SendIcon from '../../../../../assets/navigation/send.svg'
import CopyIcon from '../../../../../assets/icons/copy.svg'
import AddContactIcon from '../../../../../assets/icons/contacts-add.svg'
import InfoIcon from '../../../../../assets/icons/info.svg'

import styles from './SendSuccessTransaction.scss'

type Props = {
  asset: string,
  amount: string,
  address: string,
  note: string,
  txId: string
}

const SendSuccessTransaction = ({
  asset,
  amount,
  address,
  note,
  txId
}: Props) => (
  <li className={styles.sendSuccessTransaction}>
    <div className={styles.sendIconContainer}>
      <SendIcon />
    </div>
    <div className={styles.assetContainer}>
      <p>{asset}</p>
    </div>
    <div className={styles.amountContainer}>
      <p className={styles.amount}>{amount}</p>
    </div>
    <div className={styles.addressContainer}>
      <p className={styles.address}>{address}</p>
      <button type="button" className={styles.sendSuccessButton}>
        <CopyIcon />
      </button>
    </div>
    <div className={styles.noteContainer}>
      <p>{note}</p>
    </div>
    <div className={styles.buttonContainer}>
      <button type="button" className={styles.sendSuccessButton}>
        <AddContactIcon />Add
      </button>
      <button type="button" className={styles.sendSuccessButton}>
        <InfoIcon />View
      </button>
    </div>
  </li>
)

export default SendSuccessTransaction
