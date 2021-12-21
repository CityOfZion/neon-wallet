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
import { TX_STATE_TYPE_MAPPINGS } from './mocks'
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

const WITNESS_SCOPE = {
  '0': 'None',
  '1': 'CalledByEntry',
  '16': 'CustomContracts',
  '32': 'CustomGroups',
  '128': 'Global',
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
    CONNECTION_STEPS.ENTER_URL,
  )
  const [proposal, setProposal] = useState(null)
  const [peer, setPeer] = useState(null)
  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fee, setFee] = useState('')
  const [requestParamsVisible, setRequestParamsVisible] = useState({})
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

      // setTimeout used here to prevent UI loading "flicker"
      setTimeout(() => {
        setLoading(false)
      }, 1500)
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
        walletConnectCtx
          .getPeerOfRequest(walletConnectCtx.requests[0])
          .then(setPeer)
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

      const getContractManifest = async (invocation, chainId) => {
        setLoading(true)
        const hash = invocation.scriptHash
        const {
          data: {
            manifest: { name, abi },
          },
        } = await axios.get(
          chainId.includes('mainnet')
            ? `https://dora.coz.io/api/v1/neo3/mainnet/contract/${hash}`
            : `https://dora.coz.io/api/v1/neo3/testnet_rc4/contract/${hash}`,
        )
        setLoading(false)
        return { name, abi }
      }

      const mapContractDataToInvocation = async request => {
        for (const invocation of request.request.params.invocations) {
          const { name, abi } = await getContractManifest(
            invocation,
            request.chainId,
          )
          invocation.contract = {
            name,
            abi,
          }
        }
        setRequest(request)
        setConnectionStep(CONNECTION_STEPS.APPROVE_TRANSACTION)
      }

      if (firstRequest) {
        getGasFee(firstRequest.request)
        mapContractDataToInvocation(firstRequest)
      }
    },
    [firstRequest, address, net],
  )

  const shouldDisplayReqParams = invocation => !!invocation.args.length

  const renderInstructions = () => (
    <p>
      All transactions requested by a connected Dapp will be presented for
      signing before being broadcast to the blockchain. No action from the Dapp
      will happen without your direct approval.
    </p>
  )

  const getParamDefinitions = invocation => {
    if (invocation.contract && invocation.contract.abi) {
      return invocation.contract.abi.methods.find(
        method => method.name === invocation.operation,
      ).parameters
    }
    return new Array(invocation.args.length)
      .fill()
      .map((_, i) => ({ name: i, type: 'unknown' }))
  }

  const renderParam = (arg: any, definition: any) => (
    <React.Fragment>
      <div className={styles.parameterName}>{definition.name}:</div>
      <div
        className={
          arg.type === 'Array' ? styles.parameterArray : styles.parameterValue
        }
        style={{
          borderColor:
            TX_STATE_TYPE_MAPPINGS[definition && definition.type] &&
            TX_STATE_TYPE_MAPPINGS[definition && definition.type].color,
        }}
      >
        {arg.type !== 'Array' && (
          <React.Fragment>
            <span>{arg.value}</span>
            <CopyToClipboard text={String(arg && arg.value)} />
          </React.Fragment>
        )}
        {arg.type === 'Array' &&
          arg.value.map((element, j) => (
            <div>
              <div className={styles.arrayValue}>
                <div className={styles.index}>{j}</div>
                <span>{element && element.value}</span>
              </div>
              <CopyToClipboard text={String(element && element.value)} />
            </div>
          ))}
      </div>
      <div className={styles.parameterType}>{definition.type}</div>
    </React.Fragment>
  )

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
                    <label>CHAINS</label>
                    {proposal &&
                      proposal.permissions.blockchain.chains.map(chain => (
                        <div key={chain}>{chain}</div>
                      ))}
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
              {/* <span className={styles.methodName}>{contractName}</span> contract */}
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

            {request &&
              request.request.params.invocations.map((invocation, i) => (
                <React.Fragment>
                  <div className={styles.contractName}>
                    <div className={classNames([])}>
                      {invocation.contract.name}
                    </div>
                  </div>

                  <div className={styles.connectionDetails}>
                    <div
                      className={classNames([
                        styles.detailsLabel,
                        styles.detailRow,
                      ])}
                    >
                      <label>hash</label>
                      <div className={styles.scriptHash}>
                        {invocation.scriptHash}{' '}
                        {theme === 'Light' ? (
                          <DoraIcon
                            onClick={() =>
                              handleOpenDoraLink(invocation.scriptHash)
                            }
                          />
                        ) : (
                          <DoraIconDark
                            onClick={() =>
                              handleOpenDoraLink(invocation.scriptHash)
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
                      <div>{invocation.operation}</div>
                    </div>
                    {shouldDisplayReqParams(invocation) ? (
                      <div
                        className={classNames([
                          styles.details,
                          styles.radius,
                          styles.pointer,
                        ])}
                      >
                        <div
                          className={classNames([
                            styles.radius,
                            styles.detailsLabel,
                            styles.noBorder,
                            styles.noPadding,
                          ])}
                          onClick={() =>
                            setRequestParamsVisible({
                              ...requestParamsVisible,
                              [i]: !requestParamsVisible[i],
                            })
                          }
                        >
                          <label>request parameters</label>

                          <div>
                            {requestParamsVisible[i] ? <Up /> : <Down />}
                          </div>
                        </div>
                        {requestParamsVisible[i] && (
                          <div className={styles.requestParams}>
                            {invocation.args.map((p: any, i: number) => {
                              const paramDefinitions = getParamDefinitions(
                                invocation,
                              )
                              return (
                                <div
                                  className={styles.methodParameter}
                                  style={{
                                    backgroundColor:
                                      TX_STATE_TYPE_MAPPINGS[
                                        paramDefinitions[i] &&
                                          paramDefinitions[i].type
                                      ] &&
                                      TX_STATE_TYPE_MAPPINGS[
                                        paramDefinitions[i] &&
                                          paramDefinitions[i].type
                                      ].color,
                                    borderColor:
                                      TX_STATE_TYPE_MAPPINGS[
                                        paramDefinitions[i] &&
                                          paramDefinitions[i].type
                                      ] &&
                                      TX_STATE_TYPE_MAPPINGS[
                                        paramDefinitions[i] &&
                                          paramDefinitions[i].type
                                      ].color,
                                  }}
                                >
                                  {renderParam(p, paramDefinitions[i])}
                                </div>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                  <br />
                </React.Fragment>
              ))}
            {request &&
              request.request.params.signers && (
                <div
                  className={classNames([
                    styles.detailsLabel,
                    styles.detailRow,
                    styles.sigRow,
                  ])}
                >
                  <label>signature scope</label>
                  <div>
                    {
                      WITNESS_SCOPE[
                        String(request.request.params.signers[0].scopes)
                      ]
                    }
                    {WITNESS_SCOPE[
                      String(request.request.params.signers[0].scopes)
                    ] === 'Global' && <WarningIcon />}
                  </div>
                </div>
              )}
            <div
              className={classNames([
                styles.detailsLabel,
                styles.detailRow,
                styles.feeRow,
              ])}
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
        </FullHeightPanel>
      )
    default:
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
}

export default ConnectDapp
