import React from 'react'

import ErrorIcon from '../../../../assets/icons/error.svg'
import Button from '../../../Button'

import styles from './SendError.scss'

const SendError = () => (
  <section className={styles.sendError}>
    <div className={styles.sendSerrorHeader}>
      <ErrorIcon />
      <h1 className={styles.sendErrorHeaderTitle}>
        We're terribly sorry, we've made a mistake. Your transaction could not
        be processed.
      </h1>
    </div>
    <Button primary>Take me back</Button>
  </section>
)

export default SendError
