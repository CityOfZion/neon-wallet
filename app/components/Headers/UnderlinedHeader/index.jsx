// @flow
import React from 'react'

import classNames from 'classnames'

import styles from './UnderlinedHeader.scss'

type Props = {
  className?: string,
  text?: string,
}

const UnderlinedHeader = ({ text, className }: Props) => (
    <section className={classNames(styles.underlinedHeader, className)}>
      <h1 className={styles.underlinedHeading}>{text}</h1>
    </section>
)

export default UnderlinedHeader
