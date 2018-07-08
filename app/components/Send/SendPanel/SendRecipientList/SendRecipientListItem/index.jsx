// @flow

import React, { Component } from 'react'

import SelectInput from '../../../../Inputs/SelectInput'
import NumberInput from '../../../../Inputs/NumberInput'
import TextInput from '../../../../Inputs/TextInput'

import TrashCanIcon from '../../../../../assets/icons/delete.svg'

import styles from '../SendRecipientList.scss'

type Props = {
  asset: string,
  amount: numbers,
  address: string,
  note: string,
  max: number,
  index: string,
  sendableAssets: Object,
  contacts: Object,
  clearErrors: Function,
  removeRow: Function,
  updateRowField: Function
}

class SendRecipientListItem extends Component<Props> {
  handleFieldChange = e => {
    const {
      index,
      updateRowField,
      contacts,
      sendableAssets,
      clearErrors
    } = this.props

    const isAssetString = Object.keys(sendableAssets).find(asset => asset === e)
    if (isAssetString) return updateRowField(index, 'asset', e)

    const isContactString = Object.keys(contacts).find(contact => contact === e)
    if (isContactString) {
      updateRowField(index, 'address', contacts[e])
      clearErrors(index, 'address')
    }

    const { name, value } = e.target
    clearErrors(index, name)
    return updateRowField(index, name, value)
  }

  handleMaxClick = () => {
    const { index, updateRowField, max } = this.props

    updateRowField(index, 'amount', max)
  }

  handleDeleteRow = () => {
    const { index, removeRow } = this.props

    removeRow(index)
  }

  createAssetList = () =>
    Object.keys(this.props.sendableAssets).map(asset => asset)

  createContactList = () =>
    Object.keys(this.props.contacts).map(contact => contact)

  render() {
    const { index, address, amount, note, asset, errors } = this.props

    return (
      <li className={styles.sendRecipientListItem}>
        <div className={styles.rowNumber}>{`0${index + 1}`}</div>
        <div className={styles.asset}>
          <SelectInput
            value={asset}
            name="asset"
            onChange={this.handleFieldChange}
            items={this.createAssetList()}
            customChangeEvent
            disabled
          />
        </div>
        <div className={styles.amount}>
          <NumberInput
            max={20}
            value={amount}
            name="amount"
            onChange={this.handleFieldChange}
            customChangeEvent
            handleMaxClick={this.handleMaxClick}
            error={errors.amount}
          />
        </div>
        <div className={styles.address}>
          <SelectInput
            placeholder="Add wallet or select contact"
            value={address}
            name="address"
            onChange={this.handleFieldChange}
            items={this.createContactList()}
            customChangeEvent
            error={errors.address}
          />
        </div>
        <div className={styles.reference}>
          <TextInput
            placeholder="Add a note"
            value={note}
            name="note"
            onChange={this.handleFieldChange}
          />
        </div>
        <div className={styles.delete}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={this.handleDeleteRow}
          >
            <TrashCanIcon />
          </button>
        </div>
      </li>
    )
  }
}

export default SendRecipientListItem
