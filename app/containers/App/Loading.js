// @flow
import React from 'react'

import themes from '../../themes'
import Loader from '../../components/Loader'
import styles from './Loading.scss'

export default function Loading({ theme }: { theme: ThemeType }) {
  return (
    <div style={themes[theme]} className={styles.loading}>
      <Loader />
    </div>
  )
}
