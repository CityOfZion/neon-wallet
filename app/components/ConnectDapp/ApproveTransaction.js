// @flow

import React from 'react'
import classNames from 'classnames'
import { isEmpty } from 'lodash-es'
import { JsonRpcRequest } from '@json-rpc-tools/utils'

import { useWalletConnect } from '../../context/WalletConnect/WalletConnectContext'
import { ROUTES } from '../../core/constants'
import CloseButton from '../CloseButton'
import FullHeightPanel from '../Panel/FullHeightPanel'
import WallletConnect from '../../assets/icons/wallet_connect.svg'
import styles from '../../containers/ConnectDapp/styles.scss'
import CheckMarkIcon from '../../assets/icons/confirm-circle.svg'
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
            <span>{arg.value || 'null'}</span>
            <CopyToClipboard text={String((arg && arg.value) || 'null')} />
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

        <h3>{peer && peer.metadata.name} wants to call </h3>

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
          request.request.params.invocations.map((invocation, i) => (
            <React.Fragment key={i}>
              <div className={styles.contractName}>
                <div className={classNames([])}>{invocation.contract.name}</div>
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

                      <div>{requestParamsVisible[i] ? <Up /> : <Down />}</div>
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
}

export default ApproveTransaction
