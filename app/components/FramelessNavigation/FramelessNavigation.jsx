// @flow
import React from 'react'
import os from 'os'

import Exit from '../../assets/icons/exit.svg'
import Minimize from '../../assets/icons/minimize.svg'
import Maximize from '../../assets/icons/maximize.svg'
import styles from './FramelessNavigation.scss'

const { remote } = require('electron')

const win = remote.BrowserWindow.getFocusedWindow()

type Props = {}

const platforms = {
  WINDOWS: 'WINDOWS',
  MAC: 'MAC',
  LINUX: 'LINUX',
  SUN: 'SUN',
  OPENBSD: 'OPENBSD',
  ANDROID: 'ANDROID',
  AIX: 'AIX',
}

const platformsNames = {
  win32: platforms.WINDOWS,
  darwin: platforms.MAC,
  linux: platforms.LINUX,
  sunos: platforms.SUN,
  openbsd: platforms.OPENBSD,
  android: platforms.ANDROID,
  aix: platforms.AIX,
}

export default class HeaderBar extends React.PureComponent<Props> {
  minimize = () => {
    win.minimize()
  }

  maximize = () => {
    win.setFullScreen(!win.isFullScreen())
  }

  close = () => {
    win.close()
  }

  render() {
    const currentPlatform = platformsNames[os.platform()]

    return currentPlatform === 'MAC' ? null : (
      <div className={styles.container}>
        <div className={styles.innerButtonContaner}>
          <div className={styles.iconContainer}>
            <Minimize onClick={this.minimize} />
          </div>
          <div className={styles.iconContainer}>
            <Maximize onClick={this.maximize} />
          </div>
          <div className={styles.iconContainer}>
            <Exit onClick={this.close} />
          </div>
        </div>
      </div>
    )
  }
}
