// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import StyledReactSelect from '../../../../components/Inputs/StyledReactSelect/StyledReactSelect'
import {
  getNetworks,
  findNetworkByDeprecatedLabel,
} from '../../../../core/networks'
import styles from './NetworkSwitch.scss'
import { useWalletConnect } from '../../../../context/WalletConnect/WalletConnectContext'

type Props = {
  onChange: Function,
  handleControlledChange: Function,
  controlledNet: string,
  className: string,
  disabled: boolean,
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
  const walletConnectCtx = useWalletConnect()

  const handleChange = async (option: NetworkItemType) => {
    if (shouldSwitchNetworks) {
      onChange(option.id)
      if (walletConnectCtx.resetApp) {
        walletConnectCtx.resetApp()
        await walletConnectCtx.init()
      }
      setTimeout(() => {
        loadWalletData()
      }, 0)
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
