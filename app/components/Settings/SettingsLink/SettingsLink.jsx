// @flow
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './SettingsLink.scss'
import DropdownIcon from '../../../assets/icons/dropdown.svg'

type Props = {
  title: string,
  route: string
}

export default class SettingsLink extends Component<Props> {
  render() {
    return (
      <NavLink className={styles.settingsLink} exact to={this.props.route}>
        <span className={styles.settingsLinkLabel}>{this.props.title}</span>
        <DropdownIcon className={styles.settingsLinkIcon} />
      </NavLink>
    )
  }
}
