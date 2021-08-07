// @flow
import React, { Component } from 'react'

import classNames from 'classnames'
import StyledReactSelect from '../../../../components/Inputs/StyledReactSelect/StyledReactSelect'
import {
  getNetworks,
  findNetworkByDeprecatedLabel,
} from '../../../../core/networks'
import styles from './NetworkSwitch.scss'

type Props = {
  onChange: Function,
  handleControlledChange: Function,
  controlledNet: string,
  className: string,
  disabled: boolean,
  // networks: Array<NetworkItemType>,
  transparent: boolean,
  shouldSwitchNetworks: boolean,
  loadWalletData: () => void,
  settingsSelect: boolean,
  fontSize: number,
  net: string,
  isDisabled?: boolean,
  hideChevron?: Boolean,
  chain: string,
}

export default class NetworkSwitch extends Component<Props> {
  static defaultProps = {
    shouldSwitchNetworks: true,
  }

  render() {
    const {
      className,
      disabled,
      transparent,
      fontSize,
      settingsSelect,
      isDisabled,
      hideChevron,
      chain,
    } = this.props

    const networks = getNetworks(chain)

    return (
      <div id="network" className={classNames(styles.networkSwitch, className)}>
        <StyledReactSelect
          fontSize={fontSize}
          transparent={transparent}
          settingsSelect={settingsSelect}
          hideHighlight
          disabled={disabled}
          value={{
            label: findNetworkByDeprecatedLabel(
              this.props.controlledNet || this.props.net,
              chain,
            ).label,
          }}
          onChange={this.handleChange}
          options={networks}
          isSearchable={false}
          isDisabled={isDisabled}
          hideChevron={hideChevron}
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
