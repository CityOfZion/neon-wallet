// @flow
import React from 'react'

import styles from './Content.scss'

type Props = {
  children: React$Node
}

export default function Content (props: Props) {
  return <div className={styles.content}>{props.children}</div>
}
