import React from 'react'
import classNames from 'classnames'

import SelectInput from '../../../Inputs/SelectInput'
import NumberInput from '../../../Inputs/NumberInput'
import TextInput from '../../../Inputs/TextInput'

import TrashCanIcon from '../../../../assets/icons/delete.svg'

import styles from './SendRecipientList.scss'

const SendRecipientList = () => (
  <section className={styles.sendRecipientListContainer}>
    <div className={styles.sendRecipientListHeaders}>
      <h3 className={classNames(styles.sendRecipientListHeader, styles.asset)}>
        Asset
      </h3>
      <h3 className={classNames(styles.sendRecipientListHeader, styles.amount)}>
        Amount
      </h3>
      <h3
        className={classNames(styles.sendRecipientListHeader, styles.address)}
      >
        Recipient Address
      </h3>
      <h3
        className={classNames(styles.sendRecipientListHeader, styles.reference)}
      >
        Reference
      </h3>
      <div className={styles.delete} />
    </div>
    <ul className={styles.sendRecipientList}>
      <li className={styles.sendRecipientListItem}>
        <div className={styles.rowNumber}>01</div>
        <div className={styles.asset}>
          <SelectInput value="NEO" />
        </div>
        <div className={styles.amount}>
          <NumberInput />
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
    </ul>
  </section>
)

export default SendRecipientList
