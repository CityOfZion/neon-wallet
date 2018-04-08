// @flow
import React from 'react'

import Button from '../../../../Button'
import styles from './Failed.scss'

type Props = {
  onCancel: Function
}

export default function Failed (props: Props) {
  return (
    <div className={styles.failed}>
      <p>Failed to load token data</p>
      <Button onClick={props.onCancel}>&laquo; Go back</Button>
    </div>
  )
}
