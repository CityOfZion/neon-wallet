// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash'

import styles from './Button.scss'

type Props = {
  className?: ?string,
  renderIcon: ?Function,
  primary: ?boolean,
  active?: boolean,
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
    const passDownProps = omit(this.props, 'primary', 'renderIcon', 'active')

    return (
      <button
        {...passDownProps}
        className={classNames(
          styles.button,
          className,
          this.getActiveButtonStyle(),
          this.getButtonStyle()
        )}
      >
        {this.renderIcon()}
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
    return null
  }

  getActiveButtonStyle = () => (this.props.active ? styles.active : undefined)

  getButtonStyle = () => (this.props.primary ? styles.dark : styles.light)

  getIconStyle = () => (this.props.primary ? styles.light : styles.dark)
}

export default Button
