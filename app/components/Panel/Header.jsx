// @flow
import React from 'react'
import classNames from 'classnames'

import styles from './Header.scss'

type Props = {
  className: ?string,
  children: React$Node
}

export default function Header (props: Props) {
  return <div className={classNames(styles.header, props.className)}>{props.children}</div>
}
