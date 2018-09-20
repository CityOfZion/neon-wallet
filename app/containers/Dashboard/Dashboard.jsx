// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../core/constants'
import AssetBalancesPanel from '../../components/Dashboard/AssetBalancesPanel'
import TokenBalancesPanel from '../../components/Dashboard/TokenBalancesPanel'
import PriceHistoryPanel from '../../components/Dashboard/PriceHistoryPanel'

import HeaderBar from '../../components/HeaderBar'
import PortfolioPanel from '../../components/Dashboard/PortfolioPanel'
import Wallet from '../../assets/icons/wallet.svg'
import NetworkSwitch from '../App/Sidebar/NetworkSwitch'
import RefreshIcon from '../../assets/icons/refresh.svg'

import styles from './Dashboard.scss'

type Props = {
  loadWalletData: Function,
  loading: boolean
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
    const { loadWalletData, loading } = this.props
    return (
      <div id="dashboard" className={styles.dashboard}>
        <HeaderBar
          renderLeftContent={() => (
            <NetworkSwitch
              className={styles.dashboardNetworkSwitch}
              networkSwitchTextInputContainer={
                styles.dashboardNetworkSwitchTextInputContainer
              }
              networkSwitchTextInput={styles.dashboardNetworkSwitchTextInput}
              activeStyles={styles.dashboardNetworkSwitchActive}
            />
          )}
          renderRightContent={() => (
            <div className={classNames(styles.dashboardHeaderButonContainer)}>
              <NavLink id="wallet-manager" exact to={ROUTES.WALLET_MANAGER}>
                <span> Manage Wallets </span>
                <Wallet id="manage-wallets" />
              </NavLink>
              <div className={styles.refreshButton}>
                <span onClick={loading ? null : loadWalletData}> Refresh </span>
                <RefreshIcon
                  id="refresh"
                  className={classNames(styles.refresh, {
                    [styles.loading]: loading
                  })}
                  onClick={loading ? null : loadWalletData}
                />
              </div>
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
    this.walletDataInterval = setInterval(
      this.props.loadWalletData,
      REFRESH_INTERVAL_MS
    )
  }

  removePolling = () => {
    if (this.walletDataInterval) {
      clearInterval(this.walletDataInterval)
    }
  }
}
