// @flow
import axios from 'axios'
import { api } from 'neon-js'
import storage from 'electron-json-storage'

import { showWarningNotification } from './notifications'
import { setCurrency } from './price'

import { NETWORK, EXPLORERS, NEON_WALLET_RELEASE_LINK, NOTIFICATION_POSITIONS } from '../core/constants'
import asyncWrap from '../core/asyncHelper'

import { version } from '../../package.json'

// Constants
export const SET_HEIGHT = 'SET_HEIGHT'
export const SET_NETWORK = 'SET_NETWORK'
export const SET_EXPLORER = 'SET_EXPLORER'

// Actions
export function setNetwork (net: NetworkType) {
  const network = net === NETWORK.MAIN ? NETWORK.MAIN : NETWORK.TEST
  return {
    type: SET_NETWORK,
    payload: { network }
  }
}

export function setBlockHeight (blockHeight: number) {
  return {
    type: SET_HEIGHT,
    payload: { blockHeight }
  }
}

export function setBlockExplorer (blockExplorer: ExplorerType) {
  return {
    type: SET_EXPLORER,
    payload: { blockExplorer }
  }
}

export const checkVersion = () => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const net = getNetwork(state)
  const apiEndpoint = api.neonDB.getAPIEndpoint(net)

  const [err, res] = await asyncWrap(axios.get(`${apiEndpoint}/v2/version`))
  const shouldUpdate = res && res.data && res.data.version !== version
  if (err || shouldUpdate) {
    const link = `<a href='${NEON_WALLET_RELEASE_LINK}' target='_blank' class="notification-link">${NEON_WALLET_RELEASE_LINK}</a>`
    const message = err ? `Error checking wallet version! Please make sure you have downloaded the latest version: ${link}`
      : `Your wallet is out of date! Please download the latest version from ${link}`
    return dispatch(showWarningNotification({
      message,
      autoDismiss: 0,
      stack: true,
      position: NOTIFICATION_POSITIONS.BOTTOM_CENTER
    }))
  }
}

export const initSettings = () => async (dispatch: DispatchType) => {
  // eslint-disable-next-line
  storage.get('settings', (error, settings) => {
    if (settings.blockExplorer !== null && settings.blockExplorer !== undefined) {
      dispatch(setBlockExplorer(settings.blockExplorer))
    }

    if (settings.currency !== null && settings.currency !== undefined) {
      dispatch(setCurrency(settings.currency))
    }
  })
}

export const syncBlockHeight = (net: NetworkType) => async (dispatch: DispatchType) => {
  const [_err, blockHeight] = await asyncWrap(api.neonDB.getWalletDBHeight(net)) // eslint-disable-line
  return dispatch(setBlockHeight(blockHeight))
}

// state getters
export const getBlockHeight = (state: Object) => state.metadata.blockHeight
export const getNetwork = (state: Object) => state.metadata.network
export const getBlockExplorer = (state: Object) => state.metadata.blockExplorer

const initialState = {
  blockHeight: 0,
  network: NETWORK.MAIN,
  blockExplorer: EXPLORERS.NEO_TRACKER
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case SET_HEIGHT:
      const { blockHeight } = action.payload
      return {
        ...state,
        blockHeight
      }
    case SET_EXPLORER:
      const { blockExplorer } = action.payload
      return {
        ...state,
        blockExplorer
      }
    case SET_NETWORK:
      const { network } = action.payload
      return {
        ...state,
        network
      }
    default:
      return state
  }
}
