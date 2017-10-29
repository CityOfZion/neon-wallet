// @flow
import { doClaimAllGas, doSendAsset, getClaimAmounts } from 'neon-js'
import { log } from '../util/Logs'
import { ASSETS } from '../core/constants'
import { showErrorNotification, showStickyInfoNotification, showSuccessNotification } from './notification'

// Constants
export const SET_CLAIM = 'SET_CLAIM'
export const SET_CLAIM_REQUEST = 'SET_CLAIM_REQUEST'
export const DISABLE_CLAIM = 'DISABLE_CLAIM'

// Actions
export function setClaim (available: number, unavailable: number) {
  return {
    type: SET_CLAIM,
    available,
    unavailable
  }
}

export function setClaimRequest (status: boolean) {
  return {
    type: SET_CLAIM_REQUEST,
    status
  }
}

export function disableClaim (status: boolean) {
  return {
    type: DISABLE_CLAIM,
    status
  }
}

export const syncAvailableClaim = (net: NetworkType, address: string) => (dispatch: DispatchType) => {
  getClaimAmounts(net, address).then((result) => {
    return dispatch(setClaim(result.available, result.unavailable))
  })
}

export const doClaimNotify = (net: NetworkType, wif: string, address: string) => (dispatch: DispatchType) => {
  log(net, 'CLAIM', address, { info: 'claim all gas' })
  doClaimAllGas(net, wif).then((response) => {
    if (response.result) {
      dispatch(showSuccessNotification({
        message: 'Claim was successful! Your balance will update once the blockchain has processed it.',
        dismissAfter: 300000
      }))
    } else {
      dispatch(showErrorNotification({ message: 'Claim failed' }))
    }
  })
}

// To initiate claim, first send all Neo to own address, the set claimRequest state
// When new claims are available, this will trigger the claim
export const doGasClaim = (net: NetworkType, wif: string, address: string, neo: number) => (dispatch: DispatchType) => {
  // if no neo in account, no need to send to self first
  if (neo === 0) {
    dispatch(doClaimNotify(net, wif, address))
  } else {
    dispatch(showStickyInfoNotification({ message: 'Sending Neo to Yourself...' }))
    log(net, 'SEND', address, { to: address, amount: neo, asset: 'NEO' })
    doSendAsset(net, address, wif, { [ASSETS.NEO]: neo }).then((response) => {
      if (response.result === undefined || response.result === false) {
        dispatch(showErrorNotification({ message: 'Transaction failed!' }))
      } else {
        dispatch(showStickyInfoNotification({ message: 'Waiting for transaction to clear...' }))
        dispatch(setClaimRequest(true))
        dispatch(disableClaim(true))
      }
    })
  }
}

const initialState = {
  claimRequest: false,
  claimAmount: 0,
  claimAvailable: 0,
  claimUnavailable: 0,
  claimWasUpdated: false,
  disableClaimButton: false
}

// Reducer for managing claims data
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_CLAIM_REQUEST:
      return {
        ...state,
        claimRequest: action.status
      }
    case SET_CLAIM:
      let claimWasUpdated = false
      if (action.available > state.claimAvailable && state.claimRequest === true) {
        claimWasUpdated = true
      }
      return {
        ...state,
        claimAmount: (action.available + action.unavailable) / 100000000,
        claimAvailable: action.available,
        claimUnavailable: action.unavailable,
        claimWasUpdated
      }
    case DISABLE_CLAIM:
      return {
        ...state,
        disableClaimButton: action.status
      }
    default:
      return state
  }
}
