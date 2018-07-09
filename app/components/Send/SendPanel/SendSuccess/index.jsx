import React from 'react'

import CheckMarkIcon from '../../../assets/icons/confirm.svg'

import styles from './SendSuccess.scss'

const SendSuccess = () => (
  <section>
    <div className={styles.sendSuccessHeader}>
      <CheckMarkIcon className={styles.sendSuccessHeaderIcon} />
      <div className={styles.sendSuccessHeaderInfo}>
        <h1 className={styles.sendSuccessHeaderInfoText}>
          3 Transactions completed
        </h1>
        <p className={styles.sendSuccessDateText}>
          Thursday 12 June 2019 21:30
        </p>
      </div>
    </div>
    <div className={styles.sendSuccessBody}>
      <h2>Asset Recipients</h2>
    </div>
  </section>
)

export default SendSuccess
