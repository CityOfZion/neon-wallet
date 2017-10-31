// @flow
import { doClaimAllGas, doSendAsset, getClaimAmounts, hardwareDoSendAsset, hardwareDoClaimAllGas } from 'neon-js'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { log } from '../util/Logs'
import { ASSETS } from '../core/constants'
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

export const doClaimNotify = () => (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = state.account.wif
  const address = state.account.address
  const net = state.metadata.network
  const signingFunction = state.account.signingFunction
  const publicKey = state.account.publicKey

  log(net, 'CLAIM', address, { info: 'claim all gas' })

  const isHardwareClaim = !!publicKey

  let claimGasFn
  if (isHardwareClaim) {
    dispatch(sendEvent(true, 'Sign transaction 2 of 2 to claim Gas on your hardware device (claiming Gas)'))
    claimGasFn = () => hardwareDoClaimAllGas(net, publicKey, signingFunction)
  } else {
    claimGasFn = () => doClaimAllGas(net, wif)
  }

  claimGasFn().then((response) => {
    if (response.result) {
      dispatch(sendEvent(true, 'Claim was successful! Your balance will update once the blockchain has processed it.'))
      setTimeout(() => dispatch(disableClaim(false)), 300000)
    } else {
      dispatch(sendEvent(false, 'Claim failed'))
    }
    setTimeout(() => dispatch(clearTransactionEvent()), 5000)
  })
}

// To initiate claim, first send all Neo to own address, the set claimRequest state
// When new claims are available, this will trigger the claim
export const doGasClaim = () => (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = state.account.wif
  const address = state.account.address
  const net = state.metadata.network
  const neo = state.wallet.Neo
  const signingFunction = state.account.signingFunction
  const publicKey = state.account.publicKey

  // if no neo in account, no need to send to self first
  if (neo === 0) {
    dispatch(doClaimNotify())
  } else {
    dispatch(sendEvent(true, 'Sending Neo to Yourself...'))
    log(net, 'SEND', address, { to: address, amount: neo, asset: ASSETS.NEO })

    const isHardwareClaim = !!publicKey

    let sendAssetFn
    if (isHardwareClaim) {
      dispatch(sendEvent(true, 'Sign transaction 1 of 2 to claim Gas on your hardware device (sending Neo to yourself)'))
      sendAssetFn = () => hardwareDoSendAsset(net, address, publicKey, { [ASSETS.NEO]: neo }, signingFunction)
    } else {
      sendAssetFn = () => doSendAsset(net, address, wif, { [ASSETS.NEO]: neo })
    }

    sendAssetFn().then((response) => {
      if (response.result === undefined || response.result === false) {
        dispatch(sendEvent(false, 'Transaction failed!'))
      } else {
        dispatch(sendEvent(true, 'Waiting for transaction to clear...'))
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
  disableClaimButton: false,
  signingFunction: () => ({})
}

// Reducer for managing claims data
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_CLAIM_REQUEST:
      return { ...state, 'claimRequest': action.status }
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
      return { ...state, disableClaimButton: action.status }
    default:
      return state
  }
}
