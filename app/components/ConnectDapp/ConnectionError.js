// @flow

import React from 'react'
import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import FullHeightPanel from '../Panel/FullHeightPanel'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import styles from '../../containers/ConnectDapp/styles.scss'
import ErrorIcon from '../../assets/icons/wc-error.svg'

const ConnectionError = () => {
  const walletConnectCtx = useWalletConnect()
  const { error } = walletConnectCtx
  return (
    <FullHeightPanel
      headerText="Wallet Connect"
      renderCloseButton={() => (
        <CloseButton
          routeTo={ROUTES.DASHBOARD}
          onClick={() => {
            walletConnectCtx.setError(undefined)
          }}
        />
      )}
      renderHeaderIcon={() => (
        <div>
          <WallletConnect />
        </div>
      )}
      renderInstructions={false}
    >
      <div className={styles.txSuccessContainer}>
        <ErrorIcon />
        <h3> Transaction failed!</h3>
        <p>
          {typeof error === 'string'
            ? error
            : 'An unknown error occurred please try again.'}
        </p>
        <br />
        <br />
      </div>
    </FullHeightPanel>
  )
}

export default ConnectionError
