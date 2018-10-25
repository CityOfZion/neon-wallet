import React from 'react'
import Switch from 'react-switch'

import styles from './Switch.scss'

export default class BasicExample extends React.Component {
  constructor() {
    super()
    this.state = { checked: false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(checked) {
    this.setState({ checked })
  }

  render() {
    return (
      <div className="example">
        <h2>Simple usage</h2>
        <label htmlFor="normal-switch">
          <span>Switch with default style</span>
          <Switch
            onChange={this.handleChange}
            checked={this.state.checked}
            className="react-switch"
            id="normal-switch"
          />
        </label>
        <p>
          The switch is <span>{this.state.checked ? 'on' : 'off'}</span>.
        </p>
      </div>
    )
  }
}
