// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './PanelHeaderButton.scss'

type Props = {
  onClick: () => void,
  renderIcon: () => React$Node,
  buttonText: string,
  className?: string,
  disabled?: boolean
}

class PanelHeaderButton extends Component<Props> {
  render() {
    const { renderIcon, onClick, buttonText, disabled, className } = this.props

    return (
      <button
        type="button"
        className={classNames(styles.panelHeaderButton, className)}
        onClick={onClick}
        disabled={disabled}
      >
        {renderIcon && renderIcon()} {buttonText}
      </button>
    )
  }
}

export default PanelHeaderButton
