// @flow

import React from 'react'
import Switch from 'react-switch'

import themes from '../../../themes'
import styles from './Switch.scss'
import { THEMES } from '../../../core/constants'

type Props = {
  theme: string,
  handleCheck: boolean => any,
  checked: boolean
}

export default class NeonSwitch extends React.Component<Props> {
  hangleChange: () => boolean

  handleChange = (checked: boolean) => {
    this.props.handleCheck(checked)
  }

  render() {
    const { theme, checked } = this.props
    const onColor = theme === THEMES.LIGHT ? '#69e27e' : '#66ED87'
    return (
      <label htmlFor="neon-switch">
        <Switch
          checked={checked}
          onChange={this.handleChange}
          onColor={onColor}
          handleDiameter={28}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0 2px 2px 0 rgba(0,0,0,0.18)"
          activeBoxShadow="0 2px 2px 0 rgba(0,0,0,0.18)"
          height={32}
          width={51}
          id="neon-switch"
        />
      </label>
    )
  }
}
