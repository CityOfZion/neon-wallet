import React from 'react'

import CheckMarkIcon from '../../../../assets/icons/confirm.svg'
import SendSuccessTransaction from './SendSuccessTransaction'

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
      <h2 className={styles.sendSuccessBodyHeaderText}>Asset Recipients</h2>
      <ul className={styles.sendSuccessBodyList}>
        <SendSuccessTransaction
          amount="20"
          asset="NEO"
          address="AMZZrsaZpyrAhkJGk9EeVVvpkNVkP1ewpz"
          note="For my friend"
        />
        <SendSuccessTransaction
          amount="1.51232"
          asset="GAS"
          address="AMZZrsaZpyrAhkJGk9EeVVvpkNVkP1ewpz"
          note="For my friend"
        />
        <SendSuccessTransaction
          amount="323322"
          asset="DBC"
          address="AMZZrsaZpyrAhkJGk9EeVVvpkNVkP1ewpz"
          note="For my friend"
        />
      </ul>
    </div>
  </section>
)

export default SendSuccess
