// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../core/constants'
import AssetBalancesPanel from '../../components/Dashboard/AssetBalancesPanel'
import TokenBalancesPanel from '../../components/Dashboard/TokenBalancesPanel'
import PriceHistoryPanel from '../../components/Dashboard/PriceHistoryPanel'
import PortfolioPanel from '../../components/Dashboard/PortfolioPanel'
import Tooltip from '../../components/Tooltip'
import Wallet from '../../assets/icons/wallet.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'

import styles from './Dashboard.scss'

type Props = {
  loadWalletData: Function
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
    // const { loading, refresh } = this.props
    return (
      <div id="dashboard" className={styles.dashboard}>
        <div className={styles.dashBoardHeader}>
          <Tooltip
            className={classNames(
              styles.headerButtonContainer,
              styles.manageButton
            )}
            title="Manage Wallets"
          >
            <NavLink
              id="wallet-manager"
              exact
              to={ROUTES.WALLET_MANAGER}
              // className={styles.navItem}
              // activeClassName={styles.active}
            >
              <span> Manage Wallets </span>
              <Wallet
                id="manage-wallets"
                // className={classNames(styles.refresh, {
                //   [styles.loading]: loading
                // })}
                onClick={() => console.log('foo')}
              />
            </NavLink>
          </Tooltip>
          <Tooltip title="Refresh" className={styles.headerButtonContainer}>
            <span> Refresh </span>
            <RefreshIcon
              id="refresh"
              // className={styles.refresh}
              className={classNames(styles.refresh)}
              onClick={() => console.log('foo')}
            />
          </Tooltip>
        </div>
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
