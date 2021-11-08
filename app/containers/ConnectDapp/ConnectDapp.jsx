// @flow
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { wallet } from '@cityofzion/neon-js-next'
import axios from 'axios'

import CloseButton from '../../components/CloseButton'
import TextInput from '../../components/Inputs/TextInput'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import { ROUTES } from '../../core/constants'
import { convertToArbitraryDecimals, parseQuery } from '../../core/formatters'
import styles from './styles.scss'
import Button from '../../components/Button'
import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import N3Helper from '../../context/WalletConnect/helpers'
import LockIcon from '../../assets/icons/add.svg'
import Confirm from '../../assets/icons/confirm_connection.svg'
import Deny from '../../assets/icons/deny_connection.svg'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import CheckMarkIcon from '../../assets/icons/confirm-circle.svg'
import DoraIcon from '../../assets/icons/dora_icon_light.svg'
import DoraIconDark from '../../assets/icons/dora_icon_dark.svg'
import Info from '../../assets/icons/info.svg'
import Up from '../../assets/icons/chevron-up.svg'
import Down from '../../assets/icons/chevron-down.svg'

import ErrorIcon from '../../assets/icons/wc-error.svg'
import { PROPOSAL_MOCK, REQUEST_MOCK, TX_STATE_TYPE_MAPPINGS } from './mocks'
import { getNode, getRPCEndpoint } from '../../actions/nodeStorageActions'
import DialogueBox from '../../components/DialogueBox'
import WarningIcon from '../../assets/icons/warning.svg'
import CopyToClipboard from '../../components/CopyToClipboard/CopyToClipboard'
import Tooltip from '../../components/Tooltip'
import Loader from '../../components/Loader'

const electron = require('electron').remote
const ipc = require('electron').ipcRenderer

type Props = {
  address: string,
  history: any,
  net: string,
  showSuccessNotification: ({ message: string }) => void,
  showErrorNotification: ({ message: string }) => void,
  isHardwareLogin?: boolean,
  theme: string,
}

const CONNECTION_STEPS = {
  ENTER_URL: 'ENTER_URL',
  APPROVE_CONNECTION: 'APPROVE_CONNECTION',
  APPROVE_TRANSACTION: 'APPROVE_TRANSACTION',
  TRANSACTION_SUCCESS: 'TRANSACTION_SUCCESS',
  TRANSACTION_ERROR: 'TRANSACTION_ERROR',
}

