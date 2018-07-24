// @flow
import React, { Component } from 'react'

import greyLogo from '../../../assets/images/grey-logo.png'

import styles from './FullHeightPanel.scss'

type Props = {
  children: React$Node,
  renderBackButton?: Function,
  shouldRenderHeader: Boolean,
  headerText: string,
  instructions: string,
  renderHeaderIcon: Function,
  iconColor: string,
  renderCloseButton: Function
}

export default class ViewLayout extends Component<Props> {
  static defaultProps = {
    shouldRenderHeader: true,
    instructions: 'Enter Details',
    iconColor: '#66ed87'
  }

  render() {
    const {
      children,
      renderBackButton,
      headerText,
      shouldRenderHeader,
      instructions,
      iconColor,
      renderCloseButton
    } = this.props

    return (
      <div className={styles.layoutContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.navigation}>
            <span>
              {renderBackButton && (
                <div className={styles.backButton}> {renderBackButton()} </div>
              )}
            </span>
            <span>
              <img src={greyLogo} alt="logo" />
            </span>
            <span>
              {renderCloseButton && (
                <div className={styles.closeButton}>{renderCloseButton()}</div>
              )}
            </span>
          </div>
          {shouldRenderHeader && (
            <div className={styles.header}>
              <div
                style={{ '--view-layout-header-icon-color': iconColor }}
                className={styles.headerIcon}
              >
                {this.renderHeaderIcon()}
              </div>
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
