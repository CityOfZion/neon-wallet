// @flow
import React from 'react'

import Button from '../../../Button'
import GridIcon from '../../../../assets/icons/grid.svg'

import baseStyles from '../SendModal.scss'
import styles from './ConfirmDetails.scss'

type Props = {
  recipientData: Object
}

export default class ConfirmDetails extends React.Component<Props, State> {
  render() {
    return (
      <div className={baseStyles.contentContainer}>
        <div className={baseStyles.header}>
          <GridIcon className={baseStyles.icon} />
          <div className={baseStyles.title}>QR Code Identified!</div>
        </div>

        <div className={baseStyles.section}>
          <div className={baseStyles.sectionTitle}>PAYMENT DETAILS</div>
          <div className={styles.paymentDetails}>

            <div className={styles.detailGroup}>
              <div className={styles.detailName}>Asset</div>
              <div>asdf</div>
            </div>

            <div className={styles.detailGroup}>
              <div className={styles.detailName}>Address</div>
              <div>asdf</div>
            </div>

            <div className={styles.detailGroup}>
              <div className={styles.detailName}>Reference</div>
              <div>asdf</div>
            </div>
            
          </div>
        </div>

        <Button primary>
          Send Assets
        </Button>
      </div>
    )
  }
}