const ConnectDapp = ({
  address,
  history,
  net,
  showSuccessNotification,
  showErrorNotification,
  isHardwareLogin,
  theme,
}: Props) => {
  const [connectionUrl, setConnectionUrl] = useState('')
  const [connectionStep, setConnectionStep] = useState(
    CONNECTION_STEPS.APPROVE_TRANSACTION,
  )
  const [proposal, setProposal] = useState(null)
  const [peer, setPeer] = useState(null)
  const [request, setRequest] = useState(REQUEST_MOCK)
  const [loading, setLoading] = useState(false)
  const [fee, setFee] = useState('')
  const [contractName, setContractName] = useState('')
  const [requestParamsVisible, setRequestParamsVisible] = useState(true)
  const [shouldDisplayReqParams, setShouldDisplayReqParams] = useState(false)
  const [pairingMap, setPairingMap] = useState({})

  const walletConnectCtx = useWalletConnect()
  const firstProposal = walletConnectCtx.sessionProposals[0]
  const firstRequest = walletConnectCtx.requests[0]
  const { error } = walletConnectCtx

  const resetState = () => {
    setConnectionUrl('')
    setConnectionStep(CONNECTION_STEPS.ENTER_URL)
    setProposal(null)
    setRequest(null)
    setLoading(false)
    setContractName('')
    setFee('')
  }

  const handleWalletConnectURLSubmit = async uri => {
    setLoading(true)
    try {
      if (!walletConnectCtx.wcClient) await walletConnectCtx.init()

      const account = new wallet.Account(address)
      walletConnectCtx.addAccountAndChain(
        account.address,
        `neo3:${net.toLowerCase()}`,
      )

      await walletConnectCtx
        .onURI(uri || connectionUrl)
        .catch(e => console.error({ e }))
      setLoading(false)
    } catch (e) {
      console.error({ e })
      setLoading(false)
    }
  }

  // Effect for handling linking when ConnectDapp is currently rendered (cannot push the same route twice)
  useEffect(() => {
    ipc.on('link', (event, url) => {
      const { uri } = parseQuery(decodeURI(url))
      setPairingMap({ ...pairingMap, [uri]: true })
      if (uri && !pairingMap[uri]) {
        const decoded = atob(uri)
        setLoading(true)
        setConnectionUrl(decoded)
        handleWalletConnectURLSubmit(decoded)
      }
    })
  }, [])

  // Effect for handling passing URI as query param to component
  useEffect(
    () => {
      if (
        history.location &&
        history.location.state &&
        history.location.state.uri &&
        !pairingMap[history.location.state.uri]
      ) {
        const decoded = atob(history.location.state.uri)
        setPairingMap({ ...pairingMap, [history.location.state.uri]: true })
        setLoading(true)
        setConnectionUrl(decoded)
        handleWalletConnectURLSubmit(decoded)
      }
      return () => null
    },
    [history],
  )

  useEffect(
    () => {
      const currentChain = `neo3:${net.toLowerCase()}`

      if (firstProposal) {
        if (
          !firstProposal.permissions.blockchain.chains.includes(currentChain)
        ) {
          showErrorNotification({
            message: `Attempting to connect to dApp on ${
              firstProposal.permissions.blockchain.chains[0]
            } but you are currently on ${currentChain}. Please change network in settings and try again.`,
          })
          walletConnectCtx.rejectSession(firstProposal)
          setConnectionStep(CONNECTION_STEPS.ENTER_URL)
          setConnectionUrl('')
        } else {
          setConnectionStep(CONNECTION_STEPS.APPROVE_CONNECTION)
          setProposal(firstProposal)
        }
      }
    },
    [history, net, walletConnectCtx, firstProposal],
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
      if (firstRequest) {
        walletConnectCtx.getPeerOfRequest(firstRequest).then(setPeer)
      }
    },
    [firstRequest, walletConnectCtx],
  )

  useEffect(
    () => {
      if (error) {
        setConnectionStep(CONNECTION_STEPS.TRANSACTION_ERROR)
      }
    },
    [error],
  )

  useEffect(
    () => {
      const getGasFee = async request => {
        const account = new wallet.Account(address)
        const testReq = {
          ...request,
          method: 'testInvoke',
        }
        let endpoint = await getNode(net)
        if (!endpoint) {
          endpoint = await getRPCEndpoint(net)
        }
        const results = await new N3Helper(endpoint).rpcCall(account, testReq)
        const fee = convertToArbitraryDecimals(results.result.gasconsumed)
        setFee(fee)
      }

      const getContractName = async request => {
        const hash = request.params[0]
        const {
          data: {
            manifest: { name },
          },
        } = await axios.get(
          net === 'MainNet'
            ? `https://dora.coz.io/api/v1/neo3/mainnet/contract/${hash}`
            : `https://dora.coz.io/api/v1/neo3/testnet_rc4/contract/${hash}`,
        )
        setContractName(name)
      }

      if (request) {
        getGasFee(request.request)
        getContractName(request.request)
      }
    },
    [request, address, net],
  )

  useEffect(
    () => {
      if (firstRequest) {
        setRequest(firstRequest)

        firstRequest.request.params.forEach((p: any) => {
          if (typeof p === 'object' && p.args.find(p => p.type === 'Array')) {
            setShouldDisplayReqParams(true)
          }
        })

        setConnectionStep(CONNECTION_STEPS.APPROVE_TRANSACTION)
      }
    },
    [address, net, firstRequest],
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

  const handleOpenDoraLink = hash => {
    if (hash) {
      return electron.shell.openExternal(
        net === 'MainNet'
          ? `https://dora.coz.io/contract/neo3/mainnet/${hash}`
          : `https://dora.coz.io/contract/neo3/testnet_rc4/${hash}`,
      )
    }
    return null
  }

  switch (true) {
    case loading:
      return (
        <FullHeightPanel
          renderHeader={renderHeader}
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
            <p>
              {typeof error === 'string'
                ? error
                : 'An unkown error occurred please try again.'}
            </p>
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
          renderCloseButton={() => (
            <CloseButton
              onClick={() => {
                walletConnectCtx.rejectSession(proposal)
                resetState()
              }}
              routeTo={ROUTES.DASHBOARD}
            />
          )}
          renderHeaderIcon={() => (
            <div className={styles.walletConnectIcon}>
              <WallletConnect />
            </div>
          )}
          renderInstructions={false}
        >
          <div className={styles.approveConnectionContainer}>
            <img src={proposal && proposal.proposer.metadata.icons[0]} />

            <h3>
              {proposal && proposal.proposer.metadata.name} wants to connect
            </h3>
            <div className={styles.connectionDetails}>
              {proposal && proposal.proposer.metadata.name} wants to connect to
              your wallet
              <div className={styles.details} style={{ marginTop: 12 }}>
                <div className={styles.detailsLabel}>
                  <label>dApp details</label>
                </div>
                <div className={styles.featuresRow}>
                  <div>
                    <label>CHAIN</label>
                    {proposal && proposal.permissions.blockchain.chains[0]}
                  </div>
                  <div>
                    <label>FEATURES</label>
                    {proposal &&
                      proposal.permissions.jsonrpc.methods.join(', ')}
                  </div>
                </div>
              </div>
              <div className={styles.confirmation} style={{ border: 'none' }}>
                Please confirm you would like to connect
                <div>
                  <Confirm
                    onClick={() => {
                      walletConnectCtx.approveSession(proposal)
                      showSuccessNotification({
                        message: `You have accepted connection from ${
                          proposal
                            ? proposal.proposer.metadata.name
                            : 'unknown dApp'
                        }.`,
                      })
                      history.push(ROUTES.DASHBOARD)
                    }}
                  />

                  <Deny
                    onClick={() => {
                      walletConnectCtx.rejectSession(proposal)
                      showSuccessNotification({
                        message: `You have rejected connection from ${
                          proposal
                            ? proposal.proposer.metadata.name
                            : 'unknown dApp'
                        }.`,
                      })
                      resetState()
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
                resetState()
                history.push(ROUTES.DASHBOARD)
              }}
            />
          )}
          renderHeaderIcon={() => (
            <div className={styles.walletConnectIcon}>
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
            <img src={peer && peer.metadata.icons[0]} />

            <h3>
              {peer && peer.metadata.name} wants to call{' '}
              <span className={styles.methodName}>{contractName}</span> contract
            </h3>

            {isHardwareLogin && (
              <DialogueBox
                icon={
                  <WarningIcon
                    className={styles.warningIcon}
                    height={60}
                    width={60}
                  />
                }
                renderText={() => (
                  <div>
                    To sign this transaction with your ledger, enable custom
                    contract data in the Neo N3 app settings. Read more about
                    how to enable this setting{' '}
                    <a
                      onClick={() => {
                        electron.shell.openExternal(
                          'https://medium.com/proof-of-working/signing-custom-transactions-with-ledger-29723f6eaa4',
                        )
                      }}
                    >
                      here
                    </a>.
                  </div>
                )}
                className={styles.warningDialogue}
              />
            )}

            <div className={styles.connectionDetails}>
              <div
                className={classNames([styles.detailsLabel, styles.detailRow])}
              >
                <label>hash</label>
                <div className={styles.scriptHash}>
                  {request && request.request.params[0]}{' '}
                  {theme === 'Light' ? (
                    <DoraIcon
                      onClick={() =>
                        handleOpenDoraLink(request && request.request.params[0])
                      }
                    />
                  ) : (
                    <DoraIconDark
                      onClick={() =>
                        handleOpenDoraLink(request && request.request.params[0])
                      }
                    />
                  )}
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
                <div>{request && request.request.params[1]}</div>
              </div>
              {shouldDisplayReqParams ? (
                <div className={styles.details}>
                  <div className={styles.detailsLabel}>
                    <label>request parameters</label>

                    <div>
                      {requestParamsVisible ? (
                        <Up onClick={() => setRequestParamsVisible(false)} />
                      ) : (
                        <Down onClick={() => setRequestParamsVisible(true)} />
                      )}
                    </div>
                  </div>

                  {requestParamsVisible && (
                    <div className={styles.requestParams}>
                      {/* {request &&
                        request.request.params.map(param =>
                          param.map((p: any, i: number) => (
                            <React.Fragment key={i}>
                              {typeof p === 'object' &&
                                p.find(p => p.type === 'Array') &&
                                p
                                  .find(p => p.type === 'Array')
                                  .value.map((arg, i) => (
                                    <div className={styles.paramContainer}>
                                      <div>
                                        <div className={styles.index}>{i}</div>
                                        {arg && arg.value}{' '}
                                        <CopyToClipboard
                                          text={String(arg && arg.value)}
                                        />
                                      </div>
                                      <div
                                        className={styles.argType}
                                        style={{
                                          backgroundColor:
                                            TX_STATE_TYPE_MAPPINGS[
                                              arg && arg.type
                                            ] &&
                                            TX_STATE_TYPE_MAPPINGS[
                                              arg && arg.type
                                            ].color,
                                        }}
                                      >
                                        {' '}
                                        {arg.type}{' '}
                                      </div>
                                    </div>
                                  ))}
                            </React.Fragment>
                          )),
                        )} */}
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.detailsLabel} />
              )}
              <div
                className={classNames([styles.detailsLabel, styles.detailRow])}
              >
                <label>fee</label>
                <div className={styles.fee}>
                  {fee} GAS
                  <Tooltip title="Other network fees may apply">
                    <Info />{' '}
                  </Tooltip>
                </div>
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
                        showSuccessNotification({
                          message: `You have denied request from ${
                            peer ? peer.metadata.name : 'unknown dApp'
                          }.`,
                        })
                        walletConnectCtx.rejectRequest(request)
                        resetState()
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
              disabled={!isValid() || loading}
            >
              Connect
            </Button>
          </form>
        </FullHeightPanel>
      )
  }
}

export default ConnectDapp
