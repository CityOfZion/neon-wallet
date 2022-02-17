// @flow
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { wallet, rpc } from '@cityofzion/neon-js-next'
import axios from 'axios'
import { isEmpty } from 'lodash-es'

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
import { TX_STATE_TYPE_MAPPINGS } from './mocks'
import { getNode, getRPCEndpoint } from '../../actions/nodeStorageActions'
import DialogueBox from '../../components/DialogueBox'
import WarningIcon from '../../assets/icons/warning.svg'
import CopyToClipboard from '../../components/CopyToClipboard/CopyToClipboard'
import Tooltip from '../../components/Tooltip'
import ConnectionLoader from '../../components/ConnectDapp/ConnectionLoader'
import ConnectionError from '../../components/ConnectDapp/ConnectionError'
import MessageSuccess from '../../components/ConnectDapp/MessageSuccess'
import TransactionSuccess from '../../components/ConnectDapp/TransactionSuccess'
import VerifyOrSignMessage from '../../components/ConnectDapp/VerifyOrSignMessage'
import ApproveConnection from '../../components/ConnectDapp/ApproveConnection'
import ApproveTransaction from '../../components/ConnectDapp/ApproveTransaction'
import ConnectionUrlForm from '../../components/ConnectDapp/ConnectionUrlForm'

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
  SIGN_MESSAGE: 'SIGN_MESSAGE',
  VERIFY_MESSAGE: 'VERIFY_MESSAGE',
  MESSAGE_SUCCESS: 'MESSAGE_SUCCESS',
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
    // walletConnectCtx.setMessageVerificationResult({})
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
      if (!isEmpty(walletConnectCtx.messageVerification)) {
        setConnectionStep(CONNECTION_STEPS.MESSAGE_SUCCESS)
      }
    },
    [walletConnectCtx.messageVerification],
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

      const getContractManifest = async invocation => {
        setLoading(true)

        let endpoint = await getNode(net)
        if (!endpoint) {
          endpoint = await getRPCEndpoint(net)
        }
        const rpcClient = new rpc.RPCClient(endpoint)

        const {
          manifest: { name, abi },
        } = await rpcClient.execute(
          new rpc.Query({
            method: 'getcontractstate',
            params: [invocation.scriptHash],
          }),
        )
        setLoading(false)
        return { name, abi }
      }

      const mapContractDataToInvocation = async request => {
        for (const invocation of request.request.params.invocations) {
          const { name, abi } = await getContractManifest(invocation)
          invocation.contract = {
            name,
            abi,
          }
        }
        setRequest(request)
        setConnectionStep(CONNECTION_STEPS.APPROVE_TRANSACTION)
      }

      if (firstRequest) {
        // if (firstRequest.request.params.error) {
        //   walletConnectCtx.rejectSession(proposal).then(() => {
        //     showSuccessNotification({
        //       message: `You have rejected connection from ${
        //         proposal ? proposal.proposer.metadata.name : 'unknown dApp'
        //       } beacause the request included an error.`,
        //     })
        //     resetState()
        //     return history.push(ROUTES.DASHBOARD)
        //   })
        // }

        // if (!firstRequest.request.params.error) {
        if (
          firstRequest.request.method === 'signMessage' ||
          firstRequest.request.method === 'verifyMessage'
        ) {
          setConnectionStep(
            firstRequest.request.method === 'signMessage'
              ? CONNECTION_STEPS.SIGN_MESSAGE
              : CONNECTION_STEPS.VERIFY_MESSAGE,
          )
          setRequest(firstRequest)
        } else {
          getGasFee(firstRequest.request)
          mapContractDataToInvocation(firstRequest)
        }
      }
      // }
    },
    [firstRequest, address, net],
  )

  switch (true) {
    case loading:
      return <ConnectionLoader />
    case connectionStep === CONNECTION_STEPS.TRANSACTION_ERROR:
      return <ConnectionError />
    case connectionStep === CONNECTION_STEPS.MESSAGE_SUCCESS:
      return <MessageSuccess />
    case connectionStep === CONNECTION_STEPS.TRANSACTION_SUCCESS:
      return <TransactionSuccess />
    case connectionStep === CONNECTION_STEPS.APPROVE_CONNECTION:
      return (
        <ApproveConnection
          proposal={proposal}
          showSuccessNotification={showSuccessNotification}
          resetState={resetState}
          history={history}
        />
      )
    case connectionStep === CONNECTION_STEPS.SIGN_MESSAGE:
      return (
        <VerifyOrSignMessage
          request={request}
          peer={peer}
          isHardwareLogin={!!isHardwareLogin}
          resetState={resetState}
          history={history}
          showSuccessNotification={showSuccessNotification}
          setLoading={setLoading}
          loading={loading}
          isSignMessage
        />
      )
    case connectionStep === CONNECTION_STEPS.VERIFY_MESSAGE:
      return (
        <VerifyOrSignMessage
          request={request}
          peer={peer}
          isHardwareLogin={!!isHardwareLogin}
          resetState={resetState}
          history={history}
          showSuccessNotification={showSuccessNotification}
          setLoading={setLoading}
          loading={loading}
          isSignMessage={false}
        />
      )
    case connectionStep === CONNECTION_STEPS.APPROVE_TRANSACTION:
      return (
        <ApproveTransaction
          request={request}
          peer={peer}
          isHardwareLogin={!!isHardwareLogin}
          resetState={resetState}
          history={history}
          showSuccessNotification={showSuccessNotification}
          setLoading={setLoading}
          loading={loading}
          theme={theme}
          net={net}
          fee={fee}
          requestParamsVisible={requestParamsVisible}
          setRequestParamsVisible={setRequestParamsVisible}
        />
      )
    default:
      return (
        <ConnectionUrlForm
          loading={loading}
          handleWalletConnectURLSubmit={handleWalletConnectURLSubmit}
          setConnectionUrl={setConnectionUrl}
          connectionUrl={connectionUrl}
        />
      )
  }
}

export default ConnectDapp
