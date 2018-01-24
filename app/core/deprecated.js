// @flow
import { get, omit } from 'lodash'

import { ID as ACCOUNT_ID } from '../actions/accountActions'
import { ID as BALANCES_ID } from '../actions/balancesActions'
import { ID as NETWORK_ID } from '../actions/networkActions'
import { ID as SETTINGS_ID } from '../actions/settingsActions'
import { ASSETS } from '../core/constants'
import { findNetwork } from '../core/networks'

const PREFIX = 'api'

// TODO: Module functions that inspect state such as `doClaimNotify` should be refactored into
//       higher-order components that expose function props for performing these actions.  Data that
//       is normally provided by functions like `getNetwork` can instead be retrieved via the
//       `withData` higher-order component.

export const getNetworkId = (state: Object) => {
  return get(state, `${PREFIX}.${NETWORK_ID}.data`)
}

export const getNetwork = (state: Object) => {
  return getNetworkById(getNetworkId(state))
}

export const getNetworkById = (networkId: string) => {
  return findNetwork(networkId).network
}

export const getAddress = (state: Object) => {
  return get(state, `${PREFIX}.${ACCOUNT_ID}.data.address`)
}

export const getWIF = (state: Object) => {
  return get(state, `${PREFIX}.${ACCOUNT_ID}.data.wif`)
}

export const getSigningFunction = (state: Object) => {
  return get(state, `${PREFIX}.${ACCOUNT_ID}.data.signingFunction`)
}

export const getPublicKey = (state: Object) => {
  return get(state, `${PREFIX}.${ACCOUNT_ID}.data.publicKey`)
}

export const getIsHardwareLogin = (state: Object) => {
  return get(state, `${PREFIX}.${ACCOUNT_ID}.data.isHardwareLogin`)
}

export const getCurrency = (state: Object) => {
  return get(state, `${PREFIX}.${SETTINGS_ID}.data.currency`)
}

export const getTokensForNetwork = (state: Object) => {
  const selectedNetworkId = getNetworkId(state)
  const allTokens = get(state, `${PREFIX}.${SETTINGS_ID}.data.tokens`)
  return allTokens.filter(({ networkId }) => networkId === selectedNetworkId)
}

export const getNEO = (state: Object): string => {
  return getBalances(state)[ASSETS.NEO]
}

export const getGAS = (state: Object): string => {
  return getBalances(state)[ASSETS.GAS]
}

export const getTokenBalances = (state: Object): Object => {
  return omit(getBalances(state), ASSETS.NEO, ASSETS.GAS)
}

export const getBalances = (state: Object) => {
  return get(state, `${PREFIX}.${BALANCES_ID}.data`)
}
