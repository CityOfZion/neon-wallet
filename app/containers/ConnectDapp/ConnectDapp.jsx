// @flow
// $FlowFixMe
import React, { useState } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import LockIcon from '../../assets/icons/add.svg'

import CloseButton from '../../components/CloseButton'
import TextInput from '../../components/Inputs/TextInput'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import { ROUTES } from '../../core/constants'

import styles from './styles.scss'
import Button from '../../components/Button'
import { useWalletConnect } from '@cityofzion/wallet-connect-sdk-react'

type Props = {}

const CONNECTION_STEPS = {
  ENTER_URL: 'ENTER_URL',
  APPROVE_CONNECTION: 'APPROVE_CONNECTION',
  APPROVE_TRANSACTION: 'APPROVE_TRANSACTION',
  TRANSACTION_SUCCESS: 'TRANSACTION_SUCCESS',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
}

const ConnectDapp = (props: Props) => {
  const [connectionUrl, setConnectionUrl] = useState('')
  const [connectionStep, setConnectionStep] = useState(
    CONNECTION_STEPS.ENTER_URL,
  )
  const [loading, setLoading] = useState(false)
  const walletConnectCtx = useWalletConnect()

  const renderHeader = () => <span>'testing</span>

  const renderInstructions = () => (
    <p>
      All transactions requested by a connected Dapp will be presented for
      signing before being broadcast to the blockchain. No action from the Dapp
      will happen without your direct approval.
    </p>
  )

  const isValid = () => true

  const handleWalletConnectURLSubmit = async () => {
    const { wcClient } = walletConnectCtx
    setLoading(true)
    try {
      walletConnectCtx.connect()
      await wcClient.pair({ uri: connectionUrl })
    } catch (e) {
      console.error({ e })
      setLoading(false)
    }
  }

  return (
    <FullHeightPanel
      renderHeader={renderHeader}
      headerText="Connect with a dApp"
      renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
      renderHeaderIcon={() => (
        <div>
          <LockIcon />
        </div>
      )}
      renderInstructions={renderInstructions}
    >
      <form className={styles.form} onSubmit={handleWalletConnectURLSubmit}>
        <TextInput
          id="privateKey"
          name="privateKey"
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
          disabled={!isValid()}
          onClick={handleWalletConnectURLSubmit}
        >
          Connect
        </Button>
      </form>
    </FullHeightPanel>
  )
}

export default ConnectDapp
