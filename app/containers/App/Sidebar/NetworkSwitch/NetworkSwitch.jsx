// @flow
import React, { Component } from 'react'

import classNames from 'classnames'
import SelectInput from '../../../../components/Inputs/SelectInput'
import { getNetworks } from '../../../../core/networks'
import styles from './NetworkSwitch.scss'

type Props = {
  networkId: string,
  onChange: Function,
  className: string,
  networkSwitchTextInputContainer?: string,
  networkSwitchTextInput?: string,
  activeStyles?: string,
  networks: Array<NetworkItemType>
}

export default class NetworkSwitch extends Component<Props> {
  static defaultProps = {
    networks: getNetworks()
  }

  render() {
    const {
      networkId,
      networks,
      className,
      networkSwitchTextInputContainer,
      networkSwitchTextInput,
      activeStyles
    } = this.props

    const items = networks.filter(network => network.id !== networkId)

    return (
      <div id="network" className={classNames(styles.networkSwitch, className)}>
        <SelectInput
          items={items}
          onChange={this.handleChange}
          renderItem={this.renderItem}
          activeStyles={activeStyles}
          textInputContainerClassName={networkSwitchTextInputContainer}
          textInputClassName={networkSwitchTextInput}
          value={this.getNetworkLabel()}
          readOnly
          customChangeEvent
        />
      </div>
    )
  }

  getNetworkLabel = () => {
    const { networkId, networks } = this.props
    const currentNetwork = networks.find(network => network.id === networkId)

    return currentNetwork.label
  }

  renderItem = (item: Object) => (
    <div
      key={item.id}
      onClick={this.handleChange}
      data-network={item.id}
      aria-label={item.label}
      className={styles.dropdownItem}
    >
      {item.label}
    </div>
  )

  handleChange = (event: Object) => {
    this.props.onChange(event.target.dataset.network)
  }
}
