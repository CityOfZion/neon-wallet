// @flow
import React, { Component } from 'react'

import styles from './PanelHeaderButton.scss'

type Props = {
  onClick: () => void,
  renderIcon: () => $ReactNode,
  buttonText: string,
  disabled: boolean
}

class PanelHeaderButton extends Component<Props> {
  render() {
    const { renderIcon, onClick, buttonText, disabled } = this.props

    return (
      <button
        type="button"
        className={styles.panelHeaderButton}
        onClick={onClick}
        disabled={disabled}
      >
        {renderIcon && renderIcon()} {buttonText}
      </button>
    )
  }
}

export default PanelHeaderButton
