// @flow
import { api } from 'neon-js'
import { rpc } from 'neon-js'

import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification
} from './notifications'
import {
  getNetwork,
  getWIF,
  getAddress,
  getSigningFunction,
  getPublicKey,
  getIsHardwareLogin,
  getNEO
} from '../core/deprecated'
import { ASSETS } from '../core/constants'
import { FIVE_MINUTES_MS } from '../core/time'

import { log } from '../util/Logs'

// Constants
export const SET_CLAIM_REQUEST = 'SET_CLAIM_REQUEST'
export const DISABLE_CLAIM = 'DISABLE_CLAIM'
export const SET_FINALIZE_CLAIM = 'SET_FINALIZE_CLAIM'

// Actions
export function setClaimRequest (claimRequest: boolean) {
  return {
    type: SET_CLAIM_REQUEST,
    payload: { claimRequest }
  }
}
export function setTransactionId (txid: string) {
  return {
    type: SET_CLAIM_REQUEST,
    payload: { txid }
  }
}

export function setFinalizeCalim (finalizeClaim: boolean) {
  return {
    type: SET_FINALIZE_CLAIM,
    payload: { finalizeClaim }
  }
}

export function disableClaim (disableClaimButton: boolean) {
  return {
    type: DISABLE_CLAIM,
    payload: { disableClaimButton }
  }
}

export const doClaimNotify = () => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  const state = getState()
  const address = getAddress(state)
  const net = getNetwork(state)
  const signingFunction = getSigningFunction(state)
  const publicKey = getPublicKey(state)
  const privateKey = getWIF(state)
  const isHardwareClaim = getIsHardwareLogin(state)

  log(net, 'CLAIM', address, { info: 'claim all GAS' })

  if (isHardwareClaim) {
    dispatch(showInfoNotification({
      message: 'Sign transaction 2 of 2 to claim GAS on your hardware device (claiming GAS)',
      autoDismiss: 0
    }))
  }

  try {
    const { response } = await api.claimGas({ net, address, publicKey, privateKey, signingFunction })

    if (!response.result) {
      throw new Error('Claim failed')
    }

    dispatch(showSuccessNotification({
      message: 'Claim was successful! Your balance will update once the blockchain has processed it.'
    }))
    setTimeout(() => dispatch(disableClaim(false)), FIVE_MINUTES_MS)
  } catch (err) {
    return dispatch(showErrorNotification({ message: 'Claim failed' }))
  }
}

// To initiate claim, first send all NEO to own address, the set claimRequest state
// When new claims are available, this will trigger the claim
export const doGasClaim = () => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  const state = getState()
  const address = getAddress(state)
  const net = getNetwork(state)
  const NEO = getNEO(state)
  const publicKey = getPublicKey(state)
  const privateKey = getWIF(state)
  const signingFunction = getSigningFunction(state)
  const isHardwareClaim = getIsHardwareLogin(state)

  // if no NEO in account, no need to send to self first
  if (NEO === '0') {
    return dispatch(doClaimNotify())
  } else {
    dispatch(showInfoNotification({
      message: 'Sending NEO to Yourself...',
      autoDismiss: 0
    }))
    log(net, 'SEND', address, { to: address, amount: NEO, asset: ASSETS.NEO })

    if (isHardwareClaim) {
      dispatch(showInfoNotification({
        message: 'Sign transaction 1 of 2 to claim GAS on your hardware device (sending NEO to yourself)',
        autoDismiss: 0
      }))
    }

    try {
      const { response } = await api.sendAsset({
        net,
        address,
        publicKey,
        privateKey,
        signingFunction,
        intents: api.makeIntent({ [ASSETS.NEO]: NEO }, address)
      })

      console.log('txresponse', response);

      if (!response.result || !response.txid) {
        throw new Error('Transaction failed!')
      }

      dispatch(showInfoNotification({
        message: 'Waiting for transaction to clear...',
        autoDismiss: 0
      }))
      dispatch(setTransactionId(response.txid))
      dispatch(setClaimRequest(true))
      return dispatch(disableClaim(true))
    } catch (err) {
      return dispatch(showErrorNotification({ message: 'Transaction failed!' }))
    }
  }
}

export const checkClaimStatus = () => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  const state = getState()
  const net = getNetwork(state)
  const txid = getTransactionId(state)
  console.log('calling check claim state');
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net })
  console.log('endpoint', endpoint);
  const response = await rpc.Query.getRawTransaction(txid, 1).execute(endpoint)
  console.log('get raw tx response...', response);
  // dispatch(setTransactionId(''))
  // dispatch(setTransactionId(''))
}

// State Getters
export const getFinalizeClaim = (state: Object) => state.claim.finalizeClaim
export const getClaimRequest = (state: Object) => state.claim.claimRequest
export const getDisableClaimButton = (state: Object) => state.claim.disableClaimButton
export const getTransactionId = (state: Object) => state.claim.transactionId

const initialState = {
  claimRequest: false,
  disableClaimButton: false,
  transactionId: ''
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_CLAIM_REQUEST:
      const { claimRequest } = action.payload
      return {
        ...state,
        claimRequest
      }
    case DISABLE_CLAIM:
      const { disableClaimButton } = action.payload
      return {
        ...state,
        disableClaimButton
      }
    default:
      return state
  }
}
