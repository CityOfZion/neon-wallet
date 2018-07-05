import React from 'react'
import classNames from 'classnames'

import SendRecipientListItem from './SendRecipientListItem'

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
      <SendRecipientListItem />
    </ul>
  </section>
)

export default SendRecipientList
