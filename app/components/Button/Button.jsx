// @flow
import React from 'react'
import type { Children } from 'react'
import { noop } from 'lodash'
import styles from './Button.scss'
import classNames from 'classnames'

type Props = {
    children: Children,
    primary: boolean,
    cancel: boolean,
    onClick: () => any,
    secondary: boolean
}

const Button = ({
  primary = true,
  secondary = false,
  cancel = false,
  onClick = noop,
  children
}: Props) =>
  <button onClick={onClick}
    className={classNames(styles.button, {
      [styles.primary]: primary,
      [styles.secondary]: secondary,
      [styles.cancel]: cancel
    })}>{children}</button>

export default Button
