// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './Home.scss'
import logo from '../../assets/images/logo.png'

type Props = {
  children: React$Node,
  renderNavigation?: Function,
  excludeLogoText?: boolean,
  headerText: string
}

export default class HomeLayout extends Component<Props> {
  static defaultProps = {
    headerText: 'Login'
  }

  render = () => {
    const {
      children,
      renderNavigation,
      excludeLogoText,
      headerText
    } = this.props
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
            <img className={styles.logo} src={logo} alt="" />
            {!excludeLogoText && <h1> NEON </h1>}
          </div>
          <div className={styles.loginHeader}>{headerText}</div>
          {children}
        </div>
      </div>
    )
  }
}
