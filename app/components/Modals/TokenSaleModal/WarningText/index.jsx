// @flow
import React from 'react'

import styles from './styles.scss'

type Props = {
  children: React$Node
}

const WarningText = (props: Props) => (
  <div className={styles.container}>
    <div className={styles.section}>
      <div className={styles.heading}>
        <strong>IMPORTANT: You must agree to the following before continuing</strong>
      </div>
      <div className={styles.sectionBody}>
        <div className={styles.bullets}>
          <ol>
            {props.children}
          </ol>
        </div>
      </div>
    </div>
  </div>
)

export default WarningText
