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
  transparent: boolean,
  shouldSwitchNetworks: boolean,
  loadWalletData: (network: string) => void,
  settingsSelect: boolean,
  fontSize: number,
  net: string,
  isDisabled?: boolean,
  hideChevron?: Boolean,
  chain: string,
}

const NetworkSwitch = ({
  className,
  disabled,
  transparent,
  fontSize,
  settingsSelect,
  isDisabled,
  hideChevron,
  chain,
  shouldSwitchNetworks = true,
  handleControlledChange,
  onChange,
  loadWalletData,
  controlledNet,
  net,
}: Props) => {
  const networks = getNetworks(chain)

  const handleChange = (option: NetworkItemType) => {
    if (shouldSwitchNetworks) {
      onChange(option.id)
      const network = option.id === '1' ? 'MainNet' : 'TestNet'
      loadWalletData(network)
    } else {
      handleControlledChange(option)
    }
  }

  return (
    <div id="network" className={classNames(styles.networkSwitch, className)}>
      <StyledReactSelect
        fontSize={fontSize}
        transparent={transparent}
        settingsSelect={settingsSelect}
        hideHighlight
        disabled={disabled}
        value={{
          label: findNetworkByDeprecatedLabel(controlledNet || net, chain)
            .label,
        }}
        onChange={handleChange}
        options={networks}
        isSearchable={false}
        isDisabled={isDisabled}
        hideChevron={hideChevron}
      />
    </div>
  )
}

export default NetworkSwitch
