import React from 'react'

import NotificationIcon from '../../../../assets/icons/notification.svg'

import styles from './ZeroAssets.scss'

const ZeroAssets = () => (
  <section className={styles.zeroAssets}>
    <NotificationIcon />
    <h1 className={styles.zeroAssetsHeaderText}>You have no assets to send.</h1>
  </section>
)

export default ZeroAssets
