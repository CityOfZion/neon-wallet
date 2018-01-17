// @flow
import { api } from 'neon-js'

import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification
} from './notifications'
import {
  getWIF,
  getAddress,
  getSigningFunction,
  getPublicKey,
  LOGOUT,
  getIsHardwareLogin
} from './account'
import { getNetwork } from './metadata'
import { getNEO } from './wallet'

import { ASSETS } from '../core/constants'
import { toNumber } from '../core/math'
import asyncWrap from '../core/asyncHelper'
import { FIVE_MINUTES_MS } from '../core/time'

import { log } from '../util/Logs'

// Constants
export const SET_CLAIM = 'SET_CLAIM'
export const SET_CLAIM_REQUEST = 'SET_CLAIM_REQUEST'
export const DISABLE_CLAIM = 'DISABLE_CLAIM'

// Actions
export function setClaim(claimAvailable: number) {
  return {
    type: SET_CLAIM,
    payload: {
      claimAvailable
    }
  }
}

export function setClaimRequest(claimRequest: boolean) {
  return {
    type: SET_CLAIM_REQUEST,
    payload: { claimRequest }
  }
}

export function disableClaim(disableClaimButton: boolean) {
  return {
    type: DISABLE_CLAIM,
    payload: { disableClaimButton }
  }
}

export const syncAvailableClaim = (net: NetworkType, address: string) => async (
  dispatch: DispatchType
) => {
  console.log('the error is about to happen')
  const [_err, result] = await asyncWrap(
    api.loadBalance(api.getMaxClaimAmountFrom, { net, address })
  ) // eslint-disable-line
  console.log('_err', _err)
  console.log('max claim amount result', result)
  return dispatch(setClaim(result))
}

export const doClaimNotify = () => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  const state = getState()
  const wif = getWIF(state)
  const address = getAddress(state)
  const net = getNetwork(state)
  const signingFunction = getSigningFunction(state)
  const publicKey = getPublicKey(state)
  const isHardwareClaim = getIsHardwareLogin(state)

  log(net, 'CLAIM', address, { info: 'claim all GAS' })

  let claimGasFn
  if (isHardwareClaim) {
    dispatch(
      showInfoNotification({
        message:
          'Sign transaction 2 of 2 to claim GAS on your hardware device (claiming GAS)',
        autoDismiss: 0
      })
    )
    claimGasFn = () =>
      api.claimGas({ net, address, publicKey, signingFunction })
  } else {
    claimGasFn = () => api.claimGas({ net, address, privateKey: wif })
  }

  console.log('claim.js claim args', { net, address, privateKey: wif })

  const [err, response] = await asyncWrap(claimGasFn())
  console.log('claim.js claim err', err)
  console.log('claim.js claim response', response)
  if (!err && response.response && response.response.result) {
    dispatch(
      showSuccessNotification({
        message:
          'Claim was successful! Your balance will update once the blockchain has processed it.'
      })
    )
    setTimeout(() => dispatch(disableClaim(false)), FIVE_MINUTES_MS)
  } else {
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
  const wif = getWIF(state)
  const address = getAddress(state)
  const net = getNetwork(state)
  const NEO = getNEO(state)
  const signingFunction = getSigningFunction(state)
  const publicKey = getPublicKey(state)
  const isHardwareClaim = getIsHardwareLogin(state)

  // if no NEO in account, no need to send to self first
  if (NEO === '0') {
    return dispatch(doClaimNotify())
  } else {
    dispatch(
      showInfoNotification({
        message: 'Sending NEO to Yourself...',
        autoDismiss: 0
      })
    )
    log(net, 'SEND', address, { to: address, amount: NEO, asset: ASSETS.NEO })

    let sendAssetFn
    const intents = api.makeIntent({ [ASSETS.NEO]: toNumber(NEO) }, address)
    if (isHardwareClaim) {
      dispatch(
        showInfoNotification({
          message:
            'Sign transaction 1 of 2 to claim GAS on your hardware device (sending NEO to yourself)',
          autoDismiss: 0
        })
      )
      sendAssetFn = () =>
        api.sendAsset({
          net,
          address,
          publicKey,
          intents,
          signingFunction
        })
    } else {
      sendAssetFn = () =>
        api.sendAsset({
          net,
          address,
          privateKey: wif,
          intents
        })
    }

    console.log('claim.js send args', {
      net,
      address,
      privateKey: wif,
      intents
    })

    const [err, response] = await asyncWrap(sendAssetFn())
    console.log('claim.js send err', err)
    console.log('claim.js send response', response)
    if (err || response.result === undefined || response.result === false) {
      return dispatch(showErrorNotification({ message: 'Transaction failed!' }))
    } else {
      dispatch(
        showInfoNotification({
          message: 'Waiting for transaction to clear...',
          autoDismiss: 0
        })
      )
      dispatch(setClaimRequest(true))
      return dispatch(disableClaim(true))
    }
  }
}

// State Getters
export const getClaimRequest = (state: Object) => state.claim.claimRequest
export const getClaimAmount = (state: Object) => state.claim.claimAmount
export const getClaimAvailable = (state: Object) => state.claim.claimAvailable
export const getClaimWasUpdated = (state: Object) => state.claim.claimWasUpdated
export const getDisableClaimButton = (state: Object) =>
  state.claim.disableClaimButton

const initialState = {
  claimRequest: false,
  claimAmount: 0,
  claimAvailable: 0,
  claimWasUpdated: false,
  disableClaimButton: false
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_CLAIM_REQUEST:
      const { claimRequest } = action.payload
      return {
        ...state,
        claimRequest
      }
    case SET_CLAIM:
      const { claimAvailable } = action.payload
      let claimWasUpdated = false
      if (
        claimAvailable > state.claimAvailable &&
        state.claimRequest === true
      ) {
        claimWasUpdated = true
      }
      return {
        ...state,
        claimAmount: claimAvailable,
        claimAvailable,
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
