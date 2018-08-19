// flow
import React, { Component } from 'react'

import CheckMarkIcon from '../../../assets/icons/check.svg'

import styles from './CheckBox.scss'

type Props = {
  onChange: Function
}

type State = {
  checked: boolean
}

class CheckBox extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      checked: false
    }
  }

  toggleCheckBox = () => {
    const { onChange } = this.props
    this.setState(prevState => ({ checked: !prevState.checked }), onChange)
  }

  render() {
    const { checked } = this.state
    return (
      <button
        aria-checked={checked}
        onClick={this.toggleCheckBox}
        type="button"
        role="checkbox"
        className={styles.checkBox}
      >
        {checked && <CheckMarkIcon />}
      </button>
    )
  }
}

export default CheckBox
