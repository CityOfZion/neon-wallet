// @flow

import React, { Component } from 'react'

import SelectInput from '../../../../Inputs/SelectInput'
import NumberInput from '../../../../Inputs/NumberInput'
import TextInput from '../../../../Inputs/TextInput'
import DisplayInput from '../../../DisplayInput'

import TrashCanIcon from '../../../../../assets/icons/delete.svg'

import styles from '../SendRecipientList.scss'

type Props = {
  asset: string,
  amount: number,
  address: string,
  note: string,
  max: number,
  index: string,
  errors: Object,
  sendableAssets: Object,
  showConfirmSend: boolean,
  contacts: Object,
  clearErrors: (index: number, field: string) => any,
  removeRow: (index: number) => any,
  updateRowField: (index: number, field: string, value: any) => any
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
      return clearErrors(index, 'address')
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
    const {
      index,
      address,
      amount,
      note,
      asset,
      errors,
      showConfirmSend
    } = this.props

    const selectInput = showConfirmSend ? (
      <DisplayInput value={asset} />
    ) : (
      <SelectInput
        value={asset}
        name="asset"
        onChange={this.handleFieldChange}
        items={this.createAssetList()}
        customChangeEvent
        disabled
      />
    )

    const numberInput = showConfirmSend ? (
      <DisplayInput value={amount} />
    ) : (
      <NumberInput
        value={amount}
        name="amount"
        onChange={this.handleFieldChange}
        customChangeEvent
        handleMaxClick={this.handleMaxClick}
        error={errors.amount}
      />
    )

    const addressInput = showConfirmSend ? (
      <DisplayInput value={address} />
    ) : (
      <SelectInput
        placeholder="Add wallet or select contact"
        value={address}
        name="address"
        onChange={this.handleFieldChange}
        items={this.createContactList()}
        customChangeEvent
        error={errors.address}
      />
    )

    const noteInput = showConfirmSend ? (
      <DisplayInput value={note} />
    ) : (
      <TextInput
        placeholder="Add a note"
        value={note}
        name="note"
        onChange={this.handleFieldChange}
      />
    )

    const trashCanButton = showConfirmSend ? null : (
      <button
        type="button"
        className={styles.deleteButton}
        onClick={this.handleDeleteRow}
        disabled={showConfirmSend}
      >
        <TrashCanIcon />
      </button>
    )

    return (
      <li className={styles.sendRecipientListItem}>
        <div className={styles.rowNumber}>{`0${index + 1}`}</div>
        <div className={styles.asset}>{selectInput}</div>
        <div className={styles.amount}>{numberInput}</div>
        <div className={styles.address}>{addressInput}</div>
        <div className={styles.reference}>{noteInput}</div>
        <div className={styles.delete}>{trashCanButton}</div>
      </li>
    )
  }
}

export default SendRecipientListItem
