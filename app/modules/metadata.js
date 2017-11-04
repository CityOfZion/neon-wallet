// @flow
import { getWalletDBHeight, getAPIEndpoint } from 'neon-js'
import axios from 'axios'
import { version } from '../../package.json'
import { showWarningNotification } from './notification'
import { NETWORK, EXPLORER, NEON_WALLET_RELEASE_LINK } from '../core/constants'
import { openExternal } from '../core/electron'
import { FIVE_MINUTES_MS } from '../core/time'

// Constants
export const SET_HEIGHT = 'SET_HEIGHT'
export const SET_NETWORK = 'SET_NETWORK'
export const SET_EXPLORER = 'SET_EXPLORER'

// Actions
export function setNetwork (net: NetworkType) {
  const network = net === NETWORK.MAIN ? NETWORK.MAIN : NETWORK.TEST
  return {
    type: SET_NETWORK,
    net: network
  }
}

export function setBlockHeight (blockHeight: number) {
  return {
    type: SET_HEIGHT,
    blockHeight
  }
}

export function setBlockExplorer (blockExplorer: ExplorerType) {
  return {
    type: SET_EXPLORER,
    blockExplorer
  }
}

export const checkVersion = () => (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState().metadata
  const { net } = state
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(`${apiEndpoint}/v2/version`).then((res) => {
    const shouldUpdate = res && res.data && res.data.version !== version && res.data.version !== '0.0.5'
    if (shouldUpdate) {
      dispatch(showWarningNotification({
        message: `Your wallet is out of date! Please download the latest version from ${NEON_WALLET_RELEASE_LINK}`,
        dismissAfter: FIVE_MINUTES_MS,
        onClick: () => openExternal(NEON_WALLET_RELEASE_LINK)
      }))
    }
  }).catch((e) => {})
}

export const syncBlockHeight = (net: NetworkType) => (dispatch: DispatchType) => {
  getWalletDBHeight(net).then((blockHeight) => {
    return dispatch(setBlockHeight(blockHeight))
  })
}

const initialState = {
  blockHeight: 0,
  network: NETWORK.MAIN,
  blockExplorer: EXPLORER.NEO_TRACKER
}

// reducer for metadata associated with Neon
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case SET_HEIGHT:
      return {
        ...state,
        blockHeight: action.blockHeight
      }
    case SET_EXPLORER:
      return {
        ...state,
        blockExplorer: action.blockExplorer
      }
    case SET_NETWORK:
      return {
        ...state,
        network: action.net
      }
    default:
      return state
  }
}
