// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import LogoutIcon from '../../../../assets/navigation/logout.svg'
import styles from './Logout.scss'
import { useWalletConnect } from '../../../../context/WalletConnect/WalletConnectContext'

type Props = {
  id?: string,
  className?: string,
  logout: Function,
  promptHasBeenDisplayed: boolean => void,
}

const Logout = ({ id, className, logout, promptHasBeenDisplayed }: Props) => {
  const walletConnectCtx = useWalletConnect()

  return (
    <div
      id={id}
      className={classNames(styles.logout, className)}
      onClick={async () => {
        promptHasBeenDisplayed(false)
        if (walletConnectCtx.resetApp) {
          await walletConnectCtx.resetApp()
        }
        logout()
      }}
    >
      <LogoutIcon />
      <div className={styles.logoutText}>
        <FormattedMessage id="sidebarLogout" />
      </div>
    </div>
  )
}

export default Logout
