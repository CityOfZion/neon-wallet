// @flow
import React, { Component } from 'react'
import styles from './Home.scss'
import neonLogo from '../../images/neon-logo-redesign.png'

type Props = {
  children: React$Node,
  renderNavigation?: Function,
  excludeLogo?: boolean
}

export default class HomeLayout extends Component<Props> {
  render = () => {
    const { children, renderNavigation, excludeLogo } = this.props
    return (
      <div id="home" className={styles.homeContainer}>
        <div className={styles.innerHomeContainer}>
          {renderNavigation && renderNavigation()}
          <div className={styles.logoContainer}>
            {!excludeLogo && (
              <img
                className={
                  renderNavigation ? styles.logoWithNegativeMargin : styles.logo
                }
                src={neonLogo}
                alt=""
              />
            )}
            {<h1> NEON </h1>}
          </div>
          <div className={styles.loginHeader}> Login </div>
          {children}
        </div>
      </div>
    )
  }
}
