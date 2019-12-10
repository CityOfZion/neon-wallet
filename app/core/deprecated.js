// @flow
import { get, omit, pick } from 'lodash-es'

import { ID as AUTH_ID } from '../actions/authActions'
import { ID as BALANCES_ID } from '../actions/balancesActions'
import { ID as NETWORK_ID } from '../actions/networkActions'
import { ASSETS } from './constants'
import { findNetwork } from './networks'

const PREFIX = 'spunky'

// TODO: Module functions that inspect state such as `doClaimNotify` should be refactored into
//       higher-order components that expose function props for performing these actions.  Data that
//       is normally provided by functions like `getNetwork` can instead be retrieved via the
//       `withData` higher-order component.

export const getNetworkById = (networkId: string) =>
  findNetwork(networkId).network

export const getBalances = (state: Object) =>
  get(state, `${PREFIX}.${BALANCES_ID}.data`)

export const getNetworkId = (state: Object) =>
  get(state, `${PREFIX}.${NETWORK_ID}.data`)

export const getNetwork = (state: Object) => getNetworkById(getNetworkId(state))

export const getAddress = (state: Object) =>
  get(state, `${PREFIX}.${AUTH_ID}.data.address`)

export const getWIF = (state: Object) =>
  get(state, `${PREFIX}.${AUTH_ID}.data.wif`)

export const getSigningFunction = (state: Object) =>
  get(state, `${PREFIX}.${AUTH_ID}.data.signingFunction`)

export const getPublicKey = (state: Object) =>
  get(state, `${PREFIX}.${AUTH_ID}.data.publicKey`)

export const getIsHardwareLogin = (state: Object) =>
  get(state, `${PREFIX}.${AUTH_ID}.data.isHardwareLogin`)

export const getNEO = (state: Object): string => getBalances(state)[ASSETS.NEO]

export const getGAS = (state: Object): string => getBalances(state)[ASSETS.GAS]

export const getTokenBalances = (state: Object): Object =>
  omit(getBalances(state), ASSETS.NEO, ASSETS.GAS)

export const getAssetBalances = (state: Object): Object =>
  pick(getBalances(state), ASSETS.NEO, ASSETS.GAS)
