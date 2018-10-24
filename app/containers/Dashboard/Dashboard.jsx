// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../core/constants'
import AssetBalancesPanel from '../../components/Dashboard/AssetBalancesPanel'
import TokenBalancesPanel from '../../components/Dashboard/TokenBalancesPanel'
import PriceHistoryPanel from '../../components/Dashboard/PriceHistoryPanel'

import HeaderBar from '../../components/HeaderBar'
import Address from '../../components/Blockchain/Address'
import PortfolioPanel from '../../components/Dashboard/PortfolioPanel'
import Wallet from '../../assets/icons/wallet.svg'

import RefreshButton from '../Buttons/RefreshButton'

import styles from './Dashboard.scss'

type Props = {
  loadWalletData: Function,
  address: string
}

const REFRESH_INTERVAL_MS = 30000

export default class Dashboard extends Component<Props> {
  walletDataInterval: ?number

  componentDidMount() {
    this.addPolling()
  }

  componentWillUnmount() {
    this.removePolling()
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.loadWalletData !== nextProps.loadWalletData) {
      this.removePolling()
      this.addPolling()
    }
  }

  render() {
    const { address } = this.props
    return (
      <div id="dashboard" className={styles.dashboard}>
        <HeaderBar
          renderLeftContent={() => (
            <div className={styles.headerAddressContainer}>
              <label>My Public Address:</label>
              <Address address={address} asWrapper>
                <div className={styles.addressLink}>{address}</div>
              </Address>
            </div>
          )}
          renderRightContent={() => (
            <div className={classNames(styles.dashboardHeaderButonContainer)}>
              <NavLink id="wallet-manager" exact to={ROUTES.WALLET_MANAGER}>
                <Wallet id="manage-wallets" />
                <span> Manage Wallets </span>
              </NavLink>
              <RefreshButton />
            </div>
          )}
        />
        <div className={styles.panelContainer}>
          <div className={styles.dataColumn}>
            <TokenBalancesPanel className={styles.tokensPanel} />
            <AssetBalancesPanel className={styles.assetsPanel} />
          </div>
          <div className={styles.chartsColumn}>
            <PortfolioPanel className={styles.portfolioPanel} />
            <PriceHistoryPanel className={styles.pricesPanel} />
          </div>
        </div>
      </div>
    )
  }

  addPolling = () => {
    // $FlowFixMe
    this.walletDataInterval = setInterval(
      this.props.loadWalletData,
      REFRESH_INTERVAL_MS
    )
  }

  removePolling = () => {
    // $FlowFixMe
    if (this.walletDataInterval) {
      // $FlowFixMe
      clearInterval(this.walletDataInterval)
    }
  }
}
