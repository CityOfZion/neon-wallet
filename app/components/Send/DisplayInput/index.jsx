// @flow

import React from 'react'

import classNames from 'classnames'

import styles from './DisplayInput.scss'

type Props = {
  className?: string,
  value: any
}

const DisplayInput = ({ className, value }: Props) => (
  <div className={classNames(styles.displayInput, className)}>{value}</div>
)

export default DisplayInput
