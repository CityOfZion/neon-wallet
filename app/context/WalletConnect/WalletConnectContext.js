// @flow

import React, { useCallback, useContext, useEffect, useState } from 'react'
// eslint-disable-next-line
import SignClient from '@walletconnect/sign-client'
import { SignClientTypes, SessionTypes } from '@walletconnect/types'
import { ERROR } from '@walletconnect/utils'

import {
  formatJsonRpcError,
  JsonRpcRequest,
  JsonRpcResponse,
} from '@json-rpc-tools/utils'

export type SessionRequest = SignClientTypes.EventArguments.session_request
export type SessionProposal = SignClientTypes.EventArguments.session_proposal
export type AddressAndChain = {
  address: string,
  chain: string,
}

// $FlowFixMe
export const WalletConnectContext = React.createContext({})

export const WalletConnectContextProvider = ({
  options,
  children,
}: {
  options: SignClientTypes.Options,
  children: any,
}) => {
  const [signClient, setSignClient] = useState(undefined)
  const [sessionProposals, setSessionProposals] = useState([])
  const [initialized, setInitialized] = useState(false)
  // $FlowFixMe
  const [sessions, setSessions] = useState([])
  const [requests, setRequests] = useState([])
  const [onRequestCallback, setOnRequestCallback] = useState(undefined)
  const [autoAcceptCallback, setAutoAcceptCallback] = useState(undefined)
  // $FlowFixMe
  const [txHash, setTxHash] = useState('')
  // $FlowFixMe
  const [messageVerification, setMessageVerificationResult] = useState({})
  //   // $FlowFixMe
  const [error, setError] = useState(false)

  const init = useCallback(async () => {
    try {
      console.log('initializing WC client', { options })
      setSignClient(await SignClient.init(options))
    } catch (e) {
      console.error({ e })
    }
  }, [])

  const clearStorage = () => {
    Object.values(localStorage).forEach(storageValue => {
      if (
        typeof storageValue === 'string' &&
        (storageValue.substring(0, 2) === 'wc' ||
          storageValue.includes('request-{'))
      ) {
        localStorage.removeItem(storageValue)
      }
    })
  }

  const resetApp = async () => {
    if (sessions.length) {
      await Promise.all(
        sessions.map(
          session =>
            signClient &&
            signClient.disconnect({
              topic: session.topic,
              reason: ERROR.USER_DISCONNECTED.format(),
            }),
        ),
      )
    }
    clearStorage()
  }

  useEffect(
    () => {
      init()
      clearStorage()
    },
    [init],
  )

  const loadSessions = useCallback(
    async () => {
      if (!signClient) {
        throw new Error('Client is not initialized')
      }
      setSessions(signClient.session.values)
      setInitialized(true)
    },
    [signClient],
  )

  // ---- MAKE REQUESTS AND SAVE/CHECK IF APPROVED ------------------------------//
  const onRequestListener = (listener: any) => {
    setOnRequestCallback(() => listener)
  }

  const autoAcceptIntercept = (listener: any) => {
    setAutoAcceptCallback(() => listener)
  }

  const findSessionByTopic = useCallback(
    (topic: string) => sessions.find(session => session.topic === topic),
    [JSON.stringify(sessions)],
  )

  const makeRequest = useCallback(
    async (requestEvent: SessionRequest) => {
      const foundSession = findSessionByTopic(requestEvent.topic)

      if (foundSession) {
        const ns = Object.values(foundSession.namespaces)[0]
        if (ns && ns.accounts) {
          // $FlowFixMe
          const acc = ns.accounts[0]
          if (!acc) {
            throw new Error('There is no Account')
          }
          const [namespace, reference, address] = acc.split(':')
          const chainId = `${namespace}:${reference}`
          if (!onRequestCallback) {
            throw new Error('There is no onRequestCallback')
          }
          const response = await onRequestCallback(
            address,
            chainId,
            requestEvent,
          )
          if (response && response.result && !response.isMessage) {
            setTxHash(response.result)
          } else if (response && response.result && response.isMessage) {
            setMessageVerificationResult({
              ...response,
              method: requestEvent.params.request.method,
            })
          } else {
            const { result } = response
            setError(
              result
                ? result.error
                : 'An unkown error occurred please try again.',
            )
          }

          return response
        }
      }
    },
    [findSessionByTopic],
  )

  const respondRequest = useCallback(
    async (topic: string, response: JsonRpcResponse) => {
      if (!signClient) {
        throw new Error('Client is not initialized')
      }
      await signClient.respond({ topic, response })
    },
    [signClient],
  )
  const subscribeToEvents = useCallback(
    () => {
      if (!signClient) {
        throw new Error('Client is not initialized')
      }

      signClient.events.removeAllListeners()

      signClient.on('session_proposal', (proposal: SessionProposal) => {
        setSessionProposals(old => [...old, proposal])
      })

      signClient.on('session_request', async (requestEvent: SessionRequest) => {
        try {
          if (autoAcceptCallback) {
            let address
            let chainId
            const foundSession = findSessionByTopic(requestEvent.topic)
            // $FlowFixMe
            const ns = Object.values(foundSession.namespaces)[0]
            // $FlowFixMe
            const acc = ns.accounts[0]
            if (acc) {
              const [namespace, reference, addr] = acc.split(':')
              address = addr
              chainId = `${namespace}:${reference}`
            }
            const autoAccepted = autoAcceptCallback(
              address,
              chainId,
              requestEvent,
            )
            if (autoAccepted) {
              const response = await makeRequest(requestEvent)
              await respondRequest(requestEvent.topic, response)
              return
            }
          }

          setRequests(old => [
            ...old.filter(i => i.id !== requestEvent.id),
            requestEvent,
          ])
        } catch (e) {
          const response = formatJsonRpcError(requestEvent.id, e.message)
          await respondRequest(requestEvent.topic, response)
        }
      })

      signClient.on('session_delete', () => {
        if (!signClient) {
          throw new Error('Client is not initialized')
        }
        setSessions(signClient.session.values)
      })
    },
    [makeRequest, respondRequest, signClient, findSessionByTopic],
  )

  useEffect(
    () => {
      if (signClient) {
        subscribeToEvents()
        loadSessions()
      }
    },
    [signClient, subscribeToEvents, loadSessions],
  )

  const onURI = async (data: any) => {
    try {
      const uri = typeof data === 'string' ? data : ''
      if (!uri) return
      if (!signClient) {
        throw new Error('Client is not initialized')
      }

      await signClient.pair({ uri })
    } catch (error) {
      throw new Error('client Pair Error')
    }
  } // this should not be a callback because it would require the developer to put it as dependency

  const getPeerOfRequest = async (requestEvent: SessionRequest) => {
    if (!signClient) {
      throw new Error('Client is not initialized')
    }
    const { peer } = await signClient.session.get(requestEvent.topic)
    return peer
  } // this should not be a callback because it would require the developer to put it as dependency

  const approveSession = async (
    proposal: SessionProposal,
    accountsAndChains: AddressAndChain[],
    namespacesWithoutAccounts: SessionTypes.Namespaces,
  ) => {
    if (!signClient) {
      throw new Error('Client is not initialized')
    }
    if (typeof accountsAndChains === 'undefined') {
      throw new Error('Accounts is undefined')
    }
    const accounts = accountsAndChains.map(acc => `${acc.chain}:${acc.address}`)

    const namespaces: SessionTypes.Namespaces = Object.keys(
      namespacesWithoutAccounts,
    ).reduce((result, key) => {
      result[key] = { ...namespacesWithoutAccounts[key], accounts }
      return result
    }, {})

    const { acknowledged } = await signClient.approve({
      id: proposal.id,
      namespaces,
    })

    const session = await acknowledged()

    // $FlowFixMe
    setSessionProposals(old => old.filter(i => i !== proposal))
    setSessions([session])
  } // this should not be a callback because it would require the developer to put it as dependency

  const rejectSession = async (proposal: SessionProposal) => {
    if (!signClient) {
      throw new Error('Client is not initialized')
    }
    await signClient.reject({
      id: proposal.id,
      reason: {
        code: 1,
        message: 'rejected by the user',
      },
    })
    setSessionProposals(old => old.filter(i => i !== proposal))
  } // this should not be a callback because it would require the developer to put it as dependency

  const disconnect = async (topic: string) => {
    if (!signClient) {
      throw new Error('Client is not initialized')
    }
    await signClient.disconnect({
      topic,
      reason: { code: 5900, message: 'USER_DISCONNECTED' },
    })

    setSessions(signClient.session.values)
  } // this should not be a callback because it would require the developer to put it as dependency

  const removeFromPending = async (requestEvent: JsonRpcRequest) => {
    setRequests(
      // $FlowFixMe
      requests.filter(x => x.request?.id !== requestEvent.request?.id),
    )
  }

  const approveRequest = async (requestEvent: SessionRequest) => {
    if (!signClient) {
      throw new Error('Client is not initialized')
    }
    try {
      const response = await makeRequest(requestEvent)
      await signClient.respond({
        topic: requestEvent.topic,
        response,
      })
      await removeFromPending(requestEvent)
      return response
    } catch (error) {
      await signClient.respond({
        topic: requestEvent.topic,
        response: formatJsonRpcError(
          requestEvent.id,
          'Failed or Rejected Request',
        ),
      })
      throw error
    }
  } // this should not be a callback because it would require the developer to put it as dependency

  const rejectRequest = async (requestEvent: SessionRequest) => {
    if (!signClient) {
      throw new Error('Client is not initialized')
    }
    await signClient.respond({
      topic: requestEvent.topic,
      response: formatJsonRpcError(
        requestEvent.id,
        'Failed or Rejected Request',
      ),
    })
    await removeFromPending(requestEvent)
  } // this should not be a callback because it would require the developer to put it as dependency

  const contextValue = {
    signClient,
    sessionProposals,
    initialized,
    sessions,
    setSessions,
    requests,
    init,
    onURI,
    getPeerOfRequest,
    approveSession,
    rejectSession,
    disconnect,
    approveRequest,
    rejectRequest,
    onRequestListener,
    autoAcceptIntercept,
    resetApp,
    setError,
    error,
    txHash,
    messageVerification,
    setMessageVerificationResult,
    setTxHash,
  }

  return (
    <WalletConnectContext.Provider value={contextValue}>
      {children}
    </WalletConnectContext.Provider>
  )
}

export const useWalletConnect = () => useContext(WalletConnectContext)
