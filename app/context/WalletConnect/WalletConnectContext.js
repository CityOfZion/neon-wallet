// @flow

import React, { useCallback, useContext, useEffect, useState } from 'react'
import Client, { CLIENT_EVENTS } from '@walletconnect/client'
import { ERROR } from '@walletconnect/utils'
import KeyValueStorage from 'keyvaluestorage'
import {
  formatJsonRpcError,
  JsonRpcRequest,
  JsonRpcResponse,
} from '@json-rpc-tools/utils'

import { DEFAULT_CHAIN_ID } from './constants'

export const WalletConnectContext = React.createContext({})

export const WalletConnectContextProvider: React.FC<{
  options: CtxOptions,
  children: any,
}> = ({ options, children }) => {
  const [wcClient, setWcClient] = useState(undefined)
  const [storage, setStorage] = useState(undefined)
  const [neonHelper, setNeonHelper] = useState(undefined)
  const [sessionProposals, setSessionProposals] = useState([])
  const [initialized, setInitialized] = useState(false)
  const [chains, setChains] = useState([DEFAULT_CHAIN_ID])
  const [accounts, setAccounts] = useState([])
  const [sessions, setSessions] = useState([])
  const [requests, setRequests] = useState([])
  const [results, setResults] = useState([])
  const [onRequestCallback, setOnRequestCallback] = useState(undefined)
  const [autoAcceptCallback, setAutoAcceptCallback] = useState(undefined)

  useEffect(() => {
    const booststrap = async () => {
      var arr = [] // Array to hold the keys
      // Iterate over localStorage and insert the keys that meet the condition into arr
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 2) == 'wc') {
          arr.push(localStorage.key(i))
        }
      }

      // Iterate over arr and remove the items by key
      for (var i = 0; i < arr.length; i++) {
        localStorage.removeItem(arr[i])
      }

      init()
    }

    booststrap()
  }, [])

  const init = async () => {
    const st = new KeyValueStorage()
    console.log(st)
    setStorage(st)
    setWcClient(
      await Client.init({
        controller: true,
        relayProvider: options.relayServer,
        logger: options.logger,
        storage: st,
      }),
    )
  }

  const resetApp = async () => {
    try {
      if (sessions.length)
        await Promise.all(
          sessions.map(session =>
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

  const onRequestListener = listener => {
    setOnRequestCallback(() => listener)
  }

  const autoAcceptIntercept = listener => {
    debugger
    setAutoAcceptCallback(() => listener)
  }

  const approveAndMakeRequest = async (request: JsonRpcRequest) => {
    storage.setItem(`request-${JSON.stringify(request)}`, true)
    return await makeRequest(request)
  }

  const makeRequest = useCallback(
    async (request: JsonRpcRequest) => {
      // TODO: allow multiple accounts
      const [namespace, reference, address] = accounts[0].split(':')
      const chainId = `${namespace}:${reference}`
      if (!onRequestCallback) {
        throw new Error('There is no onRequestCallback')
      }
      return await onRequestCallback(address, chainId, request)
    },
    [accounts],
  )

  const checkApprovedRequest = useCallback(
    async (request: JsonRpcRequest) => {
      return storage.getItem(`request-${JSON.stringify(request)}`)
    },
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
      console.log('ACTION', 'subscribeToEvents')

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
        // tslint:disable-next-line
        console.log(
          'EVENT',
          CLIENT_EVENTS.session.request,
          requestEvent.request,
        )

        const askApproval = () => {
          setRequests(old => {
            return [
              ...old.filter(i => i.request.id !== requestEvent.request.id),
              requestEvent,
            ]
          })
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
        console.log('EVENT', 'session_created')
        setSessions(wcClient.session.values)
      })

      wcClient.on(CLIENT_EVENTS.session.deleted, () => {
        if (typeof wcClient === 'undefined') {
          throw new Error('Client is not initialized')
        }
        console.log('EVENT', 'session_deleted')
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
    const uri = typeof data === 'string' ? data : ''
    if (!uri) return
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.pair({ uri })
  }

  const getPeerOfRequest = async requestEvent => {
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    const { peer } = await wcClient.session.get(requestEvent.topic)
    return peer
  }

  const approveSession = async proposal => {
    console.log('ACTION', 'approveSession')
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
    setSessionProposals(old => old.filter(i => i !== proposal))
    setSessions([session])
  }

  const rejectSession = async proposal => {
    console.log('ACTION', 'rejectSession')
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.reject({ proposal })
    setSessionProposals(old => old.filter(i => i !== proposal))
  }

  const disconnect = async (topic: string) => {
    console.log('ACTION', 'disconnect')
    if (typeof wcClient === 'undefined') {
      throw new Error('Client is not initialized')
    }
    await wcClient.disconnect({
      topic,
      reason: ERROR.USER_DISCONNECTED.format(),
    })
  }

  const removeFromPending = async requestEvent => {
    setRequests(requests.filter(x => x.request.id !== requestEvent.request.id))
  }

  const approveRequest = async requestEvent => {
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

  const rejectRequest = async requestEvent => {
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
  }

  return (
    <WalletConnectContext.Provider value={contextValue}>
      {children}
    </WalletConnectContext.Provider>
  )
}

export const useWalletConnect = () => useContext(WalletConnectContext)
