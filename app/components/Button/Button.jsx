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
  displayButtonIcon?: boolean,
  children: React$Node
}

class Button extends React.Component<Props> {
  static defaultProps = {
    primary: false,
    type: 'button',
    displayButtonIcon: true
  }

  render = () => {
    const { className, children, displayButtonIcon } = this.props
    const passDownProps = omit(
      this.props,
      'primary',
      'renderIcon',
      'displayButtonIcon'
    )

    return (
      <button
        {...passDownProps}
        className={classNames(styles.button, className, this.getButtonStyle())}
      >
        {displayButtonIcon && this.renderIcon()}
        <span>{children}</span>
      </button>
    )
  }

  renderIcon = () => {
    const { renderIcon } = this.props

    if (renderIcon) {
      return (
        <span className={classNames(styles.icon, this.getIconStyle())}>
          {renderIcon()}
        </span>
      )
    }
    return <div className={styles.icon} />
  }

  getButtonStyle = () => (this.props.primary ? styles.dark : styles.light)

  getIconStyle = () => (this.props.primary ? styles.light : styles.dark)
}

export default Button
