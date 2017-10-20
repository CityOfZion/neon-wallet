// @flow
import { getWalletDBHeight, getAPIEndpoint } from 'neon-js'
import axios from 'axios'
import { version } from '../../package.json'
import { sendEvent, clearTransactionEvent } from './transactions'
// Constants
export const SET_HEIGHT = 'SET_HEIGHT'
export const SET_NETWORK = 'SET_NETWORK'
export const SET_EXPLORER = 'SET_EXPLORER'

// Actions
export function setNetwork (net: string) {
  const network = net === 'MainNet' ? 'MainNet' : 'TestNet'
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

export function setBlockExplorer (blockExplorer: string) {
  return {
    type: SET_EXPLORER,
    blockExplorer
  }
}

export const checkVersion = (net: NetworkType) => (dispatch: DispatchType) => {
  const apiEndpoint = getAPIEndpoint(net)
  return axios.get(apiEndpoint + '/v2/version').then((res) => {
    if (res === undefined || res === null) {
      // something went wrong
    } else if (res.data.version !== version && res.data.version !== '0.0.5') {
      dispatch(sendEvent(false, 'Your wallet is out of date! Please download version ' + res.data.version + ' from https://github.com/CityOfZion/neon-wallet/releases'))
      setTimeout(() => dispatch(clearTransactionEvent()), 15000)
    }
  }).catch((e) => {
    // something went wrong, but catch to avoid killing interface
  })
}

export const syncBlockHeight = (net: NetworkType) => (dispatch: DispatchType) => {
  getWalletDBHeight(net).then((blockHeight) => {
    return dispatch(setBlockHeight(blockHeight))
  })
}

// reducer for metadata associated with Neon
export default (state: Object = { blockHeight: 0, network: 'MainNet', blockExplorer: 'Neotracker' }, action: Object) => {
  switch (action.type) {
    case SET_HEIGHT:
      return { ...state, blockHeight: action.blockHeight }
    case SET_EXPLORER:
      return { ...state, blockExplorer: action.blockExplorer }
    case SET_NETWORK:
      return {...state, network: action.net}
    default:
      return state
  }
}
