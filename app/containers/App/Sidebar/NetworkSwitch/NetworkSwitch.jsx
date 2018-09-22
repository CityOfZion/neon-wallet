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
  networks: Array<NetworkItemType>
}

export default class NetworkSwitch extends Component<Props> {
  static defaultProps = {
    networks: getNetworks()
  }

  render() {
    const { networkId, networks, className } = this.props

    const items = networks.filter(network => network.id !== networkId)

    return (
      <div id="network" className={classNames(styles.networkSwitch, className)}>
        <SelectInput
          items={items}
          onChange={this.handleChange}
          renderItem={this.renderItem}
          activeStyles={styles.networkSwitchActive}
          textInputContainerClassName={styles.networkSwitchTextInputContainer}
          textInputClassName={styles.networkSwitchTextInput}
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
    if (currentNetwork) {
      return currentNetwork.label
    }
    return ''
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
