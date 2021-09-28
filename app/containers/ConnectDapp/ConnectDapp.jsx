// @flow
// $FlowFixMe
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { wallet } from '@cityofzion/neon-js-next'

import LockIcon from '../../assets/icons/add.svg'

import CloseButton from '../../components/CloseButton'
import TextInput from '../../components/Inputs/TextInput'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import { ROUTES } from '../../core/constants'

import styles from './styles.scss'
import Button from '../../components/Button'
import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'

type Props = {
  address: string,
}

const CONNECTION_STEPS = {
  ENTER_URL: 'ENTER_URL',
  APPROVE_CONNECTION: 'APPROVE_CONNECTION',
  APPROVE_TRANSACTION: 'APPROVE_TRANSACTION',
  TRANSACTION_SUCCESS: 'TRANSACTION_SUCCESS',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
}

const ConnectDapp = ({
  address = 'NMkSudozST9kTkpNbyNB1EdU7KzfQoF3dY',
}: Props) => {
  const [connectionUrl, setConnectionUrl] = useState('')
  const [connectionStep, setConnectionStep] = useState(
    CONNECTION_STEPS.ENTER_URL,
  )
  const [loading, setLoading] = useState(false)
  const walletConnectCtx = useWalletConnect()

  useEffect(() => {
    walletConnectCtx.init()

    return () => {}
  }, [])

  useEffect(
    () => {
      console.log('working?')
      console.log(walletConnectCtx.sessionProposals)
      walletConnectCtx.approveSession(walletConnectCtx.sessionProposals[0])
    },
    [walletConnectCtx.sessionProposals],
  )

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
      const account = new wallet.Account(address)
      walletConnectCtx.addAccountAndChain(account.address, 'neo3:testnet')
      await walletConnectCtx.onURI(connectionUrl)
      setLoading(false)
    } catch (e) {
      console.error({ e })
      setLoading(false)
    }
  }

  console.log(walletConnectCtx)

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
        >
          Connect
        </Button>
      </form>
    </FullHeightPanel>
  )
}

export default ConnectDapp
