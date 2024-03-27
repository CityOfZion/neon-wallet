// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import { FormattedMessage } from 'react-intl'
import greyLogo from '../../../assets/images/grey-logo.png'

import styles from './FullHeightPanel.scss'

type Props = {
  children: React$Node,
  renderBackButton?: () => React$Node,
  renderCloseButton?: () => React$Node,
  renderInstructions: () => React$Node,
  renderHeaderIcon: () => React$Node,
  shouldRenderHeader: Boolean,
  shouldRenderNavigation: Boolean,
  headerText: string,
  className: string,
  containerClassName: string,
  headerContainerClassName: string,
  instructionsClassName: string,
  childrenContainerClassName: string,
  scrollableContentClassName: string,
}

export default class ViewLayout extends Component<Props> {
  static defaultProps = {
    shouldRenderHeader: true,
    shouldRenderNavigation: true,
    renderInstructions: () => (
      <div>
        <FormattedMessage id="walletCreationInstruction" />
      </div>
    ),
    iconColor: '#4CFFB3',
  }

  render() {
    const {
      children,
      className,
      containerClassName,
      childrenContainerClassName,
      scrollableContentClassName,
      shouldRenderNavigation,
    } = this.props

    return (
      <div className={classNames(styles.layoutContainer, className)}>
        <div
          className={classNames(styles.contentContainer, containerClassName)}
        >
          {shouldRenderNavigation && (
            <div className={styles.navigation}>
              <span>{this.renderBackButton()}</span>
              <span>
                <img src={greyLogo} alt="logo" />
              </span>
              <span>{this.renderCloseButton()}</span>
            </div>
          )}
          <div
            className={classNames(
              scrollableContentClassName,
              styles.scrollableContent,
            )}
          >
            {this.renderHeader()}
            {this.renderInstructions()}

            <div
              className={classNames(
                styles.childrenContainer,
                childrenContainerClassName,
              )}
            >
              {children}
            </div>
          </div>
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
      headerText,
    } = this.props
    return (
      shouldRenderHeader && (
        <div className={classNames(styles.header, headerContainerClassName)}>
          <div className={styles.headerIcon}>{this.renderHeaderIcon()}</div>
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
          {renderInstructions()}
        </div>
      )
    )
  }

  renderHeaderIcon = () => {
    const { renderHeaderIcon } = this.props
    return renderHeaderIcon && renderHeaderIcon()
  }
}
