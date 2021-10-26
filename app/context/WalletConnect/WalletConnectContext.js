// @flow

import React, { useCallback, useContext, useEffect, useState } from 'react'
import Client, { CLIENT_EVENTS } from '@walletconnect/client'
import { ERROR } from '@walletconnect/utils'
import KeyValueStorage from 'keyvaluestorage'
import { SessionTypes, AppMetadata } from '@walletconnect/types'
import {
  formatJsonRpcError,
  JsonRpcRequest,
  JsonRpcResponse,
} from '@json-rpc-tools/utils'

type CtxOptions = {
  appMetadata: AppMetadata,
  chainIds: string[],
  logger?: string,
  methods: string[],
  relayServer: string,
}

// $FlowFixMe
export const WalletConnectContext = React.createContext({})

export const WalletConnectContextProvider = ({
  options,
  children,
}: {
  options: CtxOptions,
  children: any,
}) => {
  // $FlowFixMe
  const [wcClient, setWcClient] = useState(undefined)
  // $FlowFixMe
  const [storage, setStorage] = useState(undefined)
  // $FlowFixMe
  const [sessionProposals, setSessionProposals] = useState([])
  // $FlowFixMe
  const [initialized, setInitialized] = useState(false)
  // eslint-disable-next-line
  // eslint-disable-next-line $FlowFixMe
  const [chains, setChains] = useState(options.chainIds)
  // $FlowFixMe
  const [accounts, setAccounts] = useState([])
  // $FlowFixMe
  const [sessions, setSessions] = useState([])
  // $FlowFixMe
  const [requests, setRequests] = useState([])
  // $FlowFixMe
  const [results, setResults] = useState([])
  // $FlowFixMe
  const [onRequestCallback, setOnRequestCallback] = useState(undefined)
  const [autoAcceptCallback, setAutoAcceptCallback] = useState(undefined)
  // $FlowFixMe
  const [txHash, setTxHash] = useState('')
  // $FlowFixMe
  const [error, setError] = useState(false)

  const init = async () => {
    const st = new KeyValueStorage()
    setStorage(st)
    setWcClient(
      await Client.init({
        controller: true,
        relayProvider: options.relayServer,
        logger: 'debug',
        storage: st,
      }),
    )
  }

  const clearStorage = async () => {
    const arr = []
    // eslint-disable-next-line
    for (let i = 0; i < localStorage.length; i++) {
      // eslint-disable-next-line
      // eslint-disable-next-line $FlowFixMe
      if (localStorage.key(i).substring(0, 2) === 'wc') {
        arr.push(localStorage.key(i))
      }
    }
    // eslint-disable-next-line
    for (let i = 0; i < arr.length; i++) {
      // eslint-disable-next-line
      // eslint-disable-next-line $FlowFixMe
      localStorage.removeItem(arr[i])
    }
  }

  useEffect(() => {
    init()
    clearStorage()
  }, [])

  const resetApp = async () => {
    try {
      clearStorage()
      if (sessions.length)
        await Promise.all(
          sessions.map(
            session =>
              wcClient &&
              wcClient.disconnect({
                topic: session.topic,
                reason: ERROR.USER_DISCONNECTED.format(),
              }),
          ),
        )
    } catch (e) {
      // ignored
    }

    setWcClient(undefined)
    setSessionProposals([])
    setInitialized(false)
    setChains([])
    setAccounts([])
    setSessions([])
    setRequests([])
    setResults([])
  }

  const checkPersistedState = useCallback(
    async () => {
      if (typeof wcClient === 'undefined') {
        throw new Error('Client is not initialized')
      }
      setSessions(wcClient.session.values)
      setRequests(wcClient.session.history.pending)
      setInitialized(true)
    },
    [wcClient],
  )

  // ---- MAKE REQUESTS AND SAVE/CHECK IF APPROVED ------------------------------//
  const onRequestListener = (listener: any) => {
    setOnRequestCallback(() => listener)
  }

  const autoAcceptIntercept = (listener: any) => {
    setAutoAcceptCallback(() => listener)
  }
  const makeRequest = useCallback(
    async (request: JsonRpcRequest) => {
      const [namespace, reference, address] = accounts[0].split(':')
      const chainId = `${namespace}:${reference}`
      if (!onRequestCallback) {
        throw new Error('There is no onRequestCallback')
      }
      const results = await onRequestCallback(address, chainId, request).catch(
        e => {
          console.error(e)
          return setError(`An unkown error occurred please try again.`)
        },
      )

      if (
        results &&
        results.result &&
        request.method === 'invokefunction' &&
        !results.result.error
      ) {
        setTxHash(results.result)
      } else {
        const { result } = results
        setError(
          result ? result.error : 'An unkown error occurred please try again.',
        )
      }
      return results
    },
    [accounts],
  )

  const approveAndMakeRequest = async (request: JsonRpcRequest) => {
    // $FlowFixMe
    storage.setItem(`request-${JSON.stringify(request)}`, true)

    return makeRequest(request)
  }

  const checkApprovedRequest = useCallback(
    async (request: JsonRpcRequest) =>
      // $FlowFixMe
      storage.getItem(`request-${JSON.stringify(request)}`),
    [storage],
  )

  const respondRequest = useCallback(
    async (topic: string, response: JsonRpcResponse) => {
      if (typeof wcClient === 'undefined') {
        throw new Error('Client is not initialized')
      }
      await wcClient.respond({ topic, response })
    },
    [wcClient],
  )

  const subscribeToEvents = useCallback(
    () => {
      if (typeof wcClient === 'undefined') {
        throw new Error('Client is not initialized')
      }
      if (!accounts.length) {
        return
      }
      wcClient.on(CLIENT_EVENTS.session.proposal, proposal => {
        setSessionProposals(old => [...old, proposal])
        return null
      })
      wcClient.on(CLIENT_EVENTS.session.request, async requestEvent => {
        const askApproval = () => {
          setRequests(old => [
            ...old.filter(i => i.request.id !== requestEvent.request.id),
            requestEvent,
          ])
        }

        const approve = async () => {
          const response = await makeRequest(requestEvent.request)
          await respondRequest(requestEvent.topic, response)
        }

        const reject = async (message: string) => {
          const response = formatJsonRpcError(requestEvent.request.id, message)
          await respondRequest(requestEvent.topic, response)
        }

        try {
          const alreadyApproved = await checkApprovedRequest(
            requestEvent.request,
          )
          if (alreadyApproved) {
            await approve()
          } else if (autoAcceptCallback) {
            let address
            let chainId
            if (accounts.length) {
              const [namespace, reference, addr] = accounts[0].split(':')
              address = addr
              chainId = `${namespace}:${reference}`
            }
            const autoAccepted = autoAcceptCallback(
              address,
              chainId,
              requestEvent.request,
            )
            if (autoAccepted) {
              await approve()
            } else {
              await askApproval()
            }
          } else {
            await askApproval()
          }
        } catch (e) {
          await reject(e.message)
        }
      })

      wcClient.on(CLIENT_EVENTS.session.created, () => {
        if (typeof wcClient === 'undefined') {
          throw new Error('Client is not initialized')
        }

        setSessions(wcClient.session.values)
      })

      wcClient.on(CLIENT_EVENTS.session.deleted, () => {
        if (typeof wcClient === 'undefined') {
          throw new Error('Client is not initialized')
        }

        setSessions(wcClient.session.values)
      })
    },
    [chains, checkApprovedRequest, makeRequest, respondRequest, wcClient],
  )

  useEffect(
    () => {
      if (wcClient) {
        subscribeToEvents()
        checkPersistedState()
      }
    },
    [wcClient, subscribeToEvents, checkPersistedState],
  )

  const onURI = async (data: any) => {
    debugger
    const uri = typeof data === 'string' ? data : ''
    if (!uri) return
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.pair({ uri }).catch(e => {
      console.log('pairing error', { e })
    })
    console.log('PAIRED!')
  }

  const getPeerOfRequest = async (requestEvent: JsonRpcRequest) => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    const { peer } = await wcClient.session.get(requestEvent.topic)
    return peer
  }

  const approveSession = async (proposal: SessionTypes.Proposal) => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    if (typeof accounts === 'undefined') {
      throw new Error('Accounts is undefined')
    }
    const accs = accounts.filter(account => {
      const [namespace, reference] = account.split(':')
      const chainId = `${namespace}:${reference}`
      return proposal.permissions.blockchain.chains.includes(chainId)
    })
    const response = {
      state: { accounts: accs },
      metadata: options.appMetadata,
    }
    const session = await wcClient.approve({ proposal, response })
    // $FlowFixMe
    setSessionProposals(old => old.filter(i => i !== proposal))
    setSessions([session])
  }

  const rejectSession = async (proposal: SessionTypes.Proposal) => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.reject({ proposal })
    setSessionProposals(old => old.filter(i => i !== proposal))
  }

  const disconnect = async (topic: string) => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.disconnect({
      topic,
      reason: ERROR.USER_DISCONNECTED.format(),
    })
  }

  const removeFromPending = async (requestEvent: JsonRpcRequest) => {
    // $FlowFixMe
    setRequests(requests.filter(x => x.request.id !== requestEvent.request.id))
  }

  const approveRequest = async (requestEvent: JsonRpcRequest) => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    try {
      const response = await approveAndMakeRequest(requestEvent.request)
      await wcClient.respond({
        topic: requestEvent.topic,
        response,
      })
    } catch (error) {
      console.error(error)
      await wcClient.respond({
        topic: requestEvent.topic,
        response: formatJsonRpcError(
          requestEvent.request.id,
          'Failed or Rejected Request',
        ),
      })
    }

    await removeFromPending(requestEvent)
  }

  const rejectRequest = async (requestEvent: JsonRpcRequest) => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.respond({
      topic: requestEvent.topic,
      response: formatJsonRpcError(
        requestEvent.request.id,
        'Failed or Rejected Request',
      ),
    })
    await removeFromPending(requestEvent)
  }

  const addAccountAndChain = (address: string, chain: string) => {
    setAccounts(oldAccs => [...oldAccs, `${chain}:${address}`])
  }

  const removeAccountAndChain = (address: string, chain: string) => {
    setAccounts(oldAccs => [
      ...oldAccs.filter(acc => acc !== `${chain}:${address}`),
    ])
  }

  const clearAccountAndChain = () => {
    setAccounts([])
  }

  const contextValue = {
    wcClient,
    setWcClient,
    storage,
    setStorage,
    sessionProposals,
    setSessionProposals,
    initialized,
    setInitialized,
    chains,
    setChains,
    sessions,
    setSessions,
    requests,
    setRequests,
    results,
    setResults,

    init,
    resetApp,
    subscribeToEvents,
    checkPersistedState,
    approveAndMakeRequest,
    makeRequest,
    checkApprovedRequest,
    onURI,
    getPeerOfRequest,
    approveSession,
    rejectSession,
    disconnect,
    removeFromPending,
    respondRequest,
    approveRequest,
    rejectRequest,
    onRequestListener,
    autoAcceptIntercept,
    addAccountAndChain,
    removeAccountAndChain,
    clearAccountAndChain,
    error,
    setError,
    txHash,
    setTxHash,
  }

  return (
    <WalletConnectContext.Provider value={contextValue}>
      {children}
    </WalletConnectContext.Provider>
  )
}

export const useWalletConnect = () => useContext(WalletConnectContext)
