// @flow

import React from 'react'
import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import Loader from '../Loader'
import FullHeightPanel from '../Panel/FullHeightPanel'

const ConnectionLoader = () => {
  const walletConnectCtx = useWalletConnect()
  return (
    <FullHeightPanel
      renderCloseButton={() => (
        <CloseButton
          routeTo={ROUTES.DASHBOARD}
          onClick={() => {
            walletConnectCtx.setError(undefined)
          }}
        />
      )}
      renderHeaderIcon={() => null}
      renderInstructions={false}
    >
      <div>
        <Loader />
      </div>
    </FullHeightPanel>
  )
}

export default ConnectionLoader
