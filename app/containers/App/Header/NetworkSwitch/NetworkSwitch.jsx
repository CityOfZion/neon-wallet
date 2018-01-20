// @flow
import React, { Component } from 'react'

import headerStyles from '../Header.scss'

type Props = {
  networkId: string,
  onChange: Function,
  networks: Array<NetworkItemType>
}

export default class NetworkSwitch extends Component<Props> {
  render () {
    const { networkId, networks } = this.props
    return (
      <div id='network' className={headerStyles.navBarItem}>
        <span className={headerStyles.navBarItemLabel}>Running on</span>
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
