// @flow

import React from 'react'

import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import FullHeightPanel from '../Panel/FullHeightPanel'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import styles from '../../containers/ConnectDapp/styles.scss'
import ErrorIcon from '../../assets/icons/wc-error.svg'
import TextInput from '../Inputs/TextInput'
import Button from '../Button'
import LockIcon from '../../assets/icons/add.svg'

const ConnectionUrlForm = ({
  loading,
  handleWalletConnectURLSubmit,
  setConnectionUrl,
  connectionUrl,
}: {
  loading: boolean,
  handleWalletConnectURLSubmit: () => any,
  setConnectionUrl: string => any,
  connectionUrl: string,
}) => {
  const renderInstructions = () => (
    <p>
      All transactions requested by a connected Dapp will be presented for
      signing before being broadcast to the blockchain. No action from the Dapp
      will happen without your direct approval.
    </p>
  )

  return (
    <FullHeightPanel
      headerText="Connect with a dApp"
      renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
      renderHeaderIcon={() => (
        <div>
          <LockIcon />
        </div>
      )}
      renderInstructions={renderInstructions}
    >
      <form
        className={styles.form}
        onSubmit={() => handleWalletConnectURLSubmit()}
      >
        <TextInput
          name="dApp URL"
          label="Scan or Paste URL"
          placeholder="Scan or Paste URL"
          value={connectionUrl}
          onChange={e => setConnectionUrl(e.target.value)}
          error={null}
        />
        <Button
          id="loginButton"
          primary
          type="submit"
          className={styles.loginButtonMargin}
          disabled={loading}
        >
          Connect
        </Button>
      </form>
    </FullHeightPanel>
  )
}

export default ConnectionUrlForm
