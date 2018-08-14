// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import styles from './SettingsLink.scss'
import DropdownIcon from '../../../assets/icons/dropdown.svg'

type Props = {
  title: string,
  to: string
}

export default class SettingsLink extends Component<Props> {
  render() {
    return (
      <Link className={styles.settingsLink} to={this.props.to}>
        <span className={styles.settingsLinkLabel}>{this.props.title}</span>
        <DropdownIcon className={styles.settingsLinkIcon} />
      </Link>
    )
  }
}
