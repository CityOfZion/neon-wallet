// @flow
import React, { Component } from 'react'

import { NETWORK } from '../../../../core/constants'

import headerStyles from '../Header.scss'

type Props = {
  net: NetworkType,
  setNetwork: Function,
  loadWalletData: Function
}

export default class NetworkSwitch extends Component<Props> {
  chooseNetwork = (e: Object) => {
    const { setNetwork, loadWalletData } = this.props
    const newNet = e.target.value
    setNetwork(newNet)
    loadWalletData(false)
  }

  render () {
    const { net } = this.props
    return (
      <div id='network' className={headerStyles.navBarItem}>
        <span className={headerStyles.navBarItemLabel}>Running on</span>
        <select defaultValue={net} onChange={this.chooseNetwork} className='networkSelector'>
          <option value={NETWORK.MAIN}>{NETWORK.MAIN}</option>
          <option value={NETWORK.TEST}>{NETWORK.TEST}</option>
        </select>
      </div>
    )
  }
}
