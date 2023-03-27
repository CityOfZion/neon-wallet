// @flow
import React from 'react'
import classNames from 'classnames'

import styles from './Content.scss'

type Props = {
  className: ?string,
  children: React$Node,
  onScroll?: Function,
}

export default function Content(props: Props) {
  return (
    <div
      className={classNames(styles.content, props.className)}
      onScroll={props.onScroll}
    >
      {props.children}
    </div>
  )
}
