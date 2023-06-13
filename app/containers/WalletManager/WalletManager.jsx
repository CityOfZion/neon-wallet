// @flow

import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'

import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../core/constants'
import Wallet from './Wallet'
import CloseButton from '../../components/CloseButton'
import Button from '../../components/Button'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import Import from '../../assets/icons/import.svg'
import Add from '../../assets/icons/add.svg'
import WalletIcon from '../../assets/icons/wallet.svg'
import GreenWalletIcon from '../../assets/icons/wallet-green.svg'

import styles from './WalletManager.scss'

type Props = {
  accounts: Array<Object>,
  saveAccount: ({ label: string, address: string }) => any,
  showSuccessNotification: Object => any,
  showErrorNotification: Object => any,
  setAccounts: (Array<Object>) => any,
  showModal: (modalType: string, modalProps: Object) => any,
  theme: string,
}

class WalletManager extends Component<Props> {
  render() {
    let { accounts } = this.props
    if (!accounts) accounts = []
    return (
      <FullHeightPanel
        renderInstructions={false}
        shouldRenderHeader={false}
        renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
      >
        <div className={styles.contentContainer}>
          <div className={styles.walletManagerDetails}>
            <div className={styles.iconAndHeader}>
              <div className={styles.walletIcon}>
                {this.props.theme === 'Light' ? (
                  <WalletIcon id="manage-wallets" />
                ) : (
                  <GreenWalletIcon id="manage-wallets" />
                )}
              </div>
              <h2>
                <FormattedMessage id="dashboardManageWallets" />
              </h2>
            </div>
            <div className={styles.buttonRow}>
              <NavLink
                id="import-wallet-authenticated-link"
                exact
                to={ROUTES.IMPORT_WALLET_AUTHENTICATED}
              >
                <Button renderIcon={Import}>
                  <FormattedMessage id="manageWalletsImport" />
                </Button>
              </NavLink>
              <NavLink
                id="create-wallet-authenticated-link"
                exact
                to={ROUTES.CREATE_WALLET_AUTHENTICATED}
              >
                <Button renderIcon={Add}>
                  <FormattedMessage id="manageWalletsCreate" />
                </Button>
              </NavLink>
            </div>
          </div>
          <div className={styles.walletList}>
            {accounts &&
              !!accounts.length &&
              accounts.map(account => <Wallet {...account} />)}

            {!accounts.length && (
              <div className={styles.noWalletInfo}>
                <FormattedMessage id="walletManagerNoLocalInfo" />
              </div>
            )}
          </div>
        </div>
      </FullHeightPanel>
    )
  }
}

export default WalletManager
