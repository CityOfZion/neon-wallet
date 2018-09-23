// @flow
import React, { Component } from 'react'

import styles from './SettingsItem.scss'

type Props = {
  title: string,
  children: React$Node
}

export default class SettingsItem extends Component<Props> {
  render() {
    return (
      <div className={styles.settingsItem}>
        <span className={styles.settingsItemLabel}>{this.props.title}</span>
        {this.props.children}
      </div>
    )
  }
}
