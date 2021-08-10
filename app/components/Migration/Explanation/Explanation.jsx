// @flow
import React from 'react'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'

import InfoIcon from '../../../assets/icons/info.svg'

import styles from './Explanation.scss'

export default function ReceiveExplanation() {
  return (
    <div className={styles.receiveExplanation}>
      <div className={styles.header}>
        <InfoIcon className={styles.icon} />
        <div className={styles.title}>How does token migration work?</div>
      </div>
      <div className={styles.message}>
        <FormattedHTMLMessage id="receiveQRExplanation" />
      </div>
    </div>
  )
}
