// @flow
import { api, u, rpc, sc, wallet } from '@cityofzion/neon-js-legacy'
import { rpc as n3Rpc } from '@cityofzion/neon-js'
import { extend, isEmpty, get } from 'lodash-es'
import { createActions } from 'spunky'
import { Howl } from 'howler'
import axios from 'axios'

// $FlowFixMe
import coinAudioSample from '../assets/audio/coin.wav'

import { getSettings } from './settingsActions'
import { getNode, getRPCEndpoint } from './nodeStorageActions'
import { ASSETS } from '../core/constants'
import {
  COIN_DECIMAL_LENGTH,
  convertToArbitraryDecimals,
} from '../core/formatters'
import { toBigNumber } from '../core/math'
import { findNetworkByDeprecatedLabel } from '../core/networks'

const { reverseHex, hexstring2str } = u
const { Query } = rpc
const { ScriptBuilder } = sc
const { getScriptHashFromAddress } = wallet

const MAX_SCRIPT_HASH_CHUNK_SIZE = 20

type Props = {
  net: string,
  address: string,
  tokens?: Array<TokenItemType>,
  isRetry?: boolean,
  chain?: string,
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

const parseDecimals = VMOutput => {
  if (VMOutput === '') return 0
  return parseInt(VMOutput, 10)
}

const parseHexNum = hex => (hex ? parseInt(reverseHex(hex), 16) : 0)

function NumberParser(item, decimals) {
  switch (item.type) {
    case 'Integer':
      return new u.Fixed8(item.value).div(100000000)
    case 'ByteArray':
      // eslint-disable-next-line
      return parseHexNum(item.value) / Math.pow(10, decimals)
    default:
      throw new Error(`Received invalid type ${item.type}`)
  }
}

// get tokens from Dora
let page = 1
const tokensFromDora = []
const doraResults = async () => {
  const pageResults = await axios.get(
    `https://dora.coz.io/api/v1/neo2/mainnet/assets/${page}`,
  )
  let token
  for (token of pageResults.data.items) {
    tokensFromDora.push({
      symbol: token.symbol,
      scriptHash: token.scripthash.slice(2),
      decimals: Number(token.decimals),
    })
  }
  page += 1
  const nextPage = await axios.get(
    `https://dora.coz.io/api/v1/neo2/mainnet/assets/${page}`,
  )
  if (nextPage.data.items.length !== 0) {
    doraResults()
  }
}
doraResults()

const getTokenBalances = (url, scriptHashArray, address) => {
  const addrScriptHash = reverseHex(getScriptHashFromAddress(address))
  const sb = new ScriptBuilder()

  scriptHashArray.forEach(scriptHash => {
    sb.emitAppCall(scriptHash, 'symbol')
      .emitAppCall(scriptHash, 'decimals')
      .emitAppCall(scriptHash, 'balanceOf', [addrScriptHash])
  })
  return Query.invokeScript(sb.str, false)
    .execute(url)
    .then(res => {
      const tokenList = {}
      if (
        res &&
        res.result &&
        res.result.stack &&
        res.result.stack.length >= 3
      ) {
        for (let i = 0; i < res.result.stack.length; i += 3) {
          try {
            const symbol = hexstring2str(res.result.stack[i].value)
            const decimals = parseDecimals(res.result.stack[i + 1].value)
            tokenList[symbol] = NumberParser(res.result.stack[i + 2], decimals)
          } catch (e) {
            throw e
          }
        }
      }
      return tokenList
    })
    .catch(err => {
      console.error({ err })
      throw err
    })
}

let RETRY_COUNT = 0

async function getBalances({ net, address, isRetry = false, chain }: Props) {
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

  let shouldRetry = false
  const results = await Promise.all(
    chunks.map(async chunk => {
      // NOTE: because the RPC nodes will respond with the contract
      // symbol name, we need to use our original token list
      // in case two tokens have the same symbol (SWTH vs SWTH OLD)
      const balanceResults = await getTokenBalances(
        endpoint,
        chunk.map(({ scriptHash }) => scriptHash),
        address,
      ).catch(e => Promise.reject(e))

      const hashBasedBalance = {}

      chunk.forEach((token, i) => {
        hashBasedBalance[token.symbol] = Object.values(balanceResults)[i]
      })
      return hashBasedBalance
    }),
  ).catch(() => {
    console.error(
      `An error occurred fetching token balances using: ${endpoint} attempting to use a new RPC node.`,
    )
    shouldRetry = true
  })
  if (shouldRetry && RETRY_COUNT < 4) {
    RETRY_COUNT += 1
    return getBalances({ net, address, isRetry: true, chain })
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
          'An error occurred attempting to fetch custom script hash balance info.',
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

  const assetBalances = {}
  const mainnetBalances = await axios.get(
    `https://dora.coz.io/api/v1/neo2/mainnet/get_balance/${address}`,
  )

  mainnetBalances.data.balance.forEach(token => {
    assetBalances[token.asset_symbol || token.symbol] = {
      balance: token.amount,
      hash: token.asset_hash,
    }
  })
  const testnetBalances = await axios.get(
    `https://dora.coz.io/api/v1/neo2/testnet/get_balance/${address}`,
  )
  const parsedTestNetBalances = {}
  testnetBalances.data.balance.forEach(token => {
    parsedTestNetBalances[token.asset] = {
      balance: token.amount,
      hash: token.asset_hash,
    }
  })
  const assets = net === 'MainNet' ? assetBalances : parsedTestNetBalances
  const neoBalance = assets?.NEO?.balance ?? '0'
  const gasBalance = assets.GAS?.balance ?? '0'
  const parsedAssets = [
    { [ASSETS.NEO]: neoBalance },
    { [ASSETS.GAS]: gasBalance },
  ]

  if (net === 'TestNet') {
    Object.keys(parsedTestNetBalances).map(sym => {
      const balance = {
        [parsedTestNetBalances[sym].hash]: {
          balance: toBigNumber(parsedTestNetBalances[sym].balance),
          symbol: sym,
          networkId: '2',
          scriptHash: parsedTestNetBalances[sym].hash,
        },
      }
      if (sym !== 'GAS' && sym !== 'NEO') {
        return parsedAssets.push(balance)
      }

      return null
    })
  }

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
  const balances = extend({}, ...parsedTokenBalances, ...parsedAssets)

  // check balances and update if necessary
  const n = net === 'MainNet' ? 'mainnet' : 'testnet'
  const allBalances = await axios.get(
    `https://dora.coz.io/api/v1/neo2/${n}/get_balance/${address}`,
  )
  const tokenBalances = {}
  allBalances.data.balance.forEach(token => {
    tokenBalances[token.asset_symbol || token.symbol] = token.amount
  })
  const items = Object.keys(tokenBalances)
  items.forEach((item, i) => {
    if (item !== 'NEO' && item !== 'GAS' && !(item in balances)) {
      const lookup = tokensFromDora.find(el => el.symbol === item)
      balances[(lookup?.scriptHash)] = {
        balance: Object.values(tokenBalances)[i],
        cryptocompareSymbol: undefined,
        decimals: lookup?.decimals,
        id: '',
        isUserGenerated: false,
        networkId: '1',
        scriptHash: lookup?.scriptHash,
        symbol: lookup?.symbol,
        totalsupply: undefined,
      }
    }
  })
  return balances
}

async function getN3Balances({ net, address }: Props) {
  const balances = {
    NEO: 0,
    GAS: 0,
  }

  let endpoint = await getNode(net)
  if (!endpoint) {
    endpoint = await getRPCEndpoint(net)
  }

  const rpcClient = new rpc.RPCClient(endpoint, '2.3.3')
  try {
    const balanceResponse = await rpcClient.execute(
      new rpc.Query({
        method: 'getnep17balances',
        params: [address],
      }),
    )

    const { result } = balanceResponse
    for (const balance of result.balance) {
      const { assethash, amount } = balance
      const tokenNameResponse = await new n3Rpc.RPCClient(endpoint)
        .invokeFunction(assethash, 'symbol')
        .catch(e => {
          console.error({ e })
        })
      const symbol = atob(tokenNameResponse.stack[0].value)
      const decimalResponse = await new n3Rpc.RPCClient(endpoint)
        .invokeFunction(assethash, 'decimals')
        .catch(e => {
          console.error({ e })
        })
      const decimals = decimalResponse.stack[0].value
      const parsedAmount = convertToArbitraryDecimals(amount, decimals)
      if (symbol === 'NEO' || symbol === 'GAS') {
        balances[symbol] = Number(parsedAmount)
      } else {
        balances[assethash] = {
          symbol,
          cryptocompareSymbol: undefined,
          scriptHash: assethash,
          decimals,
          balance: parsedAmount,
        }
      }
    }

    return balances
  } catch (e) {
    return balances
  }
}

export default createActions(
  ID,
  ({ net, address, tokens }: Props = {}) => async () => {
    const { chain } = await getSettings()
    if (chain === 'neo3') {
      return getN3Balances({ net, address, tokens })
    }
    return getBalances({ net, address, tokens })
  },
)
