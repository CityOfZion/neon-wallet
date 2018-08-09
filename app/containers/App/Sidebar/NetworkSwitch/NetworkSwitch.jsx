// @flow
import React, { Component } from 'react'

import classNames from 'classnames'
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
    return (
      <div id="network" className={classNames(styles.networkSwitch, className)}>
        <span className={styles.label}>Running on</span>
        <select
          defaultValue={networkId}
          onChange={this.handleChange}
          className="networkSelector"
        >
          {networks.map(({ label, id }: NetworkItemType) => (
            <option key={`networkOption${id}`} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
    )
  }

  handleChange = (event: Object) => {
    this.props.onChange(event.target.value)
  }
}
