// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import greyLogo from '../../assets/images/grey-logo.png'

import styles from './ViewLayout.scss'

type Props = {
  children: React$Node,
  renderBackButton?: Function,
  shouldRenderHeader: Boolean,
  headerText: string,
  instructions: string,
  renderHeaderIcon: Function
}

export default class ViewLayout extends Component<Props> {
  static defaultProps = {
    shouldRenderHeader: true,
    instructions: 'Enter Details'
  }

  render() {
    const {
      children,
      renderBackButton,
      headerText,
      shouldRenderHeader,
      instructions
    } = this.props

    return (
      <div className={styles.layoutContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.navigation}>
            {renderBackButton && (
              <div className={styles.backButton}> {renderBackButton()} </div>
            )}
            <img src={greyLogo} alt="logo" />
          </div>
          {shouldRenderHeader && (
            <div className={styles.header}>
              <div className={styles.headerIcon}>{this.renderHeaderIcon()}</div>
              {headerText}
            </div>
          )}
          {instructions && (
            <div className={styles.instructions}> {instructions} </div>
          )}
          <div className={styles.childrenContainer}>{children}</div>
        </div>
      </div>
    )
  }

  renderHeaderIcon = () => {
    const { renderHeaderIcon } = this.props
    if (renderHeaderIcon) {
      return renderHeaderIcon()
    }
    return null
  }
}
