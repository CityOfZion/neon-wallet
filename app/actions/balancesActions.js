// @flow
import { api } from '@cityofzion/neon-js'
import { extend, isEmpty, get } from 'lodash-es'
import { createActions } from 'spunky'
import { Howl } from 'howler'
// $FlowFixMe
import coinAudioSample from '../assets/audio/coin.wav'

import { getSettings } from './settingsActions'
import { getNode, getRPCEndpoint } from './nodeStorageActions'
import { ASSETS } from '../core/constants'
import { COIN_DECIMAL_LENGTH } from '../core/formatters'
import { toBigNumber } from '../core/math'
import { findNetworkByDeprecatedLabel } from '../core/networks'

const MAX_SCRIPT_HASH_CHUNK_SIZE = 3

type Props = {
  net: string,
  address: string,
  tokens?: Array<TokenItemType>,
  isRetry?: boolean,
}

let inMemoryBalances = {}
let hasTriggeredAudio = false
let inMemoryAddress
let inMemoryNetwork
let sound

// TODO: leverage a better solution to supress warnings stemming
// from jest tests
if (process.env.NODE_ENV !== 'test') {
  sound = new Howl({
    src: [coinAudioSample],
  })
}

export const ID = 'balances'

export function resetBalanceState() {
  hasTriggeredAudio = false
  inMemoryAddress = undefined
  inMemoryNetwork = undefined
  inMemoryBalances = {}
}

function resetAudioTrigger() {
  hasTriggeredAudio = false
}

function determineIfBalanceUpdated(
  balanceData: Object,
  soundEnabled: boolean,
  networkHasChanged: boolean | void,
  addressHasChanged: boolean | void,
) {
  if (
    isEmpty(inMemoryBalances) ||
    hasTriggeredAudio ||
    !soundEnabled ||
    networkHasChanged ||
    addressHasChanged
  ) {
    return undefined
  }
  Object.keys(balanceData).forEach(key => {
    const inMemoryBalance = toBigNumber(inMemoryBalances[key] || 0)
    if (toBigNumber(balanceData[key]).greaterThan(inMemoryBalance)) {
      sound.play()
      hasTriggeredAudio = true
    }
  })
}

let RETRY_COUNT = 0

async function getBalances({ net, address, isRetry = false }: Props) {
  const { soundEnabled, tokens } = (await getSettings()) || {
    tokens: [],
    soundEnabled: true,
  }
  const network = findNetworkByDeprecatedLabel(net)

  let endpoint = await getNode(net, isRetry)
  if (!endpoint) {
    endpoint = await getRPCEndpoint(net)
  }

  let networkHasChanged = true
  if (net === inMemoryNetwork) networkHasChanged = false

  let adressHasChanged = false
  if (!inMemoryAddress) adressHasChanged = false
  else if (inMemoryAddress !== address) adressHasChanged = true

  const chunks =
    tokens.length &&
    tokens
      .filter(token => !token.isUserGenerated && token.networkId === network.id)
      .reduce((accum, currVal) => {
        const chunk = {
          scriptHash: currVal.scriptHash,
          symbol: currVal.symbol,
        }
        if (!accum.length) {
          accum.push([chunk])
          return accum
        }

        if (accum[accum.length - 1].length < MAX_SCRIPT_HASH_CHUNK_SIZE) {
          accum[accum.length - 1].push(chunk)
        } else {
          accum.push([chunk])
        }
        return accum
      }, [])

  const promiseMap = chunks.map(async chunk => {
    // NOTE: because the RPC nodes will respond with the contract
    // symbol name, we need to use our original token list
    // in case two tokens have the same symbol (SWTH vs SWTH OLD)
    const balanceResults = await api.nep5.getTokenBalances(
      endpoint,
      chunk.map(({ scriptHash }) => scriptHash),
      address,
    )
    const hashBasedBalance = {}

    chunk.forEach((token, i) => {
      hashBasedBalance[token.symbol] = Object.values(balanceResults)[i]
    })
    return hashBasedBalance
  })

  let shouldRetry = false
  const results = await Promise.all(promiseMap).catch(e => {
    console.error(
      `An error occurred fetching token balances using: ${endpoint} attempting to use a new RPC node.`,
    )
    shouldRetry = true
  })
  if (shouldRetry && RETRY_COUNT < 4) {
    RETRY_COUNT += 1
    return getBalances({ net, address, isRetry: true })
  }

  const parsedTokenBalances =
    results &&
    results.reduce((accum, currBalance) => {
      Object.keys(currBalance).forEach(key => {
        const foundToken = tokens.find(token => token.symbol === key)
        if (foundToken && currBalance[key]) {
          determineIfBalanceUpdated(
            // $FlowFixMe
            { [foundToken.symbol]: currBalance[key] },
            soundEnabled,
            networkHasChanged,
            adressHasChanged,
          )
          // $FlowFixMe
          inMemoryBalances[foundToken.symbol] = currBalance[key]
          accum.push({
            [foundToken.scriptHash]: {
              ...foundToken,
              balance: currBalance[key],
            },
          })
        }
      })
      return accum
    }, [])

  // Handle manually added script hashses here
  const userGeneratedTokenInfo = []
  for (const token of tokens.filter(
    token => token.isUserGenerated && token.networkId === network.id,
  )) {
    const info = await api.nep5
      .getToken(endpoint, token.scriptHash, address)
      .catch(error => {
        console.error(
          'An error occurrred attempting to fetch custom script hash balance info.',
          { error },
        )
        return Promise.resolve()
      })
    if (info) {
      userGeneratedTokenInfo.push({
        scriptHash: token.scriptHash,
        ...info,
      })
    }
  }
  userGeneratedTokenInfo.forEach(token => {
    determineIfBalanceUpdated(
      { [token.symbol]: token.balance },
      soundEnabled,
      networkHasChanged,
      adressHasChanged,
    )
    inMemoryBalances[token.symbol] = token.balance
    if (parsedTokenBalances) {
      parsedTokenBalances.push({
        [token.scriptHash]: {
          ...token,
        },
      })
    }
  })

  // asset balances
  const assetBalances = await api
    .getBalanceFrom({ net, address }, api.neoscan)
    .catch(e => console.error(e))

  const assets = get(assetBalances, 'balance.assets', {})
  // The API doesn't always return NEO or GAS keys if, for example, the address only has one asset
  const neoBalance = assets.NEO ? assets.NEO.balance.toString() : '0'
  const gasBalance = assets.GAS
    ? assets.GAS.balance.round(COIN_DECIMAL_LENGTH).toString()
    : '0'
  const parsedAssets = [
    { [ASSETS.NEO]: neoBalance },
    { [ASSETS.GAS]: gasBalance },
  ]
  determineIfBalanceUpdated(
    { [ASSETS.NEO]: neoBalance },
    soundEnabled,
    networkHasChanged,
    adressHasChanged,
  )
  inMemoryBalances[ASSETS.NEO] = neoBalance
  determineIfBalanceUpdated(
    { [ASSETS.GAS]: gasBalance },
    soundEnabled,
    networkHasChanged,
    adressHasChanged,
  )
  inMemoryBalances[ASSETS.GAS] = gasBalance

  resetAudioTrigger()
  inMemoryNetwork = net
  // $FlowFixMe
  return extend({}, ...parsedTokenBalances, ...parsedAssets)
}

export default createActions(
  ID,
  ({ net, address, tokens }: Props = {}) => async () =>
    getBalances({ net, address, tokens }),
)
