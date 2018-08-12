// @flow
import React, { Component } from 'react'

import { getNetworks } from '../../../core/networks'
import SelectInput from '../../Inputs/SelectInput/SelectInput'
import styles from './NetworkSwitch.scss'

type Props = {
  networkId: string,
  onChange: Function,
  networks: Array<NetworkItemType>
}

export default class NetworkSwitch extends Component<Props> {
  static defaultProps = {
    networks: getNetworks()
  }

  render() {
    const { networkId, networks } = this.props
    const { label } =
      (Array.isArray(networks) &&
        networks.find(network => network.id === networkId)) ||
      {}

    return (
      <div id="network" className={styles.networkSwitch}>
        <span className={styles.label}>Running on</span>
        <SelectInput
          className="NetworkSelector"
          items={
            Array.isArray(networks)
              ? networks.map(network => network.label)
              : []
          }
          value={label || ''}
          placeholder=""
          onChange={this.handleChange}
          getItemValue={value =>
            Array.isArray(networks) &&
            networks.find(network => network.label === value).id
          }
        />
      </div>
    )
  }

  handleChange = (value: string) => {
    this.props.onChange(value)
  }
}
