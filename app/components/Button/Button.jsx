// @flow

import React, { Component } from 'react'
import { omit } from 'lodash'

import styles from './Button.scss'

type Props = {
  renderIcon: ?Function,
  text: string,
  primary: ?boolean,
  secondary: ?boolean
}

class Button extends Component<Props> {
  render = () => {
    const { primary, secondary, text, renderIcon } = this.props
    const passDownProps = omit(this.props, 'primary', 'secondary')
    const conditionalStyles = {}
    if (primary) {
      conditionalStyles.buttonStyle = styles.darkButton
      conditionalStyles.iconStyle = styles.lightIcon
    } else if (secondary) {
      conditionalStyles.buttonStyle = styles.lightButton
      conditionalStyles.iconStyle = styles.darkIcon
    }
    const { iconStyle, buttonStyle } = conditionalStyles

    return (
      <button
        className={`${styles.buttonRedesign} ${buttonStyle}`}
        {...passDownProps}
      >
        {renderIcon ? (
          <span className={`${styles.icon} ${iconStyle}`}>{renderIcon()}</span>
        ) : (
          <div className={styles.icon} />
        )}
        <span>{text}</span>
      </button>
    )
  }
}

export default Button
