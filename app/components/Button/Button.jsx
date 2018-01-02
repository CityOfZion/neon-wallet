// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash'

import styles from './Button.scss'

type Props = {
  className: string,
  primary: boolean,
  cancel: boolean,
  secondary: boolean
}

export default class Button extends React.Component<Props> {
  static defaultProps = {
    primary: true,
    secondary: false,
    cancel: false
  }

  render = () => {
    const { primary, secondary, cancel, className } = this.props
    const passDownProps = omit(this.props, 'primary', 'secondary', 'cancel', 'className')
    const classes = classNames(styles.button, className, {
      [styles.primary]: primary,
      [styles.secondary]: secondary,
      [styles.cancel]: cancel
    })

    return <button type='button' className={classes} {...passDownProps} />
  }
}
