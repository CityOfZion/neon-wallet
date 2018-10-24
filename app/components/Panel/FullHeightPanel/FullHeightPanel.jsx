// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import greyLogo from '../../../assets/images/grey-logo.png'

import styles from './FullHeightPanel.scss'

type Props = {
  children: React$Node,
  renderBackButton?: () => React$Node,
  renderCloseButton?: () => React$Node,
  renderInstructions: () => React$Node,
  renderHeaderIcon: () => React$Node,
  shouldRenderHeader: Boolean,
  headerText: string,
  iconColor: string,
  className: string,
  containerClassName: string,
  headerContainerClassName: string,
  instructionsClassName: string
}

export default class ViewLayout extends Component<Props> {
  static defaultProps = {
    shouldRenderHeader: true,
    renderInstructions: () => <div> Enter Details </div>,
    iconColor: '#69E27E'
  }

  render() {
    const { children, className, containerClassName } = this.props

    return (
      <div className={classNames(styles.layoutContainer, className)}>
        <div
          className={classNames(styles.contentContainer, containerClassName)}
        >
          <div className={styles.navigation}>
            <span>{this.renderBackButton()}</span>
            <span>
              <img src={greyLogo} alt="logo" />
            </span>
            <span>{this.renderCloseButton()}</span>
          </div>
          {this.renderHeader()}
          {this.renderInstructions()}
          <div className={styles.childrenContainer}>{children}</div>
        </div>
      </div>
    )
  }

  renderCloseButton = () => {
    const { renderCloseButton } = this.props
    return (
      renderCloseButton && (
        <div className={styles.closeButton}>{renderCloseButton()}</div>
      )
    )
  }

  renderBackButton = () => {
    const { renderBackButton } = this.props
    return (
      renderBackButton && (
        <div className={styles.backButton}> {renderBackButton()} </div>
      )
    )
  }

  renderHeader = () => {
    const {
      shouldRenderHeader,
      headerContainerClassName,
      iconColor,
      headerText
    } = this.props
    return (
      shouldRenderHeader && (
        <div className={classNames(styles.header, headerContainerClassName)}>
          <div
            style={{ '--view-layout-header-icon-color': iconColor }}
            className={styles.headerIcon}
          >
            {this.renderHeaderIcon()}
          </div>
          {headerText}
        </div>
      )
    )
  }

  renderInstructions = () => {
    const { renderInstructions, instructionsClassName } = this.props
    return (
      renderInstructions && (
        <div className={classNames(styles.instructions, instructionsClassName)}>
          {' '}
          {renderInstructions()}{' '}
        </div>
      )
    )
  }

  renderHeaderIcon = () => {
    const { renderHeaderIcon } = this.props
    return renderHeaderIcon && renderHeaderIcon()
  }
}
