// @flow
import React, { Component } from 'react'
import styles from './Home.scss'
import neonLogo from '../../images/neon-logo-redesign.png'

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
            <div className={styles.logoContainer}>
              <img
                className={
                  renderNavigation ? styles.logoWithNegativeMargin : styles.logo
                }
                src={neonLogo}
                alt=""
              />
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
