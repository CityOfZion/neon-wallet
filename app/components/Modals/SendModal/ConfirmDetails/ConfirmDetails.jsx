// @flow
import React from 'react'
import { get } from 'lodash-es'

import GridIcon from 'assets/icons/grid.svg'
import Button from '../../../Button'

import baseStyles from '../SendModal.scss'
import styles from './ConfirmDetails.scss'

type Props = {
  recipientData: Object,
  confirmAndClose: () => any
}

export default class ConfirmDetails extends React.Component<Props> {
  getRecipientData = (key: string) =>
    get(this.props.recipientData, key) || 'Not specified'

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
              <div>{this.getRecipientData('asset')}</div>
            </div>

            <div className={styles.detailGroup}>
              <div className={styles.detailName}>Address</div>
              <div>{this.getRecipientData('address')}</div>
            </div>

            <div className={styles.detailGroup}>
              <div className={styles.detailName}>Amount</div>
              <div>{this.getRecipientData('amount')}</div>
            </div>

            <div className={styles.detailGroup}>
              <div className={styles.detailName}>Reference</div>
              <div>{this.getRecipientData('reference')}</div>
            </div>
          </div>
        </div>
        <div className={styles.scanButtonContainer}>
          <Button primary onClick={this.props.confirmAndClose}>
            Confirm Details
          </Button>
        </div>
      </div>
    )
  }
}
