// @flow
import React from 'react'

import Loader from '../../../../Loader'
import styles from './Loading.scss'

export default function Loading (_props: Object) {
  return (
    <div className={styles.loading}>
      <Loader />
    </div>
  )
}
