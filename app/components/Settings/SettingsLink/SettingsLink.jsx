// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import styles from './SettingsLink.scss'
import DropdownIcon from '../../../assets/icons/dropdown.svg'

type Props = {
  title: string,
  to: string,
  noBorderBottom?: boolean,
  label?: string,
  onClick?: Function,
  renderIcon?: Function
}

export default class SettingsLink extends Component<Props> {
  render() {
    return this.props.onClick ? (
      <div
        className={classNames(styles.settingsLink, {
          [styles.noBorderBottom]: this.props.noBorderBottom
        })}
        onClick={this.props.onClick}
      >
        {this.props.renderIcon && (
          <div className={styles.icon}>{this.props.renderIcon()} </div>
        )}
        <span className={styles.settingsLinkLabel}>{this.props.title}</span>
        <label className={styles.greenLabel}>{this.props.label}</label>
        <DropdownIcon className={styles.settingsLinkIcon} />
      </div>
    ) : (
      <Link
        className={classNames(styles.settingsLink, {
          [styles.noBorderBottom]: this.props.noBorderBottom
        })}
        to={this.props.to}
      >
        {this.props.renderIcon && (
          <div className={styles.icon}>{this.props.renderIcon()} </div>
        )}
        <span className={styles.settingsLinkLabel}>{this.props.title}</span>
        <label className={styles.greyLabel}>{this.props.label}</label>
        <DropdownIcon className={styles.settingsLinkIcon} />
      </Link>
    )
  }
}
