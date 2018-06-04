// @flow

import React from 'react'

import Button from '../../components/Button'
import Delete from '../../assets/icons/delete.svg'
import Edit from '../../assets/icons/edit.svg'
import styles from './WalletManager.scss'

type Props = {
  handleDelete: Function,
  label: String,
  address: String
}

export default class WalletManager extends React.Component<Props> {
  render = () => {
    const { label, address, handleDelete } = this.props
    return (
      <div className={styles.accountInfoRow}>
        <div className={styles.accountInfo}>
          <div className={styles.accountLabel}> {label}</div>
          <div className={styles.address}>{address}</div>
        </div>
        <div className={styles.accountButtons}>
          <div className={styles.editAccountButton}>
            <Button renderIcon={Edit} />
          </div>
          <div className={styles.deleteAccountButton}>
            <Button renderIcon={Delete} onClick={handleDelete}>
              Delete Wallet
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
