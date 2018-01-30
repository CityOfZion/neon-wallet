// @flow
import React, { Component } from 'react'

import headerStyles from '../Header.scss'

type Props = {
  networkId: string,
  setNetworkId: (string) => any,
  loadWalletData: Function,
  networks: Array<NetworkItemType>
}

export default class NetworkSwitch extends Component<Props> {
  chooseNetwork = (e: Object) => {
    const { setNetworkId, loadWalletData } = this.props
    const newNetId = e.target.value
    setNetworkId(newNetId)
    loadWalletData(false)
  }

  render () {
    const { networkId, networks } = this.props
    return (
      <div id='network' className={headerStyles.navBarItem}>
        <span className={headerStyles.navBarItemLabel}>Running on</span>
        <select defaultValue={networkId} onChange={this.chooseNetwork} className='networkSelector'>
          {networks.map(({ label, id }: NetworkItemType) =>
            <option key={`networkOption${id}`} value={id}>{label}</option>
          )}
        </select>
      </div>
    )
  }
}
