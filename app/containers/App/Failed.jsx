import React from 'react'

import styles from './Failed.scss'

export default () => {
  return (
    <div className={styles.failed}>
      <div>Failed to load.</div>
      <div>Please try to restart the wallet.</div>
    </div>
  )
}
