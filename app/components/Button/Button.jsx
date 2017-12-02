// @flow
import React from 'react'
import classNames from 'classnames'

import styles from './Button.scss'

type Props = {
  children: React$Node,
  primary: boolean,
  cancel: boolean,
  secondary: boolean,
  onClick?: () => any
}

const Button = ({
  primary = true,
  secondary = false,
  cancel = false,
  children,
  onClick
}: Props) =>
  <button onClick={onClick}
    className={classNames(styles.button, {
      [styles.primary]: primary,
      [styles.secondary]: secondary,
      [styles.cancel]: cancel
    })}>{children}</button>

export default Button
