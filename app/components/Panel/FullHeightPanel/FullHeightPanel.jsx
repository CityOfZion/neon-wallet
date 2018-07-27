// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import greyLogo from '../../../assets/images/grey-logo.png'

import styles from './FullHeightPanel.scss'

type Props = {
  children: React$Node,
  renderBackButton?: Function,
  shouldRenderHeader: Boolean,
  shouldRenderInstructions: Boolean,
  headerText: string,
  instructions: string,
  renderHeaderIcon: Function,
  iconColor: string,
  renderCloseButton: Function,
  className: string,
  headerContainerClassName: string
}

export default class ViewLayout extends Component<Props> {
  static defaultProps = {
    shouldRenderHeader: true,
    instructions: 'Enter Details',
    shouldRenderInstructions: true,
    iconColor: '#66ed87'
  }

  render() {
    const {
      children,
      renderBackButton,
      headerText,
      shouldRenderHeader,
      instructions,
      shouldRenderInstructions,
      iconColor,
      renderCloseButton,
      className,
      headerContainerClassName
    } = this.props

    return (
      <div className={classNames(styles.layoutContainer, className)}>
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
            <div
              className={classNames(styles.header, headerContainerClassName)}
            >
              <div
                style={{ '--view-layout-header-icon-color': iconColor }}
                className={styles.headerIcon}
              >
                {this.renderHeaderIcon()}
              </div>
              {headerText}
            </div>
          )}
          {shouldRenderInstructions &&
            instructions && (
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
