// @flow
import React from 'react'

import styles from './Header.scss'

type Props = {
  children: React$Node
}

export default function Header (props: Props) {
  return <div className={styles.header}>{props.children}</div>
}
