// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash'

import styles from './Button.scss'

type Props = {
  className?: ?string,
  renderIcon: ?Function,
  primary: ?boolean,
  type: ?string,
  children: React$Node
}

class Button extends React.Component<Props> {
  static defaultProps = {
    primary: false,
    type: 'button'
  }

  render = () => {
    const { className, children } = this.props
    const passDownProps = omit(this.props, 'primary', 'renderIcon')

    return (
      <button
        {...passDownProps}
        className={classNames(styles.button, className, this.getButtonStyle())}
      >
        {this.renderIcon()}
        <span>{children}</span>
      </button>
    )
  }

  renderIcon = () => {
    const { renderIcon } = this.props

    if (renderIcon && typeof renderIcon === 'function') {
      return (
        <span className={classNames(styles.icon, this.getIconStyle())}>
          {renderIcon()}
        </span>
      )
    } else {
      return <div className={styles.icon} />
    }
  }

  getButtonStyle = () => {
    return this.props.primary ? styles.dark : styles.light
  }

  getIconStyle = () => {
    return this.props.primary ? styles.light : styles.dark
  }
}

export default Button
