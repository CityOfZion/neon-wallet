// @flow

import React from 'react'

import TextInput from '../../components/Inputs/TextInput'
import Button from '../../components/Button'
import Delete from '../../assets/icons/delete.svg'
import Edit from '../../assets/icons/edit.svg'
import Confirm from '../../assets/icons/confirm.svg'
import Close from '../../assets/icons/close.svg'
import styles from './WalletManager.scss'

type Props = {
  handleDelete: Function,
  handleSave: Function,
  label: String,
  address: String
}

type State = {
  editing: boolean,
  newLabel: String
}

export default class WalletManager extends React.Component<Props, State> {
  state = {
    editing: false,
    newLabel: this.props.label
  }
  render = () => {
    const { label, address, handleDelete } = this.props
    return (
      <div className={styles.accountInfoRow}>
        <div className={styles.accountInfo}>
          {this.state.editing ? (
            <TextInput
              onChange={e => this.setState({ newLabel: e.target.value })}
              value={this.state.newLabel}
            />
          ) : (
            <div className={styles.accountLabel}> {label} </div>
          )}
          <div className={styles.address}>{address}</div>
        </div>
        <div className={styles.accountButtons}>
          {this.state.editing ? (
            <div className={styles.editLabelButtonRow}>
              <Button
                onClick={() => {
                  this.props.handleSave({ label: this.state.newLabel, address })
                  this.setState({ editing: false })
                }}
                renderIcon={Confirm}
              />
              <Button
                onClick={() => this.setState({ editing: false })}
                renderIcon={Close}
              />
            </div>
          ) : (
            <div className={styles.editAccountButton}>
              <Button
                onClick={() => this.setState({ editing: true })}
                renderIcon={Edit}
              />
            </div>
          )}
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
