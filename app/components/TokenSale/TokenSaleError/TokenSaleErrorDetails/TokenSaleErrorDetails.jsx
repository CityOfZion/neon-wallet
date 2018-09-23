// @flow
import React from 'react'

import styles from './TokenSaleErrorDetails.scss'

import ErrorIcon from '../../../../assets/icons/error.svg'

type Props = {
  error: Object
}

const TokenSaleErrorDetails = ({ error }: Props) => (
  <div className={styles.tokenSaleErrorDetails}>
    <h1 className={styles.tokenSaleErrorDetailsMainHeading}>
      <ErrorIcon className={styles.tokenSaleErrorDetailsIcon} />Something went
      wrong
    </h1>
    <h2 className={styles.tokenSaleErrorDetailsHeading}>Error details</h2>
    <div className={styles.tokenSaleErrorDetailsContainer}>
      <h3 className={styles.tokenSaleErrorDetailsSecondaryHeading}>Error</h3>
      <p className={styles.tokenSaleErrorParagraph}>{error.message}</p>
    </div>
  </div>
)

export default TokenSaleErrorDetails
