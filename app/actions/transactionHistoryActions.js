// @flow
import { NeoLegacyREST, NeoRest } from '@cityofzion/dora-ts/dist/api'
import { createActions } from 'spunky'
import { rpc as n3Rpc, sc, u, wallet } from '@cityofzion/neon-js'
import axios from 'axios'

import { AddressTXFullResponse } from '@cityofzion/dora-ts/dist/interfaces/api/neo'
import { TX_TYPES, NOTIF_TYPES } from '../core/constants'
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
 * Handles NEP-17 notifications for the Neo N3 network including special formats
 * like MINT and ClAIM.
 * @param address
 * @param notification
 * @param net
 * @returns {Promise<*>}
 */
async function handleNEP17Transfer(address, notification, net) {
  notification.type = NOTIF_TYPES.NEP17Transfer

  const from = notification.state.value[0].value
    ? wallet.getAddressFromScriptHash(
        u.reverseHex(u.base642hex(notification.state.value[0].value)),
      )
    : undefined
  notification.parsed = {
    from,
    to: wallet.getAddressFromScriptHash(
      u.reverseHex(u.base642hex(notification.state.value[1].value)),
    ),
    amount: parseInt(notification.state.value[2].value, 10),
  }
  // identify the transfer vector; Was it a mint, claim, or transfer?
  if (
    notification.contract === '0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5' &&
    notification.amount === 0
  ) {
    notification.vector = TX_TYPES.CLAIM
  } else if (!notification.parsed.from) {
    notification.vector = TX_TYPES.MINT
  } else {
    notification.vector =
      notification.parsed.from === address ? TX_TYPES.SEND : TX_TYPES.RECEIVE
  }

  // get the token info
  notification.token = await findAndReturnTokenInfo(notification.contract, net)
  return notification
}

/**
 * Handles NEP-11 notifications for the Neo N3 network
 * @param address
 * @param notification
 * @param net
 * @returns {Promise<void>}
 */
async function handleNEP11Transfer(address, notification, net) {
  notification.type = NOTIF_TYPES.NEP11Transfer

  // TODO - the code commented here is the previous nep-11 parsing code and
  //  needs to be re-implemented
  /*
  notification.metadata.tokenName = Buffer.from(
    notification.metadata.token_id,
    'hex',
  ).toString()

  assets = await new n3Rpc.RPCClient(endpoint).invokeFunction(
    notification.metadata.scripthash,
    'properties',
    [sc.ContractParam.string(notification.metadata.tokenName)],
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
      notification.contract,
      notification.state[3]?.value,
    )

    const result = imageResults?.data?.assets[0]

    if (result && result.metadata.mediaType.includes('webp')) {
      image = result.metadata.mediaUri
    }
  }
  break

   */
}

/**
 * Handles notifications which do not have special designations (i.e NEP-17)
 * @param currentUserAddress
 * @param notification
 * @param net
 * @returns {Promise<*>}
 */
async function handleArbitraryNotification(
  currentUserAddress,
  notification,
  net,
) {
  return notification
}

/**
 * Parses a raw request for an address' history into a format usable by the
 * activity components. Each transaction can have multiple events so this method's
 * purpose is to parse each event, but retain the grouping within the transactions
 * so they can be properly communicated to the user.
 * @param data
 * @param currentUserAddress
 * @param net
 * @returns {Promise<[]>}
 */
export async function computeN3Activity(
  data: AddressTXFullResponse,
  currentUserAddress: string,
  net: string,
) {
  const results = []
  if (!data.items) return results
  for (const item of data.items) {
    const unresolved = item.notifications.map(async notification => {
      let endpoint = await getNode(net)
      if (!endpoint) {
        endpoint = await getRPCEndpoint(net)
      }

      if (
        notification !== undefined &&
        notification.state.value.length === 3 &&
        notification.event_name === 'Transfer'
      ) {
        // If the event was a NEP-17 transfer
        notification = await handleNEP17Transfer(
          currentUserAddress,
          notification,
          net,
        )
      } else if (
        notification !== undefined &&
        notification.state.value.length === 4 &&
        notification.event_name === 'Transfer'
      ) {
        // If the event was a NEP-11 transfer
        notification = await handleNEP11Transfer(
          currentUserAddress,
          notification,
          net,
        )
      } else {
        notification = await handleArbitraryNotification(
          currentUserAddress,
          notification,
          net,
        )
      }

      return notification
    })
    item.invocations = await Promise.all(unresolved)

    // fees are in GAS which has 8 decimals
    item.netfee /= 10 ** 8
    item.sysfee /= 10 ** 8

    results.push(item)
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
    let count = 0

    if (chain === 'neo3') {
      const network = net === 'MainNet' ? 'mainnet' : 'testnet'
      const data = await NeoRest.addressTXFull(address, page, network)
      count = data.totalCount
      parsedEntries = await computeN3Activity(data, address, net)
    } else {
      const network = net === 'MainNet' ? 'mainnet' : 'testnet'
      const data = await NeoLegacyREST.getAddressAbstracts(
        address,
        page,
        network,
      )
      count = data.total_entries
      parsedEntries = await parseAbstractData(data.entries, address, net)
    }
    page += 1
    if (shouldIncrementPagination) {
      if (page === 1) entries = []
      entries.push(...parsedEntries)
      return { entries, count }
    }
    entries = [...parsedEntries]
    return { entries, count }
  },
)
