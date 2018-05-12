// @flow
import React from 'react'
import classNames from 'classnames'

import styles from './Loader.scss'

type Props = {
  className?: string,
}

export default function Loader ({ className }: Props) {
  return (
    <div className={classNames(styles.loader, className)}>
      <div />
      <div className={styles.rect2} />
      <div className={styles.rect3} />
      <div className={styles.rect4} />
      <div className={styles.rect5} />
    </div>
  )
}
