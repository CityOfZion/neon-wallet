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
  max: number,
  index: number,
  errors: Object,
  sendableAssets: Object,
  showConfirmSend: boolean,
  contacts: Object,
  numberOfRecipients: number,
  clearErrors: (index: number, field: string) => any,
  removeRow: (index: number) => any,
  updateRowField: (index: number, field: string, value: any) => any
}

class SendRecipientListItem extends Component<Props> {
  handleFieldChange = (e: Object) => {
    const {
      index,
      updateRowField,
      contacts,
      sendableAssets,
      clearErrors,
      max
    } = this.props

    const isAssetString = Object.keys(sendableAssets).find(asset => asset === e)
    if (isAssetString) return updateRowField(index, 'asset', e)

    const isContactString = Object.keys(contacts).find(contact => contact === e)
    if (isContactString) {
      updateRowField(index, 'address', contacts[e])
      return clearErrors(index, 'address')
    }

    const { name } = e.target
    let { value } = e.target
    if (value > max) value = max
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

  clearErrorsOnFocus = (e: Object) => {
    const { name } = e.target
    const { clearErrors, index } = this.props
    clearErrors(index, name)
  }

  createAssetList = (): Array<string> => Object.keys(this.props.sendableAssets)

  createContactList = (): Array<string> => Object.keys(this.props.contacts)

  render() {
    const {
      index,
      address,
      amount,
      asset,
      errors,
      max,
      showConfirmSend,
      numberOfRecipients
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
        onFocus={this.clearErrorsOnFocus}
        disabled
      />
    )

    const numberInput = showConfirmSend ? (
      <DisplayInput value={amount} />
    ) : (
      <NumberInput
        value={amount}
        max={max}
        name="amount"
        onChange={this.handleFieldChange}
        customChangeEvent
        handleMaxClick={this.handleMaxClick}
        onFocus={this.clearErrorsOnFocus}
        error={errors && errors.amount}
        options={{ numeralDecimalScale: 10 }}
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
        onFocus={this.clearErrorsOnFocus}
        error={errors && errors.address}
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
        <div className={styles.rowNumber}>{`${`0${index + 1}`.slice(-2)}`}</div>
        <div className={styles.asset}>{selectInput}</div>
        <div className={styles.amount}>{numberInput}</div>
        <div className={styles.address}>{addressInput}</div>
        <div className={styles.delete}>
          {numberOfRecipients > 1 && trashCanButton}
        </div>
      </li>
    )
  }
}

export default SendRecipientListItem
