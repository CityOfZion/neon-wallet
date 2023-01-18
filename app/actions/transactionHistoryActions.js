// @flow
import { NeoLegacyREST, NeoRest } from '@cityofzion/dora-ts/dist/api'
import { createActions } from 'spunky'
import { rpc as n3Rpc, sc, u } from '@cityofzion/neon-js-next'
import axios from 'axios'

import { TX_TYPES } from '../core/constants'
import {
  getImageBySymbol,
  findAndReturnTokenInfo,
} from '../util/findAndReturnTokenInfo'
import { getSettings } from './settingsActions'
import { toBigNumber } from '../core/math'
import { getNode, getRPCEndpoint } from './nodeStorageActions'

type Props = {
  net: string,
  address: string,
  shouldIncrementPagination: boolean,
}

async function fetchMissingImageInfo(scriptHash, tokenId) {
  const url = `https://api.ghostmarket.io/api/v2/assets?Chain=n3&Contract=${scriptHash}&TokenIds%5B%5D=${tokenId}`
  const results = await axios.get(url)
  return results
}

export async function parseAbstractData(
  data: Array<any>,
  currentUserAddress: string,
  net: string,
) {
  const parsedTxType = abstract => {
    if (
      abstract.address_to === currentUserAddress &&
      abstract.address_from !== 'claim'
    )
      return TX_TYPES.RECEIVE
    if (abstract.address_from === 'claim') return TX_TYPES.CLAIM
    return TX_TYPES.SEND
  }

  const parsedTo = abstract => {
    if (abstract.address_to === 'fees') return 'NETWORK FEES'
    if (abstract.address_to === 'fee') return 'NETWORK FEES'
    if (abstract.address_to === 'mint') return 'MINT TOKENS'
    return abstract.address_to
  }

  const parsedFrom = abstract => {
    if (abstract.address_from === 'mint') return 'MINT TOKENS'
    return abstract.address_from
  }

  const results = []
  for (const abstract of data) {
    const asset = await findAndReturnTokenInfo(abstract.asset, net)

    const type = parsedTxType(abstract)
    const summary: TxEntryType = {
      to: parsedTo(abstract),
      isNetworkFee: abstract.address_to === 'fees',
      from: parsedFrom(abstract),
      txid: abstract.txid,
      time: abstract.time,
      amount: toBigNumber(abstract.amount).toString(),
      asset,
      symbol: asset.symbol,
      image: asset.image,
      label: type === TX_TYPES.CLAIM ? 'GAS Claim' : asset.symbol,
      type,
      id: `_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    }

    results.push(summary)
  }
  return results
}

/**
 * Parses a raw request for an address' history into a format usable by the
 * activity components.
 * @param data
 * @param currentUserAddress
 * @param net
 * @returns {Promise<[]>}
 */
export async function computeN3Activity(
  data: Object,
  currentUserAddress: string,
  net: string,
) {
  const results = []
  if (!data.items) return results
  for (const item of data.items) {
    const unresolved = item.invocations.map(async invocation => {
      let image
      let assets
      let endpoint = await getNode(net)
      if (!endpoint) {
        endpoint = await getRPCEndpoint(net)
      }

      try {
        switch (invocation.type) {
          case 'nep17_transfer':
            image = getImageBySymbol(invocation.metadata.symbol)
            break
          case 'nep11_transfer':
            invocation.metadata.time = item.time

            invocation.metadata.tokenName = Buffer.from(
              invocation.metadata.token_id,
              'hex',
            ).toString()

            assets = await new n3Rpc.RPCClient(endpoint).invokeFunction(
              invocation.metadata.scripthash,
              'properties',
              [sc.ContractParam.string(invocation.metadata.tokenName)],
            )

            if (assets.stack.length) {
              assets.stack[0].value.some(property => {
                const key = u.HexString.fromBase64(property.key.value).toAscii()
                if (key === 'image') {
                  image = u.HexString.fromBase64(property.value.value).toAscii()
                  return true
                }
                return false
              })
            } else {
              // if for some reason getting the image directly from the contract fails
              // use the ghost market API
              const imageResults = await fetchMissingImageInfo(
                invocation.metadata.scripthash,
                invocation.metadata.token_id,
              )

              if (imageResults?.data?.assets?.length) {
                image = imageResults.data.assets[0].metadata.mediaUri
              }
            }
            break
          default:
            break
        }
        // flatten the invocations into individual events to support existing components
        invocation.metadata.image = image
        invocation.hash = item.hash
        invocation.sender = item.sender
        invocation.sysfee = item.sysfee
        invocation.netfee = item.netfee
        invocation.block = item.block
        invocation.time = item.time
        invocation.vmstate = item.vmstate

        if (
          invocation.metadata.scripthash !==
          '0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5'
        ) {
          // BUG: this will display incorrect data if the token does not have
          // 8 decimals but this is a compromise to reduce network request overhead.
          invocation.metadata.amount = toBigNumber(
            (invocation.metadata.amount /= 10 ** 8),
          ).toString()
        }
      } catch (e) {
        console.warn('invocation error:', invocation, e)
      }
      return invocation
    })
    item.invocations = await Promise.all(unresolved)
    results.push(...item.invocations)
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
    shouldIncrementPagination = false,
  }: Props = {}) => async () => {
    const { chain } = await getSettings()

    // If refresh action dispatched reset pagination
    // to grab the most recent abstracts
    if (!shouldIncrementPagination) {
      page = 1
    }

    let parsedEntries = []

    if (chain === 'neo3') {
      const network = net === 'MainNet' ? 'mainnet' : 'testnet'
      const data = await NeoRest.addressTXFull(address, page, network)
      parsedEntries = await computeN3Activity(data, address, net)
    } else {
      const network = net === 'MainNet' ? 'mainnet' : 'testnet'
      const data = await NeoLegacyREST.getAddressAbstracts(
        address,
        page,
        network,
      )
      parsedEntries = await parseAbstractData(data.entries, address, net)
    }
    page += 1
    if (shouldIncrementPagination) {
      if (page === 1) entries = []
      entries.push(...parsedEntries)
      return entries
    }
    entries = [...parsedEntries]
    return entries
  },
)
