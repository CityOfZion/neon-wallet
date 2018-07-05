import React from 'react'

import SelectInput from '../../../../Inputs/SelectInput'
import NumberInput from '../../../../Inputs/NumberInput'
import TextInput from '../../../../Inputs/TextInput'

import TrashCanIcon from '../../../../../assets/icons/delete.svg'

import styles from '../SendRecipientList.scss'

const SendRecipientListItem = () => (
  <li className={styles.sendRecipientListItem}>
    <div className={styles.rowNumber}>01</div>
    <div className={styles.asset}>
      <SelectInput value="NEO" />
    </div>
    <div className={styles.amount}>
      <NumberInput max={20} />
    </div>
    <div className={styles.address}>
      <SelectInput placeholder="Add wallet or select contact" />
    </div>
    <div className={styles.reference}>
      <TextInput placeholder="Add a note" />
    </div>
    <div className={styles.delete}>
      <button type="button" className={styles.deleteButton}>
        <TrashCanIcon />
      </button>
    </div>
  </li>
)

export default SendRecipientListItem
