// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './Home.scss'
import lightLogo from '../../assets/images/logo-light.png'
import darkLogo from '../../assets/images/logo-dark.png'

type Props = {
  children: React$Node,
  renderNavigation?: Function,
  headerText: string,
  theme: ThemeType
}

export default class HomeLayout extends Component<Props> {
  static defaultProps = {
    headerText: 'Login'
  }

  render = () => {
    const { children, renderNavigation, headerText, theme } = this.props
    const dynamicImage = theme === 'Light' ? lightLogo : darkLogo
    return (
      <div id="home" className={styles.homeContainer}>
        <div className={styles.innerHomeContainer}>
          {renderNavigation && renderNavigation()}
          <div
            className={
              renderNavigation
                ? classNames(
                    styles.logoWithNegativeMargin,
                    styles.logoContainer
                  )
                : styles.logoContainer
            }
          >
            <img className={styles.logo} src={dynamicImage} alt="" />
          </div>
          <div className={styles.loginHeader}>{headerText}</div>
          {children}
        </div>
      </div>
    )
  }
}
