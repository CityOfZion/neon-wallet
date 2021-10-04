// @flow
import React, { Component } from 'react'
import classNames from 'classnames'
import { NavLink, Redirect } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { ROUTES } from '../../core/constants'
import AssetBalancesPanel from '../../components/Dashboard/AssetBalancesPanel'
import TokenBalancesPanel from '../../components/Dashboard/TokenBalancesPanel'
import PriceHistoryPanel from '../../components/Dashboard/PriceHistoryPanel'
import HeaderBar from '../../components/HeaderBar'
import Address from '../../components/Blockchain/Address'
import PortfolioPanel from '../../components/Dashboard/PortfolioPanel'
import Wallet from '../../assets/icons/wallet.svg'
import GreenWallet from '../../assets/icons/wallet-green.svg'
import RefreshButton from '../Buttons/RefreshButton'
import styles from './Dashboard.scss'
import DapiStatus from '../../components/DapiStatus'

type Props = {
  loadWalletData: Function,
  address: string,
  hasInternetConnectivity: boolean,
  internetConnectionPromptPresented: Boolean,
  theme: string,
}

const REFRESH_INTERVAL_MS = 30000

export default class Dashboard extends Component<Props> {
  walletDataInterval: ?IntervalID

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
    const {
      address,
      hasInternetConnectivity,
      internetConnectionPromptPresented,
    } = this.props
    if (!hasInternetConnectivity && !internetConnectionPromptPresented) {
      return <Redirect to={ROUTES.OFFLINE_SIGNING_PROMPT} />
    }
    return (
      <div id="dashboard" className={styles.dashboard}>
        <HeaderBar
          renderLeftContent={() => (
            <div>
              <div className={styles.headerAddressContainer}>
                <label>
                  <FormattedMessage id="dashboardAddressLabel" />
                </label>
                <Address address={address} asWrapper>
                  <div className={styles.addressLink}>{address}</div>
                </Address>
              </div>
            </div>
          )}
          renderRightContent={() => (
            <div className={classNames(styles.dashboardHeaderButonContainer)}>
              <NavLink id="wallet-manager" exact to={ROUTES.WALLET_MANAGER}>
                {this.props.theme === 'Light' ? (
                  <Wallet
                    id="manage-wallets"
                    className={styles.manageWallets}
                  />
                ) : (
                  <GreenWallet
                    id="manage-wallets"
                    className={styles.manageWallets}
                  />
                )}
                <span>
                  <FormattedMessage id="dashboardManageWallets" />
                </span>
              </NavLink>

              <DapiStatus theme={this.props.theme} />

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
    this.walletDataInterval = setInterval(
      this.props.loadWalletData,
      REFRESH_INTERVAL_MS,
    )
  }

  removePolling = () => {
    if (this.walletDataInterval) {
      clearInterval(this.walletDataInterval)
    }
  }
}
