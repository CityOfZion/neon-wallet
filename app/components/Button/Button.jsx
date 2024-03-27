// @flow
import React from 'react'
import classNames from 'classnames'
import { omit } from 'lodash-es'

import styles from './Button.scss'

type Props = {
  className?: ?string,
  renderIcon: ?Function,
  primary: ?boolean,
  active?: boolean,
  type: ?string,
  // will center label if rendered with icon
  shouldCenterButtonLabelText: boolean,
  children: React$Node,
  elevated?: boolean,
  outline?: boolean,
  iconClassName?: string,
  contentClassName?: string,
}

class Button extends React.Component<Props> {
  static defaultProps = {
    primary: false,
    type: 'button',
    shouldCenterButtonLabelText: false,
  }

  render = () => {
    const { className, contentClassName, children } = this.props
    const passDownProps = omit(
      this.props,
      'primary',
      'renderIcon',
      'active',
      'shouldCenterButtonLabelText',
      'elevated',
      'outline',
      'iconClassName',
      'contentClassName',
    )

    return (
      <button
        {...passDownProps}
        className={classNames(
          styles.button,
          className,
          this.getActiveButtonStyle(),
          this.getButtonStyle(),
          this.getElevatedSecondaryStyle(),
          this.getOutlineStyle(),
        )}
      >
        {this.renderIcon()}
        <span className={contentClassName}>{children}</span>
      </button>
    )
  }

  renderIcon = () => {
    const {
      renderIcon,
      shouldCenterButtonLabelText,
      iconClassName,
    } = this.props

    if (renderIcon) {
      return (
        <span
          className={classNames(
            styles.icon,
            { [styles.centeredLabel]: shouldCenterButtonLabelText },
            this.getIconStyle(),
            iconClassName,
          )}
        >
          {renderIcon()}
        </span>
      )
    }
    return null
  }

  getActiveButtonStyle = () => (this.props.active ? styles.active : undefined)

  getElevatedSecondaryStyle = () =>
    this.props.elevated ? styles.secondaryRaised : undefined

  getButtonStyle = () =>
    this.props.primary || this.props.elevated
      ? styles.primary
      : styles.secondary

  getIconStyle = () => (this.props.primary ? styles.primary : styles.secondary)

  getOutlineStyle = () => (this.props.outline ? styles.outline : undefined)
}

export default Button
