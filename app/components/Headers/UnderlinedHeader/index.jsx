// @flow
import React from 'react'

import classNames from 'classnames'

import styles from './UnderlinedHeader.scss'

type Props = {
  className?: string,
  childClassName?: string,
  text?: string,
  children: React$Node
}

const UnderlinedHeader = ({ className, childClassName, text, children }: Props) => (
    <section className={classNames(styles.underlinedHeader, className)}>
      <h1 className={classNames(styles.underlinedHeading, childClassName)}>{text}</h1>
      {children}
    </section>
)

export default UnderlinedHeader
