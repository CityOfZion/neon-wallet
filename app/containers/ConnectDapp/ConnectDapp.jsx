// @flow
// $FlowFixMe
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { wallet } from '@cityofzion/neon-js-next'

import LockIcon from '../../assets/icons/add.svg'

import Confirm from '../../assets/icons/confirm_connection.svg'
import Deny from '../../assets/icons/deny_connection.svg'

import WallletConnect from '../../assets/icons/wallet_connect.svg'
import N3 from '../../assets/images/n3.svg'

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

const REQUEST_MOCK = {
  topic: 'a597459f33abca20cac77d62001100d3b79e743d6306e17d24f948588b811110',
  request: {
    id: 1632947416325648,
    jsonrpc: '2.0',
    method: 'invokefunction',
    params: [
      '0xd2a4cff31913016155e38e474a2c06d08be276cf',
      'transfer',
      [
        {
          type: 'Address',
          value: 'NMkSudozST9kTkpNbyNB1EdU7KzfQoF3dY',
        },
        {
          type: 'ScriptHash',
          value: '0x010101c0775af568185025b0ce43cfaa9b990a2a',
        },
        {
          type: 'Integer',
          value: 100000000,
        },
        {
          type: 'Array',
          value: [
            {
              type: 'String',
              value: 'createStream',
            },
            {
              type: 'Address',
              value: 'NMkSudozST9kTkpNbyNB1EdU7KzfQoF3dY',
            },
            {
              type: 'Integer',
              value: 1632947400000,
            },
            {
              type: 'Integer',
              value: 1633033800000,
            },
          ],
        },
      ],
    ],
  },
  chainId: 'neo3:testnet',
}

const ConnectDapp = ({
  address = 'NMkSudozST9kTkpNbyNB1EdU7KzfQoF3dY',
}: Props) => {
  const [connectionUrl, setConnectionUrl] = useState('')
  const [connectionStep, setConnectionStep] = useState(
    CONNECTION_STEPS.ENTER_URL,
  )
  const [proposal, setProposal] = useState(null)
  const [request, setRequests] = useState(null)
  const [loading, setLoading] = useState(false)
  const walletConnectCtx = useWalletConnect()

  useEffect(() => {
    walletConnectCtx.init()

    return () => {}
  }, [])

  useEffect(
    () => {
      if (walletConnectCtx.sessionProposals[0]) {
        setConnectionStep(CONNECTION_STEPS.APPROVE_CONNECTION)
        setProposal(walletConnectCtx.sessionProposals[0])
      }
    },
    [walletConnectCtx.sessionProposals],
  )

  useEffect(
    () => {
      if (walletConnectCtx.requests[0]) {
        console.log(walletConnectCtx.requests[0])
        setRequests(walletConnectCtx.requests[0])
        setConnectionStep(CONNECTION_STEPS.APPROVE_TRANSACTION)
      }
    },
    [walletConnectCtx.requests],
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

  switch (true) {
    case connectionStep === CONNECTION_STEPS.APPROVE_CONNECTION:
      return (
        <FullHeightPanel
          renderHeader={renderHeader}
          headerText="Wallet Connect"
          renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
          renderHeaderIcon={() => (
            <div>
              <WallletConnect />
            </div>
          )}
          renderInstructions={false}
        >
          <div className={styles.approveConnectionContainer}>
            <img src={proposal.proposer.metadata.icons[0]} />

            <h3>{proposal.proposer.metadata.name} wants to connect</h3>
            <div className={styles.connectionDetails}>
              {proposal.proposer.metadata.name} wants to connect to your wallet
              <div className={styles.details}>
                <div className={styles.detailsLabel}>
                  <label>dApp details</label>
                </div>
                <div className={styles.featuresRow}>
                  <div>
                    <label>CHAIN</label>
                    {proposal.permissions.blockchain.chains[0]}
                  </div>
                  <div>
                    <label>FEATURES</label>
                    {proposal.permissions.jsonrpc.methods.join(', ')}
                  </div>
                </div>
              </div>
              <div className={styles.confirmation}>
                Please confirm you would like to connect
                <div>
                  <Confirm
                    onClick={() => walletConnectCtx.approveSession(proposal)}
                  />

                  <Deny
                    onClick={() => {
                      walletConnectCtx.rejectSession(proposal)
                      setConnectionStep(CONNECTION_STEPS.ENTER_URL)
                      setConnectionUrl('')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </FullHeightPanel>
      )
    case connectionStep === CONNECTION_STEPS.APPROVE_TRANSACTION:
      return (
        <FullHeightPanel
          renderHeader={renderHeader}
          headerText="Wallet Connect"
          renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
          renderHeaderIcon={() => (
            <div>
              <WallletConnect />
            </div>
          )}
          renderInstructions={false}
        >
          <div className={styles.approveConnectionContainer}>
            <img src={proposal.proposer.metadata.icons[0]} />

            <h3>{proposal.proposer.metadata.name} wants to connect</h3>

            <div className={styles.confirmation}>
              Please confirm you would like to connect
              <div>
                <Confirm
                  onClick={() => walletConnectCtx.approveRequest(request)}
                />

                <Deny
                  onClick={() => {
                    walletConnectCtx.rejectSession(proposal)
                    setConnectionStep(CONNECTION_STEPS.ENTER_URL)
                    setConnectionUrl('')
                    setProposal(null)
                  }}
                />
              </div>
            </div>
          </div>
        </FullHeightPanel>
      )
    default:
      return (
        <FullHeightPanel
          renderHeader={renderHeader}
          headerText="Connect with a dApp"
          renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
          renderHeaderIcon={() => (
            <div>
              <LockIcon />
            </div>
          )}
          renderInstructions={renderInstructions}
        >
          <form className={styles.form} onSubmit={handleWalletConnectURLSubmit}>
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
              disabled={!isValid()}
            >
              Connect
            </Button>
          </form>
        </FullHeightPanel>
      )
  }
}

export default ConnectDapp
