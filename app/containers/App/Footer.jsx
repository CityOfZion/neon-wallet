// @flow
import React from 'react'
import classNames from 'classnames'
import { shell } from 'electron'

import NetworkSwitch from './Sidebar/NetworkSwitch'

import styles from './Footer.scss'

type Props = {
  className?: string
}

export default class Footer extends React.Component<Props> {
  render() {
    return (
      <div className={classNames(styles.footer, this.props.className)}>
        <span className={styles.item}>
          <NetworkSwitch />
        </span>
        <span className={styles.item}>
          {/* eslint-disable-next-line */}
          <a href="#" onClick={this.handleSupport}>
            Community Support
          </a>
        </span>
      </div>
    )
  }

  handleSupport = (event: Object) => {
    event.preventDefault()
    shell.openExternal('https://discordapp.com/invite/R8v48YA')
  }
}
