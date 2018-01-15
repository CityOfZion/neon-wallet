// @flow
import { wallet, api } from 'neon-js'
import { flatten } from 'lodash'

import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification
} from './notifications'
import { getWIF, LOGOUT, getAddress } from './account'
import { getNetwork } from './metadata'
import { getNEO, getGAS } from './wallet'

import { toNumber } from '../core/math'
import asyncWrap from '../core/asyncHelper'
import { ASSETS } from '../core/constants'
import { validateMintTokensInputs } from '../core/sale'

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

  const account = new wallet.Account(wif)
  const neoToMint = toNumber(neoToSend)
  const gasToMint = toNumber(gasToSend)

  const [isValid, message] = validateMintTokensInputs(
    neoToMint,
    gasToMint,
    scriptHash,
    NEO,
    GAS
  )

  if (!isValid) return dispatch(showErrorNotification({ message }))

  const _scriptHash =
    scriptHash.length === 40
      ? scriptHash
      : scriptHash.slice(2, scriptHash.length)

  dispatch(
    showInfoNotification({ message: 'Sending transaction', autoDismiss: 0 })
  )

  const scriptHashAddress = wallet.getAddressFromScriptHash(_scriptHash)

  const intents = [[ASSETS.NEO, neoToMint], [ASSETS.GAS, gasToMint]]
    .filter(([symbol, amount]) => amount > 0)
    .map(([symbol, amount]) =>
      api.makeIntent({ [symbol]: amount }, scriptHashAddress)
    )

  const script = {
    scriptHash: _scriptHash,
    operation: 'mintTokens',
    args: []
  }
  const config = {
    net,
    address: account.address,
    privateKey: account.privateKey,
    intents: flatten(intents),
    script,
    gas: 0
  }

  const [error, response] = await asyncWrap(api.doInvoke(config))
  if (error || !response || !response.response || !response.response.result) {
    return dispatch(
      showErrorNotification({
        message: 'Sale participation failed. Check Script Hash'
      })
    )
  }
  return dispatch(
    showSuccessNotification({ message: 'Sale participation was successful.' })
  )
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
  if (_err || _error)
    return dispatch(
      showErrorNotification({ message: 'Update balance failed.' })
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
