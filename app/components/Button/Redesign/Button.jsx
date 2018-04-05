// @flow

import React, { Component } from 'react'
import { omit } from 'lodash'

import styles from './Button.scss'
import Login from '../../../images/icons/Login.svg'
import Plus from '../../../images/icons/Plus.svg'
import Wallet from '../../../images/icons/Wallet.svg'

const iconMap = name => {
  if (!name) {
    return console.warn('iconMap in Button.jsx invoked without a valid icon!')
  }

  const icons = {
    login: Login,
    plus: Plus,
    wallet: Wallet
  }
  return icons[name]
}

type Props = {
  icon: ?string,
  text: string,
  dark: ?boolean,
  light: ?boolean
}

class Button extends Component<Props> {
  render = () => {
    const { dark, light, text, icon } = this.props
    const passDownProps = omit(this.props, 'dark', 'light', 'icon')
    const Icon = iconMap(icon)
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
        {Icon ? (
          <Icon className={`${styles.icon} ${iconStyle}`} />
        ) : (
          <div className={styles.icon} />
        )}
        <span>{text}</span>
      </button>
    )
  }
}

export default Button
