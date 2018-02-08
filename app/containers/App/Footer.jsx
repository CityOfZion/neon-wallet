// @flow
import React from 'react'
import classNames from 'classnames'
import { shell } from 'electron'

import NetworkSwitch from './Sidebar/NetworkSwitch'

import styles from './Footer.scss'

const openDiscordLink = () => shell.openExternal('https://discordapp.com/invite/R8v48YA')

type Props = {
  className?: string
}

const Footer = ({ className }: Props) => {
  return (
    <div className={classNames(styles.footer, className)}>
      <span className={styles.item}>
        <NetworkSwitch />
      </span>
      <span className={styles.item}>
        <a href='#' onClick={openDiscordLink}>Community Support</a>
      </span>
    </div>
  )
}

export default Footer
