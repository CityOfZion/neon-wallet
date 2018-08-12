// @flow

import React, { Component } from 'react'

import TextInput from '../../components/Inputs/TextInput'
import Button from '../../components/Button'

import Delete from '../../assets/icons/delete.svg'
import Edit from '../../assets/icons/edit.svg'
import Confirm from '../../assets/icons/confirm.svg'
import Close from '../../assets/icons/close.svg'

import styles from './WalletManager.scss'

type Props = {
  handleDelete: (e: SyntheticEvent<*>) => any,
  handleSave: ({ label: string, address: string }) => any,
  label: string,
  address: string
}

// type State = {
//   editing: boolean,
//   newLabel: string
// }

class WalletManager extends Component<Props, State> {
  // state = {
  //   editing: false,
  //   newLabel: this.props.label
  // }

  render() {
    const { label, address, handleDelete } = this.props
    return (
      <div className={styles.walletInfoRow}>
        <div className={styles.accountLabel}>{label}</div>
        <div className={styles.address}>{address}</div>
        <div className={styles.editAccountButton}>
          <Button renderIcon={Edit} onClick={handleDelete}>
            Edit
          </Button>
        </div>
      </div>
    )
  }
}

export default WalletManager
