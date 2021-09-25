// @flow
import { useWalletConnect } from '@cityofzion/wallet-connect-sdk-react'
import Tippy from '@tippyjs/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../core/constants'
import Dapps from '../../assets/icons/dapps.svg'
import Plus from '../../assets/icons/add.svg'
import styles from './DapiStatus.scss'

const DapiStatus = () => {
  const walletConnectCtx = useWalletConnect()

  return (
    <div className={styles.tooltipContainer}>
      <div className={styles.arrowUp} />
      <div className={styles.innerTooltipContainer}>
        <div className={styles.title}>
          CONNECTED DAPPS{' '}
          <NavLink id="wallet-manager" exact to={ROUTES.CONNECT_DAPP}>
            {' '}
            <Plus />{' '}
          </NavLink>
        </div>
        <div className={styles.dappList}>No dApps connected</div>
        <NavLink id="wallet-manager" exact to={ROUTES.CONNECT_DAPP}>
          <div className={styles.connectButton}> Connect </div>
        </NavLink>
      </div>
    </div>
  )
}

const DashboardButton = ({ theme }: { theme: string }) => (
  <Tippy interactive content={<DapiStatus />}>
    <div className={styles.contentContainer}>
      {theme === 'Light' ? (
        <Dapps id="manage-wallets" className={styles.manageWallets} />
      ) : (
        <Dapps id="manage-wallets" className={styles.manageWallets} />
      )}
      dApps
    </div>
  </Tippy>
)

export default DashboardButton
