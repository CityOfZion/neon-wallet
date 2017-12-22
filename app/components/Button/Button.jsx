// @flow
import React from 'react'
import type { Children } from 'react'
import styles from './Button.scss'
import classNames from 'classnames'

type Props = {
    children: Children,
    primary: boolean,
    secondary: boolean
}

const Button = ({ primary, secondary, children }: Props) =>
  <button className={classNames(styles.button, {
    [styles.primary]: primary,
    [styles.secondary]: secondary
  })}>{children}</button>

export default Button
