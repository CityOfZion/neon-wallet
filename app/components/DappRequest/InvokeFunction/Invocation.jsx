// @flow
import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { electron } from 'process'
import { rpc as n3RPC } from '@cityofzion/neon-js'
import styles from '../../../containers/ConnectDapp/styles.scss'
import DoraIcon from '../../../assets/icons/dora_icon_light.svg'
import DoraIconDark from '../../../assets/icons/dora_icon_dark.svg'
import Up from '../../../assets/icons/chevron-up.svg'
import WarningIcon from '../../../assets/icons/warning.svg'
import Down from '../../../assets/icons/chevron-down.svg'
import { getNode, getRPCEndpoint } from '../../../actions/nodeStorageActions'
import CopyToClipboard from '../../CopyToClipboard/CopyToClipboard'
import {
  COLORS_BY_PARAMETER_TYPE,
  WITNESS_SCOPE,
} from '../../../core/constants'
import Loader from '../../Loader/Loader'

type Props = {
  invocation: any,
  requestParams: any,
  theme: string,
  net: string,
}

const Invocation = ({ invocation, theme, net, requestParams }: Props) => {
  const [isOpen, setIsOpen] = useState(true)
  const [contractName, setContractName] = useState()
  const [contractParameters, setContractParameter] = useState([])
  const [loading, setLoading] = useState(false)

  const handleOpenDoraLink = (contractHash: string) => {
    electron.shell.openExternal(
      net === 'MainNet'
        ? `https://dora.coz.io/contract/neo3/mainnet/${contractHash}`
        : `https://dora.coz.io/contract/neo3/testnet/${contractHash}`,
    )
  }

  const handleContractManifest = useCallback(
    async () => {
      try {
        setLoading(true)
        let endpoint = await getNode(net)
        if (!endpoint) {
          endpoint = await getRPCEndpoint(net)
        }
        const rpcClient = new n3RPC.RPCClient(endpoint)

        const {
          manifest: { name, abi },
        } = await rpcClient.getContractState(invocation.scriptHash)

        setContractName(name)

        const method = abi.methods.find(
          method => method.name === invocation.operation,
        )

        const parameters = invocation.args.map((arg, i) => ({
          name: method?.parameters[i]?.name ?? i,
          type: arg.type,
          value: arg.value ?? 'null',
        }))

        setContractParameter(parameters)
      } finally {
        setLoading(false)
      }
    },
    [net, invocation],
  )

  useEffect(
    () => {
      handleContractManifest()
    },
    [handleContractManifest],
  )

  return loading ? (
    <div className={styles.invocationLoaderContainer}>
      <Loader className={styles.invocationLoader} />
    </div>
  ) : (
    <>
      <div className={styles.contractName}>
        {contractName ?? invocation.scriptHash}
      </div>

      <div className={styles.transactionDetails}>
        <div className={classNames([styles.detailsLabel, styles.detailRow])}>
          <label>hash</label>
          <div className={styles.scriptHash}>
            {invocation.scriptHash}

            {theme === 'Light' ? (
              <DoraIcon
                onClick={() => handleOpenDoraLink(invocation.scriptHash)}
              />
            ) : (
              <DoraIconDark
                onClick={() => handleOpenDoraLink(invocation.scriptHash)}
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

        {invocation.args?.length > 0 && (
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
              onClick={() => setIsOpen(!isOpen)}
            >
              <label>request parameters</label>

              <div>{!isOpen ? <Up /> : <Down />}</div>
            </div>

            {isOpen && (
              <div className={styles.requestParams}>
                {contractParameters.map((parameter, index) => (
                  <div
                    key={index}
                    className={styles.methodParameter}
                    style={{
                      backgroundColor: COLORS_BY_PARAMETER_TYPE[parameter.type],
                      borderColor: COLORS_BY_PARAMETER_TYPE[parameter.type],
                    }}
                  >
                    <div
                      className={classNames({
                        [styles.parameterName]: true,
                        [styles.shortParam]: typeof parameter.name === 'number',
                      })}
                    >
                      {parameter.name}
                    </div>
                    <div
                      className={styles.parameterValue}
                      style={{
                        borderColor: COLORS_BY_PARAMETER_TYPE[parameter.type],
                        border: 'none',
                      }}
                    >
                      <span>{JSON.stringify(parameter.value)}</span>
                      <CopyToClipboard text={JSON.stringify(parameter.value)} />
                    </div>
                    <div
                      className={styles.parameterType}
                      style={{
                        width: '50px',
                        justifyContent: 'center',
                        marginLeft: 'auto',
                      }}
                    >
                      {parameter.type}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {requestParams.signers?.length > 1 && (
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
              {requestParams.signers.map((signer, i) => (
                <div className={styles.multiSigCell}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={styles.index}>{i}</div>

                    {WITNESS_SCOPE[String(signer.scopes)]}
                    {WITNESS_SCOPE[String(signer.scopes)] === 'Global' && (
                      <WarningIcon />
                    )}
                  </div>

                  <div
                    className={classNames([
                      styles.detailsLabel,
                      styles.detailRow,
                    ])}
                  >
                    <label>account</label>
                    <div className={styles.scriptHash}>{signer.account}</div>
                  </div>

                  {signer.allowedContracts?.length > 0 &&
                    signer.allowedContracts.map(contract => (
                      <div
                        className={classNames([
                          styles.detailsLabel,
                          styles.detailRow,
                          styles.contractRow,
                        ])}
                      >
                        <label>contract</label>
                        <div className={styles.scriptHash}>
                          {contract}
                          {theme === 'Light' ? (
                            <DoraIcon
                              onClick={() => handleOpenDoraLink(contract)}
                            />
                          ) : (
                            <DoraIconDark
                              onClick={() => handleOpenDoraLink(contract)}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <br />
    </>
  )
}

export default Invocation
