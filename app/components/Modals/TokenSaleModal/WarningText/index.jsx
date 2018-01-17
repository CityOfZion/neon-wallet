// @flow
import React from 'react'

import styles from './styles.scss'

const WarningText = () => (
  <div className={styles.container}>
    <div className={styles.section}>
      <div className={styles.heading}>
        <strong>IMPORTANT: Read the points below before continuing</strong>
      </div>
      <div className={styles.sectionBody}>
        <div className={styles.bullets}>
          <ol>
            <li>
            Submitting NEO multiple times may result in a loss of funds or a
            delayed refund depending on the policy of the ICO company.
            </li>
            <li>
            Some sales may only accept NEO or GAS so please be sure to check
            before you send.
            </li>
            <li>
            If you send NEO/GAS to a token sale that has already ended, you will
            lose your NEO/GAS and will not be refunded.
            </li>
            <li>Only click the ‘Purchase!’ button once.</li>
            <li>
            City of Zion (CoZ) is not responsible for your usage of this
            feature, please consult this software licenses.
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
)

export default WarningText
