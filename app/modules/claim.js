// @flow
import { doClaimAllGas, doSendAsset, getClaimAmounts, hardwareDoSendAsset, hardwareDoClaimAllGas } from 'neon-js'
import { log } from '../util/Logs'
import { ASSETS } from '../core/constants'
import { showErrorNotification, showSuccessNotification, showInfoNotification } from './notifications'
import { FIVE_MINUTES_MS } from '../core/time'
import { getWif, getAddress, getSigningFunction, getPublicKey, LOGOUT } from './account'
import { getNetwork } from './metadata'
import { getNeo } from './wallet'
import asyncWrap from '../core/asyncHelper'

// Constants
export const SET_CLAIM = 'SET_CLAIM'
export const SET_CLAIM_REQUEST = 'SET_CLAIM_REQUEST'
export const DISABLE_CLAIM = 'DISABLE_CLAIM'

// Actions
export function setClaim (claimAvailable: number, claimUnavailable: number) {
  return {
    type: SET_CLAIM,
    payload: {
      claimAvailable,
      claimUnavailable
    }
  }
}

export function setClaimRequest (claimRequest: boolean) {
  return {
    type: SET_CLAIM_REQUEST,
    payload: { claimRequest }
  }
}

export function disableClaim (disableClaimButton: boolean) {
  return {
    type: DISABLE_CLAIM,
    payload: { disableClaimButton }
  }
}

export const syncAvailableClaim = (net: NetworkType, address: string) => async (dispatch: DispatchType) => {
  const [_err, result] = await asyncWrap(getClaimAmounts(net, address)) // eslint-disable-line
  return dispatch(setClaim(result.available, result.unavailable))
}

export const doClaimNotify = () => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWif(state)
  const address = getAddress(state)
  const net = getNetwork(state)
  const signingFunction = getSigningFunction(state)
  const publicKey = getPublicKey(state)

  log(net, 'CLAIM', address, { info: 'claim all gas' })

  const isHardwareClaim = !!publicKey

  let claimGasFn
  if (isHardwareClaim) {
    dispatch(showInfoNotification({
      message: 'Sign transaction 2 of 2 to claim Gas on your hardware device (claiming Gas)',
      autoDismiss: 0
    }))
    claimGasFn = () => hardwareDoClaimAllGas(net, publicKey, signingFunction)
  } else {
    claimGasFn = () => doClaimAllGas(net, wif)
  }

  const [err, response] = await asyncWrap(claimGasFn())
  if (!err && response.result) {
    dispatch(showSuccessNotification({
      message: 'Claim was successful! Your balance will update once the blockchain has processed it.'
    }))
    setTimeout(() => dispatch(disableClaim(false)), FIVE_MINUTES_MS)
  } else {
    return dispatch(showErrorNotification({ message: 'Claim failed' }))
  }
}

// To initiate claim, first send all Neo to own address, the set claimRequest state
// When new claims are available, this will trigger the claim
export const doGasClaim = () => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWif(state)
  const address = getAddress(state)
  const net = getNetwork(state)
  const neo = getNeo(state)
  const signingFunction = getSigningFunction(state)
  const publicKey = getPublicKey(state)

  // if no neo in account, no need to send to self first
  if (neo === 0) {
    return dispatch(doClaimNotify())
  } else {
    dispatch(showInfoNotification({ message: 'Sending Neo to Yourself...', autoDismiss: 0 }))
    log(net, 'SEND', address, { to: address, amount: neo, asset: ASSETS.NEO })

    const isHardwareClaim = !!publicKey

    let sendAssetFn
    if (isHardwareClaim) {
      dispatch(showInfoNotification({
        message: 'Sign transaction 1 of 2 to claim Gas on your hardware device (sending Neo to yourself)',
        autoDismiss: 0
      }))
      sendAssetFn = () => hardwareDoSendAsset(net, address, publicKey, { [ASSETS.NEO]: neo }, signingFunction)
    } else {
      sendAssetFn = () => doSendAsset(net, address, wif, { [ASSETS.NEO]: neo })
    }

    const [err, response] = await asyncWrap(sendAssetFn())
    if (err || response.result === undefined || response.result === false) {
      return dispatch(showErrorNotification({ message: 'Transaction failed!' }))
    } else {
      dispatch(showInfoNotification({ message: 'Waiting for transaction to clear...', autoDismiss: 0 }))
      dispatch(setClaimRequest(true))
      return dispatch(disableClaim(true))
    }
  }
}

// State Getters
export const getClaimRequest = (state) => state.claim.claimRequest
export const getClaimAmount = (state) => state.claim.claimAmount
export const getClaimAvailable = (state) => state.claim.claimAvailable
export const getClaimUnavailable = (state) => state.claim.claimUnavailable
export const getClaimWasUpdated = (state) => state.claim.claimWasUpdated
export const getDisableClaimButton = (state) => state.claim.disableClaimButton

const initialState = {
  claimRequest: false,
  claimAmount: 0,
  claimAvailable: 0,
  claimUnavailable: 0,
  claimWasUpdated: false,
  disableClaimButton: false
}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_CLAIM_REQUEST:
      const { claimRequest } = action.payload
      return {
        ...state,
        claimRequest
      }
    case SET_CLAIM:
      const { claimAvailable, claimUnavailable } = action.payload
      let claimWasUpdated = false
      if (claimAvailable > state.claimAvailable && state.claimRequest === true) {
        claimWasUpdated = true
      }
      return {
        ...state,
        claimAmount: (claimAvailable + claimUnavailable) / 100000000,
        claimAvailable,
        claimUnavailable,
        claimWasUpdated
      }
    case DISABLE_CLAIM:
      const { disableClaimButton } = action.payload
      return {
        ...state,
        disableClaimButton
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
