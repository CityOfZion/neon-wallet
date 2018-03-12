// @flow
import React, { Component } from 'react'

import { getNetworks } from '../../../../core/networks'
import styles from '../Header.scss'

type Props = {
  networkId: string,
  onChange: Function,
  networks: Array<NetworkItemType>
}

export default class NetworkSwitch extends Component<Props> {
  static defaultProps = {
    networks: getNetworks()
  }

  render () {
    const { networkId, networks } = this.props
    return (
      <div id='network' className={styles.navBarItem}>
        <span className={styles.navBarItemLabel}>Running on</span>
        <select defaultValue={networkId} onChange={this.handleChange} className='networkSelector'>
          {networks.map(({ label, id }: NetworkItemType) =>
            <option key={`networkOption${id}`} value={id}>{label}</option>
          )}
        </select>
      </div>
    )
  }

  handleChange = (event: Object) => {
    this.props.onChange(event.target.value)
  }
}
