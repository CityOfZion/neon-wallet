// @flow
// $FlowFixMe
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import { wallet } from '@cityofzion/neon-js-next'
import axios from 'axios'
import LockIcon from '../../assets/icons/add.svg'

import Confirm from '../../assets/icons/confirm_connection.svg'
import Deny from '../../assets/icons/deny_connection.svg'

import WallletConnect from '../../assets/icons/wallet_connect.svg'
import N3 from '../../assets/images/n3.svg'

import CloseButton from '../../components/CloseButton'
import TextInput from '../../components/Inputs/TextInput'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import { ROUTES } from '../../core/constants'
import { convertToArbitraryDecimals } from '../../core/formatters'

import styles from './styles.scss'
import Button from '../../components/Button'
import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { N3Helper } from '../../context/WalletConnect/helpers'

import CheckMarkIcon from '../../assets/icons/confirm-circle.svg'
import ErrorIcon from '../../assets/icons/wc-error.svg'

type Props = {
  address: string,
  history: any,
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

const PROPOSAL_MOCK = {
  relay: {
    protocol: 'waku',
  },
  topic: 'dedcb1834048ce11b88c5582d624a2385f81d090c1e821d30490f97639d4c76d',
  proposer: {
    publicKey:
      'f1a0997f891e1c48f3ff578bd69c2b85d0e5a1ac1f0ea8b9dc30426c7473342c',
    controller: false,
    metadata: {
      name: 'Crypsydra',
      description: 'WalletConnect integration Prototype',
      url: 'https://crypsydra.vercel.app/',
      icons: [
        'https://raw.githubusercontent.com/CityOfZion/visual-identity/develop/_CoZ%20Branding/_Logo/_Logo%20icon/_PNG%20200x178px/CoZ_Icon_DARKBLUE_200x178px.png',
      ],
    },
  },
  signal: {
    method: 'pairing',
    params: {
      topic: '9ed69162519da40f0e9c32a136e8e1f3c541862504e5e12806e2619fcc7977d8',
    },
  },
  permissions: {
    blockchain: {
      chains: ['neo3:testnet'],
    },
    jsonrpc: {
      methods: ['invokefunction'],
    },
    notifications: {
      types: [],
    },
  },
  ttl: 604800,
}

const ConnectDapp = ({
  address = 'NMkSudozST9kTkpNbyNB1EdU7KzfQoF3dY',
  history,
}: Props) => {
  const [connectionUrl, setConnectionUrl] = useState('')
  const [connectionStep, setConnectionStep] = useState(
    CONNECTION_STEPS.ENTER_URL,
  )
  const [proposal, setProposal] = useState(PROPOSAL_MOCK)
  const [request, setRequests] = useState(REQUEST_MOCK)
  const [loading, setLoading] = useState(false)
  const [fee, setFee] = useState('')
  const [contractName, setContractName] = useState('')
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
      if (walletConnectCtx.txHash) {
        setConnectionStep(CONNECTION_STEPS.TRANSACTION_SUCCESS)
      }
    },
    [walletConnectCtx.txHash],
  )

  useEffect(
    () => {
      if (walletConnectCtx.error) {
        setConnectionStep(CONNECTION_STEPS.TRANSACTION_ERROR)
      }
    },
    [walletConnectCtx.error],
  )

  const getGasFee = async request => {
    const account = new wallet.Account(address)
    const testReq = {
      ...request,
      method: 'testInvoke',
    }
    const results = await new N3Helper(
      'https://testnet1.neo.coz.io:443',
    ).rpcCall(account, testReq)
    const fee = convertToArbitraryDecimals(results.result.gasconsumed)

    setFee(fee)
  }

  const getContractName = async request => {
    const hash = request.params[2][1].value
    const {
      data: {
        manifest: { name },
      },
    } = await axios.get(
      `https://dora.coz.io/api/v1/neo3/testnet_rc4/contract/${hash}`,
    )
    setContractName(name)
  }

  useEffect(
    () => {
      if (walletConnectCtx.requests[0]) {
        setRequests(walletConnectCtx.requests[0])
        setConnectionStep(CONNECTION_STEPS.APPROVE_TRANSACTION)
        getGasFee(walletConnectCtx.requests[0].request)
        getContractName(walletConnectCtx.requests[0].request)
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
    case connectionStep === CONNECTION_STEPS.TRANSACTION_ERROR:
      return (
        <FullHeightPanel
          renderHeader={renderHeader}
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
            <p>An unkown error occurred please try again.</p>
            <br />
            <br />
          </div>
        </FullHeightPanel>
      )
    case connectionStep === CONNECTION_STEPS.TRANSACTION_SUCCESS:
      return (
        <FullHeightPanel
          renderHeader={renderHeader}
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
                    onClick={() => {
                      walletConnectCtx.approveSession(proposal)
                      history.push(ROUTES.DASHBOARD)
                    }}
                  />

                  <Deny
                    onClick={() => {
                      walletConnectCtx.rejectSession(proposal)
                      setConnectionStep(CONNECTION_STEPS.ENTER_URL)
                      setConnectionUrl('')
                      history.push(ROUTES.DASHBOARD)
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
          renderCloseButton={() => (
            <CloseButton
              routeTo={ROUTES.DASHBOARD}
              onClick={() => {
                walletConnectCtx.rejectRequest(request)
                setConnectionStep(CONNECTION_STEPS.ENTER_URL)
                setConnectionUrl('')
                history.push(ROUTES.DASHBOARD)
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
          <div
            className={classNames([
              styles.approveConnectionContainer,
              styles.approveRequestContainer,
            ])}
          >
            <img src={proposal.proposer.metadata.icons[0]} />

            <h3>
              {proposal.proposer.metadata.name} wants to call{' '}
              <span className={styles.methodName}>{contractName}</span> contract
            </h3>

            <div className={styles.connectionDetails}>
              <div
                className={classNames([styles.detailsLabel, styles.detailRow])}
              >
                <label>hash</label>
                <div className={styles.scriptHash}>
                  {request.request.params[2][1].value}
                </div>
              </div>

              <div
                className={classNames([
                  styles.detailsLabel,
                  styles.detailRow,
                  styles.noBorder,
                ])}
              >
                <label>method</label>
                <div>{request.request.params[1]}</div>
              </div>
              <div className={styles.details}>
                <div className={styles.detailsLabel}>
                  <label>request parameters</label>
                </div>

                <div className={styles.requestParams}>
                  {request.request.params.map((p: any, i: number) => (
                    <React.Fragment>
                      <div className={styles.paramContainer}>
                        <div key={i}>
                          <div className={styles.index}>{i.toString(10)}</div>
                          <div
                            ml="0.5rem"
                            title={
                              typeof p === 'object' ? 'Array' : p.toString()
                            }
                          >
                            {typeof p === 'object' ? (
                              <div className={styles.centered}>
                                {' '}
                                Array/Dictionary <br /> <br />
                              </div>
                            ) : (
                              p.toString()
                            )}
                          </div>
                        </div>
                      </div>
                      {typeof p === 'object' && (
                        <div className={styles.jsonParams}>
                          {Object.keys(p).map((k: string) => (
                            <div key={k} mt="0.5rem">
                              <div>
                                {p[k] &&
                                  (typeof p[k] !== 'object' ? (
                                    <div>
                                      {' '}
                                      {p[k].toString()} <br /> <br />{' '}
                                    </div>
                                  ) : (
                                    <div>
                                      {JSON.stringify(p[k], null, 4)}
                                      <br />
                                      <br />
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div
                className={classNames([styles.detailsLabel, styles.detailRow])}
              >
                <label>fee</label>
                <div className={styles.scriptHash}>{fee} GAS</div>
              </div>
              <div className={styles.confirmation}>
                Please confirm you would like to proceed
                <div>
                  <Confirm
                    onClick={async () => {
                      if (!loading) {
                        setLoading(true)
                        await walletConnectCtx.approveRequest(request)
                        setLoading(false)
                      }
                    }}
                  />

                  <Deny
                    onClick={() => {
                      if (!loading) {
                        walletConnectCtx.rejectRequest(request)
                        setConnectionStep(CONNECTION_STEPS.ENTER_URL)
                        setConnectionUrl('')
                        history.push(ROUTES.DASHBOARD)
                      }
                    }}
                  />
                </div>
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
