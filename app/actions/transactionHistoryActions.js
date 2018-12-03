// @flow
import axios from 'axios'
import { api } from 'neon-js'
import { createActions } from 'spunky'

import { getRPCEndpoint } from './nodeStorageActions'
import { getDefaultTokens } from '../core/nep5'
import { TX_TYPES, ASSETS } from '../core/constants'

export const NEO_ID =
  'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b'
export const GAS_ID =
  '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7'

type Props = {
  net: string,
  address: string,
  shouldIncrementPagination: boolean
}

async function parseAbstractData(data, currentUserAddress, tokens, net) {
  const parsedTxType = abstract => {
    if (
      abstract.address_to === currentUserAddress &&
      abstract.address_from !== 'claim'
    )
      return TX_TYPES.RECEIVE
    if (abstract.address_from === 'claim') return TX_TYPES.CLAIM
    return TX_TYPES.SEND
  }

  const parsedAsset = async abstract => {
    const token = tokens.find(token => token.scriptHash === abstract.asset)
    if (token) return token
    if (abstract.asset === NEO_ID) {
      return {
        symbol: ASSETS.NEO
      }
    }
    if (abstract.asset === GAS_ID) {
      return {
        symbol: ASSETS.GAS
      }
    }
    const endpoint = await getRPCEndpoint(net)
    const tokenInfo = await api.nep5
      .getToken(endpoint, abstract.asset)
      .catch(e => {
        console.error(e)
        return {}
      })
    return {
      symbol: tokenInfo.symbol
    }
  }

  const parsedTo = abstract => {
    if (abstract.address_to === 'fees') return 'NETWORK FEES'
    if (abstract.address_to === 'mint') return 'MINT TOKENS'
    return abstract.address_to
  }

  const parsedFrom = abstract => {
    if (abstract.address_from === 'mint') return 'MINT TOKENS'
    return abstract.address_from
  }

  const results = []
  // eslint-disable-next-line
  for (const abstract of data) {
    // eslint-disable-next-line
    const asset = await parsedAsset(abstract)
    const type = parsedTxType(abstract)
    const summary: TxEntryType = {
      to: parsedTo(abstract),
      isNetworkFee: abstract.address_to === 'fees',
      from: parsedFrom(abstract),
      txid: abstract.txid,
      time: abstract.time,
      amount: abstract.amount,
      asset,
      label: type === TX_TYPES.CLAIM ? 'Gas Claim' : asset.symbol,
      type,
      id: `_${Math.random()
        .toString(36)
        .substr(2, 9)}`
    }

    results.push(summary)
  }
  return results
}

export const ID = 'transactionHistory'

// TODO: Refactor to use immutable data types!
// hold entries in memory for infinite scroll
let entries = []
let page = 1
export default createActions(
  ID,
  ({
    net,
    address,
    shouldIncrementPagination = false
  }: Props = {}) => async () => {
    // If refresh action dispatched reset pagination
    // to grab the most recent abstracts
    if (!shouldIncrementPagination) {
      page = 1
    }

    // $FlowFixMe
    const tokens = await getDefaultTokens()
    const endpoint = api.neoscan.getAPIEndpoint(net)
    const { data } = await axios.get(
      `${endpoint}/v1/get_address_abstracts/${address}/${page}`
    )

    const parsedEntries = await parseAbstractData(
      data.entries,
      address,
      tokens,
      net
    )
    page += 1
    if (shouldIncrementPagination) {
      if (page === 1) entries = []
      entries.push(...parsedEntries)
      return entries
    }
    entries = [...parsedEntries]
    return entries
  }
)
