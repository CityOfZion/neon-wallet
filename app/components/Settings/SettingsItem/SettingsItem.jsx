// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './SettingsItem.scss'

type Props = {
  title: string,
  children: React$Node,
  noBorderBottom?: boolean,
  renderIcon?: Function
}

export default class SettingsItem extends Component<Props> {
  render() {
    return (
      <div
        className={classNames(styles.settingsItem, {
          [styles.noBorderBottom]: this.props.noBorderBottom
        })}
      >
        {this.props.renderIcon && (
          <div className={styles.icon}>{this.props.renderIcon()} </div>
        )}
        <span className={styles.settingsItemLabel}>{this.props.title}</span>
        {this.props.children}
      </div>
    )
  }
}
