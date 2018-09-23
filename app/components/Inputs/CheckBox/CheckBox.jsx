// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import styles from './CheckBox.scss'

type Props = {
  onChange: () => void,
  icon: React$Node,
  className?: string,
  checked: boolean
}

type State = {
  checked: boolean
}

class CheckBox extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      checked: this.props.checked
    }
  }

  toggleCheckBox = () => {
    const { onChange } = this.props
    this.setState(prevState => ({ checked: !prevState.checked }), onChange)
  }

  render() {
    const { checked } = this.state
    const { icon, className } = this.props
    const classes = classNames(styles.checkBox, className, {
      [styles.checkBoxActive]: checked
    })
    return (
      <button
        aria-checked={checked}
        onClick={this.toggleCheckBox}
        type="button"
        role="checkbox"
        className={classes}
      >
        {checked && icon}
      </button>
    )
  }
}
export default CheckBox
