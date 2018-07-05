// @flow

import React from 'react'

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
  id: string,
  removeRow: Function
}

const SendRecipientListItem = ({
  id,
  address,
  amount,
  note,
  asset,
  removeRow
}: Props) => (
  <li className={styles.sendRecipientListItem}>
    <div className={styles.rowNumber}>{`0${id + 1}`}</div>
    <div className={styles.asset}>
      <SelectInput value={asset} />
    </div>
    <div className={styles.amount}>
      <NumberInput max={20} value={amount} />
    </div>
    <div className={styles.address}>
      <SelectInput placeholder="Add wallet or select contact" value={address} />
    </div>
    <div className={styles.reference}>
      <TextInput placeholder="Add a note" value={note} />
    </div>
    <div className={styles.delete}>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => removeRow(id)}
      >
        <TrashCanIcon />
      </button>
    </div>
  </li>
)

export default SendRecipientListItem
