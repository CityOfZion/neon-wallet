// @flow
import React from 'react'
import classNames from 'classnames'

import styles from './Table.scss'

type Props = {
    children: React$Node,
    className?: string
}

const Table = ({ children, className = '' }: Props) =>
  <table className={classNames(styles.table, className)}>{children}</table>

export default Table
