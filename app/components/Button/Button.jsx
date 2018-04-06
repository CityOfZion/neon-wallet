// @flow

import React, { Component } from 'react'
import { omit } from 'lodash'

import styles from './Button.scss'

type Props = {
  renderIcon: ?Function,
  text: string,
  dark: ?boolean,
  light: ?boolean
}

class Button extends Component<Props> {
  render = () => {
    const { dark, light, text, renderIcon } = this.props
    const passDownProps = omit(this.props, 'dark', 'light')
    const conditionalStyles = {}
    if (dark) {
      conditionalStyles.buttonStyle = styles.darkButton
      conditionalStyles.iconStyle = styles.lightIcon
    } else if (light) {
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
