// @flow
import { wallet, api } from 'neon-js'

import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification
} from './notifications'
import { getWIF, LOGOUT, getAddress } from './account'
import { getNetwork } from './metadata'
import { getNEO, getGAS } from './wallet'
import { toNumber, toBigNumber } from '../core/math'
import asyncWrap from '../core/asyncHelper'

export const participateInSale = (
  neoToSend: number,
  gasToSend: number,
  scriptHash: string
) => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const wif = getWIF(state)
  const NEO = getNEO(state)
  const GAS = getGAS(state)
  const net = getNetwork(state)

  if (neoToSend && parseFloat(neoToSend) !== parseInt(neoToSend)) {
    dispatch(
      showErrorNotification({
        message: 'You cannot send fractional NEO to a token sale.'
      })
    )
    return false
  }

  const account = new wallet.Account(wif)
  const neoToMint = toNumber(neoToSend)
  const gasToMint = toNumber(gasToSend)

  if ((neoToMint && isNaN(neoToMint)) || (gasToMint && isNaN(gasToMint))) {
    dispatch(
      showErrorNotification({ message: 'Please enter valid numbers only' })
    )
    return false
  }

  if (neoToMint > NEO) {
    dispatch(
      showErrorNotification({ message: 'You do not have enough NEO to send.' })
    )
    return false
  }

  if (gasToMint > GAS) {
    dispatch(
      showErrorNotification({ message: 'You do not have enough GAS to send.' })
    )
    return false
  }

  if (
    scriptHash.slice(0, 1) !== '0x' &&
    scriptHash.length !== 42 &&
    scriptHash.length !== 40
  ) {
    dispatch(showErrorNotification({ message: 'Not a valid script hash.' }))
    return false
  }
  const _scriptHash =
    scriptHash.length === 40
      ? scriptHash
      : scriptHash.slice(2, scriptHash.length)

  dispatch(
    showInfoNotification({ message: 'Sending transaction', autoDismiss: 0 })
  )

  const scriptHashAddress = wallet.getAddressFromScriptHash(_scriptHash)

  const intents = [[NEO, neoToMint], [GAS, gasToMint]]
    .filter(([symbol, amount]) => amount > 0)
    .map(([symbol, amount]) =>
      api.makeIntent({ [symbol]: amount }, scriptHashAddress)
    )

  // const intents = [[NEO, neoToMint], [GAS, gasToMint]]
  //   .filter(([symbol, amount]) => amount > 0)
  //   .map(([symbol, amount]) => {
  //     return { assetId: symbol, value: amount, scriptHash: _scriptHash }
  //   })

  const script = {
    scriptHash: _scriptHash,
    operation: 'mintTokens',
    args: []
  }
  const config = {
    net,
    address: account.address,
    privateKey: account.privateKey,
    intents,
    script,
    gas: 0
  }

  const [error, response] = await asyncWrap(api.doInvoke(config))
  if (error) {
    dispatch(
      showErrorNotification({
        message:
          'Error minting tokens for this scripthash. Is this the correct input?'
      })
    )
    return false
  }
  // TODO test this response out
  if (response.result === true) {
    dispatch(
      showSuccessNotification({ message: 'Sale participation was successful.' })
    )
    return true
  } else {
    dispatch(showErrorNotification({ message: 'Sale participation failed.' }))
    return false
  }
}

export const SET_SALE_BALANCE = 'SET_SALE_BALANCE'

export function setSaleBalance(saleBalance: string) {
  return {
    type: SET_SALE_BALANCE,
    payload: { saleBalance }
  }
}

export const updateSaleBalance = (scriptHash: string) => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  const state = getState()
  const address = getAddress(state)
  const net = getNetwork(state)

  const [_error, tokenRpcEndpoint] = await asyncWrap(
    api.neonDB.getRPCEndpoint(net)
  )
  const [_err, tokenResults] = await asyncWrap(
    api.nep5.getToken(tokenRpcEndpoint, scriptHash, address)
  )
  const tokenBalance = tokenResults.balance || 0
  dispatch(setSaleBalance(tokenBalance))
}

// state getters
export const getSaleBalance = (state: Object) => state.sale.saleBalance

const initialState = {
  saleBalance: 0
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_SALE_BALANCE:
      const { saleBalance } = action.payload
      return {
        ...state,
        saleBalance
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
