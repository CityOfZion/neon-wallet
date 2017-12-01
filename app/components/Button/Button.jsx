// @flow
import React from 'react'
import classNames from 'classnames'

import type { Children } from 'react'
import { noop } from 'lodash'

import styles from './Button.scss'

type Props = {
  children: Children,
  primary: boolean,
  cancel: boolean,
  secondary: boolean
}

const Button = ({
  primary = true,
  secondary = false,
  cancel = false,
  children
}: Props) =>
  <button onClick={noop}
    className={classNames(styles.button, {
      [styles.primary]: primary,
      [styles.secondary]: secondary,
      [styles.cancel]: cancel
    })}>{children}</button>

export default Button
