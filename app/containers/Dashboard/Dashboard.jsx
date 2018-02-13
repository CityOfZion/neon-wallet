// @flow
import React, { Component } from 'react'

import AssetBalancesPanel from '../../components/Dashboard/AssetBalancesPanel'
import TokenBalancesPanel from '../../components/Dashboard/TokenBalancesPanel'
import PriceHistoryPanel from '../../components/Dashboard/PriceHistoryPanel'
import { log } from '../../util/Logs'

import styles from './Dashboard.scss'

type Props = {
  net: string,
  address: string,
  loadWalletData: Function,
}

const REFRESH_INTERVAL_MS = 30000

export default class Dashboard extends Component<Props> {
  walletDataInterval: ?number

  componentDidMount () {
    log(this.props.net, 'LOGIN', this.props.address) // only logging public information here
    this.addPolling()
  }

  componentWillUnmount () {
    this.removePolling()
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.loadWalletData !== nextProps.loadWalletData) {
      this.removePolling()
      this.addPolling()
    }
  }

  render () {
    return (
      <div id='dashboard' className={styles.dashboard}>
        <div className={styles.dataColumn}>
          <AssetBalancesPanel className={styles.assetsPanel} />
          <TokenBalancesPanel className={styles.tokensPanel} />
        </div>
        <div className={styles.chartsColumn}>
          <PriceHistoryPanel className={styles.pricesPanel} />
        </div>
      </div>
    )
  }

  addPolling = () => {
    this.walletDataInterval = setInterval(this.props.loadWalletData, REFRESH_INTERVAL_MS)
  }

  removePolling = () => {
    if (this.walletDataInterval) {
      clearInterval(this.walletDataInterval)
    }
  }
}
