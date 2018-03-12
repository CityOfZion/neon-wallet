import React from 'react'

import Loader from '../../components/Loader'
import styles from './Loading.scss'

export default () => {
  return (
    <div className={styles.loading}>
      <Loader />
    </div>
  )
}
