// @flow

import React from 'react'
import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import FullHeightPanel from '../Panel/FullHeightPanel'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import styles from '../../containers/ConnectDapp/styles.scss'
import CheckMarkIcon from '../../assets/icons/confirm-circle.svg'

const TransactionSuccess = () => {
  const walletConnectCtx = useWalletConnect()
  return (
    <FullHeightPanel
      headerText="Wallet Connect"
      renderCloseButton={() => (
        <CloseButton
          routeTo={ROUTES.DASHBOARD}
          onClick={() => {
            walletConnectCtx.setTxHash('')
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
        <CheckMarkIcon />
        <h3> Transaction pending!</h3>
        <p>
          Once your transaction has been confirmed it will appear in your
          activity feed.
        </p>
        <br />
        <br />
        <p>
          <label>TRANSACTION ID</label>
          <br />
          <code>{walletConnectCtx.txHash}</code>
        </p>
      </div>
    </FullHeightPanel>
  )
}

export default TransactionSuccess
