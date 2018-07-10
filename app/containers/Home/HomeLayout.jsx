// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './Home.scss'
import logo from '../../assets/images/logo.png'

type Props = {
  children: React$Node,
  renderNavigation?: Function,
  excludeLogoText?: boolean,
  excludeHeaderText: boolean,
  excludeLogo: boolean,
  headerText: string,
  headerTextUnderline: boolean
}

export default class HomeLayout extends Component<Props> {
  static defaultProps = {
    headerText: 'Login',
    excludeHeaderText: false,
    excludeLogo: false,
    headerTextUnderline: false
  }

  render = () => {
    const {
      children,
      renderNavigation,
      excludeLogoText,
      headerText,
      excludeHeaderText,
      excludeLogo,
      headerTextUnderline
    } = this.props
    return (
      <div id="home" className={styles.homeContainer}>
        <div className={styles.innerHomeContainer}>
          {renderNavigation && renderNavigation()}
          {!excludeLogo && (
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
          )}
          {!excludeHeaderText && (
            <div
              style={
                headerTextUnderline
                  ? {
                      borderBottom: 'solid thin rgba(0, 0, 0, 0.15)',
                      paddingBottom: '20px'
                    }
                  : undefined
              }
              className={styles.loginHeader}
            >
              {' '}
              {headerText}{' '}
            </div>
          )}
          {children}
        </div>
      </div>
    )
  }
}
