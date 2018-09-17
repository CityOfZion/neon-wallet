import React from 'react'

import styles from './TokenSaleConfirmDetails.scss'

import CheckMarkSVG from '../../../../assets/icons/checkGreen.svg'

const TokenSaleConfirmDetails = () => (
  <div className={styles.tokenSaleConfirmDetails}>
    <h1 className={styles.tokenSaleConfirmDetailsMainHeading}>
      <CheckMarkSVG className={styles.tokenSaleConfirmDetailsCheckMarkSVG} />Confirm
      Purchase
    </h1>
    <h2 className={styles.tokenSaleConfirmDetailsHeading}>Purchase assets</h2>
    <div className={styles.tokenSaleConfirmDetailsContainer}>
      <h3 className={styles.tokenSaleConfirmDetailsSecondaryHeading}>Name</h3>
      <p className={styles.tokenSaleConfirmParagraph}>Guardium</p>
      <h3 className={styles.tokenSaleConfirmDetailsSecondaryHeading}>
        Script Hash
      </h3>
      <p className={styles.tokenSaleConfirmParagraph}>
        Adr3XjZ5QDzVJrWvzmsTTchpLRRGSzgS5A
      </p>
    </div>

    <h2 className={styles.tokenSaleConfirmDetailsHeading}>Funding</h2>
    <div className={styles.tokenSaleConfirmDetailsContainer}>
      <h3 className={styles.tokenSaleConfirmDetailsSecondaryHeading}>
        You're sending
      </h3>
      <p className={styles.tokenSaleConfirmParagraph}>20 NEO</p>
    </div>
  </div>
)

export default TokenSaleConfirmDetails
