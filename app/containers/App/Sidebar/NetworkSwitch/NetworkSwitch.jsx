// @flow
import React, { Component } from 'react'

import classNames from 'classnames'
import StyledReactSelect from '../../../../components/Inputs/StyledReactSelect/StyledReactSelect'
import { getNetworks } from '../../../../core/networks'
import styles from './NetworkSwitch.scss'

type Props = {
  onChange: Function,
  handleControlledChange: Function,
  className: string,
  disabled: boolean,
  networks: Array<NetworkItemType>,
  transparent: boolean,
  shouldSwitchNetworks: boolean,
  loadWalletData: () => void,
  settingsSelect: boolean,
  fontSize: number,
  value: NetworkItemType
}

export default class NetworkSwitch extends Component<Props> {
  static defaultProps = {
    networks: getNetworks(),
    shouldSwitchNetworks: true
  }

  render() {
    const {
      networks,
      className,
      disabled,
      transparent,
      fontSize,
      settingsSelect,
      value
    } = this.props

    return (
      <div id="network" className={classNames(styles.networkSwitch, className)}>
        <StyledReactSelect
          fontSize={fontSize}
          transparent={transparent}
          settingsSelect={settingsSelect}
          hideHighlight
          disabled={disabled}
          value={value}
          onChange={this.handleChange}
          options={networks}
          isSearchable={false}
        />
      </div>
    )
  }

  handleChange = (option: NetworkItemType) => {
    if (this.props.shouldSwitchNetworks) {
      this.props.onChange(option.id)
      setTimeout(() => {
        this.props.loadWalletData()
      }, 0)
    } else {
      this.props.handleControlledChange(option)
    }
  }
}
