// @flow

import React from 'react'
import classNames from 'classnames'
import { JsonRpcRequest } from '@json-rpc-tools/utils'

import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import FullHeightPanel from '../Panel/FullHeightPanel'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import styles from '../../containers/ConnectDapp/styles.scss'
import DialogueBox from '../DialogueBox'
import WarningIcon from '../../assets/icons/warning.svg'
import Confirm from '../../assets/icons/confirm_connection.svg'
import Deny from '../../assets/icons/deny_connection.svg'
import { TX_STATE_TYPE_MAPPINGS } from '../../containers/ConnectDapp/mocks'
import CopyToClipboard from '../CopyToClipboard'
import Tooltip from '../Tooltip'
import DoraIcon from '../../assets/icons/dora_icon_light.svg'
import DoraIconDark from '../../assets/icons/dora_icon_dark.svg'
import Info from '../../assets/icons/info.svg'
import Up from '../../assets/icons/chevron-up.svg'
import Down from '../../assets/icons/chevron-down.svg'

const electron = require('electron')

const WITNESS_SCOPE = {
  '0': 'None',
  '1': 'CalledByEntry',
  '16': 'CustomContracts',
  '32': 'CustomGroups',
  '128': 'Global',
}

const ApproveTransaction = ({
  request,
  peer,
  isHardwareLogin,
  resetState,
  history,
  showSuccessNotification,
  setLoading,
  loading,
  fee,
  theme,
  requestParamsVisible,
  setRequestParamsVisible,
  net,
}: {
  request: JsonRpcRequest,
  peer: any,
  isHardwareLogin: boolean,
  resetState: () => any,
  history: any,
  showSuccessNotification: ({ message: string }) => any,
  setLoading: boolean => any,
  loading: boolean,
  fee: string,
  theme: string,
  requestParamsVisible: { [key: number]: boolean },
  setRequestParamsVisible: ({ [key: number]: boolean }) => any,
  net: string,
}) => {
  const walletConnectCtx = useWalletConnect()

  const shouldDisplayReqParams = invocation => !!invocation.args.length

  const getParamDefinitions = invocation => {
    if (invocation.contract && invocation.contract.abi) {
      return invocation.contract.abi.methods.find(
        method => method.name === invocation.operation,
      ).parameters
    }
    return invocation.args.map((arg, i) => ({ name: i, type: arg.type }))
  }

  const renderParam = (arg: any, definition: any, i: number) => {
    function mapArrayArg(argValue: any, index: number) {
      return (
        <div
          key={index}
          className={styles.methodParameter}
          style={{
            backgroundColor: TX_STATE_TYPE_MAPPINGS[argValue.type]?.color,
            borderColor: TX_STATE_TYPE_MAPPINGS[argValue.type]?.color,
            padding: '0 2px',
          }}
        >
          <div className={styles.arrayValue} style={{ width: 'auto' }}>
            <div className={styles.index}>{index}</div>
            <span>{argValue && argValue.value}</span>
            <CopyToClipboard text={String(argValue && argValue.value)} />
          </div>

          <div
            className={styles.parameterType}
            style={{ justifyContent: 'flex-end', width: 'auto' }}
          >
            {argValue?.type}
          </div>
        </div>
      )
    }

    return (
      <div
        key={i}
        className={styles.methodParameter}
        style={{
          backgroundColor: TX_STATE_TYPE_MAPPINGS[(definition?.type)]?.color,
          borderColor: TX_STATE_TYPE_MAPPINGS[(definition?.type)]?.color,
        }}
      >
        <div
          className={classNames({
            [styles.parameterName]: true,
            [styles.shortParam]: typeof definition?.name === 'number',
          })}
        >
          {' '}
          {definition?.name ?? null}
        </div>
        <div
          className={
            arg.type === 'Array' ? styles.parameterArray : styles.parameterValue
          }
          style={{
            borderColor:
              TX_STATE_TYPE_MAPPINGS[(definition?.type)] &&
              TX_STATE_TYPE_MAPPINGS[(definition?.type)]?.color,

            border: 'none',
          }}
        >
          {arg.type !== 'Array' && (
            <React.Fragment>
              <span>{arg.value || 'null'}</span>
              <CopyToClipboard text={String((arg && arg.value) || 'null')} />
            </React.Fragment>
          )}
          {arg.type === 'Array' &&
            arg.value.map(
              (arg, i) =>
                arg.type === 'Array'
                  ? renderParam(arg, { name: i, type: arg.type }, i)
                  : mapArrayArg(arg, i),
            )}
        </div>
        <div
          className={styles.parameterType}
          style={{
            width: '50px',
            justifyContent: 'center',
            'margin-left': 'auto',
          }}
        >
          {definition?.type}
        </div>
      </div>
    )
  }

  const handleOpenDoraLink = hash => {
    if (hash) {
      return electron.shell.openExternal(
        net === 'MainNet'
          ? `https://dora.coz.io/contract/neo3/mainnet/${hash}`
          : `https://dora.coz.io/contract/neo3/testnet/${hash}`,
      )
    }
    return null
  }

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
      className={styles.approveTransactionPanel}
      containerClassName={styles.approveTransactionPanelContainer}
    >
      <div
        className={classNames([
          styles.approveConnectionContainer,
          styles.approveRequestContainer,
        ])}
      >
        <img src={peer && peer.metadata.icons[0]} />

        <h3 className={styles.wantsToCallHeader}>
          {peer && peer.metadata.name} wants to call{' '}
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
                contract data in the Neo N3 app settings. Read more about how to
                enable this setting{' '}
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
          request.params.request.params.invocations.map((invocation, i) => (
            <React.Fragment key={i}>
              <div className={styles.contractName}>
                <div className={classNames([])}>
                  {invocation.contract?.name}
                </div>
              </div>

              <div className={styles.transactionDetails}>
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

                      <div>{requestParamsVisible[i] ? <Up /> : <Down />}</div>
                    </div>
                    {requestParamsVisible[i] && (
                      <div className={styles.requestParams}>
                        {invocation.args.map((p: any, i: number) => {
                          const paramDefinitions = getParamDefinitions(
                            invocation,
                          )
                          return renderParam(p, paramDefinitions[i], i)
                        })}
                      </div>
                    )}
                  </div>
                ) : null}
                {request?.params?.request?.params?.signers?.length > 1 && (
                  <div
                    className={classNames([
                      styles.detailsLabel,
                      styles.detailRow,
                      styles.multiSigRow,
                    ])}
                    style={{ borderBottom: 'none' }}
                  >
                    <label>signature scopes</label>

                    <div className={styles.multiSigColumn}>
                      {request.params.request.params.signers.map(
                        (signer, i) => (
                          <div className={styles.multiSigCell}>
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <div className={styles.index}>{i}</div>

                              {WITNESS_SCOPE[String(signer.scopes)]}
                              {WITNESS_SCOPE[String(signer.scopes)] ===
                                'Global' && <WarningIcon />}
                            </div>
                            <div
                              className={classNames([
                                styles.detailsLabel,
                                styles.detailRow,
                              ])}
                            >
                              <label>account</label>
                              <div className={styles.scriptHash}>
                                {signer.account}{' '}
                                {theme === 'Light' ? (
                                  <DoraIcon
                                    onClick={() =>
                                      handleOpenDoraLink(signer.account)
                                    }
                                  />
                                ) : (
                                  <DoraIconDark
                                    onClick={() =>
                                      handleOpenDoraLink(signer.account)
                                    }
                                  />
                                )}
                              </div>
                            </div>

                            {/* $FlowFixMe */}
                            {signer.allowedContracts?.length &&
                              /* $FlowFixMe */
                              signer.allowedContracts?.map(contract => (
                                <div
                                  className={classNames([
                                    styles.detailsLabel,
                                    styles.detailRow,
                                    styles.contractRow,
                                  ])}
                                >
                                  <label>contract</label>
                                  <div className={styles.scriptHash}>
                                    {contract}{' '}
                                    {theme === 'Light' ? (
                                      <DoraIcon
                                        onClick={() =>
                                          handleOpenDoraLink(contract)
                                        }
                                      />
                                    ) : (
                                      <DoraIconDark
                                        onClick={() =>
                                          handleOpenDoraLink(contract)
                                        }
                                      />
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
              <br />
            </React.Fragment>
          ))}
        {request?.params?.request?.params?.signers?.length > 1 ? null : (
          <div
            className={classNames([
              styles.detailsLabel,
              styles.detailRow,
              styles.singleSigRow,
            ])}
          >
            <label>signature scope</label>
            {!!request.params.request.params.signers.length && (
              <div>
                {
                  WITNESS_SCOPE[
                    String(request.params.request.params.signers[0]?.scopes)
                  ]
                }
                {WITNESS_SCOPE[
                  String(request.params.request.params.signers[0]?.scopes)
                ] === 'Global' && <WarningIcon />}
              </div>
            )}
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
}

export default ApproveTransaction
