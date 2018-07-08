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
  index: string,
  sendableAssets: array,
  removeRow: Function,
  updateRowField: Function
}

class SendRecipientListItem extends Component<Props> {
  handleFieldChange = e => {
    const { index, updateRowField } = this.props
    const { name, value } = e.currentTarget

    updateRowField(index, name, value)
  }

  handleMaxClick = e => {
    const { index, updateRowField } = this.props

    updateRowField(index, 'amount', 20) // temporary hardcoded max
  }

  handleDeleteRow = () => {
    const { index, removeRow } = this.props

    removeRow(index)
  }

  createAssetList = () =>
    Object.keys(this.props.sendableAssets).map(asset => asset)

  render() {
    const { index, address, amount, note, asset } = this.props

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
          />
        </div>
        <div className={styles.address}>
          <SelectInput
            placeholder="Add wallet or select contact"
            value={address}
            name="address"
            onChange={this.handleFieldChange}
            customChangeEvent
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
