// @flow
import { NeoLegacyREST, NeoRest } from '@cityofzion/dora-ts/dist/api'
import { createActions } from 'spunky'
import { TX_TYPES } from '../core/constants'
import { findAndReturnTokenInfo } from '../util/findAndReturnTokenInfo'
import { getSettings } from './settingsActions'
import { toBigNumber } from '../core/math'

type Props = {
  net: string,
  address: string,
  shouldIncrementPagination: boolean,
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
export async function handleNeoActivity(
  data: Array<any>,
  currentUserAddress: string,
  net: string,
) {
  const results = []
  if (!data.items) return results
  for (const item of data.items) {
    const unresolved = item.invocations.map(async invocation => {
      const asset = await findAndReturnTokenInfo(
        invocation.metadata.scripthash,
        net,
      )
      // flatten the invocations into individual events to support existing components
      invocation.metadata.image = asset.image
      invocation.hash = item.hash
      invocation.sender = item.sender
      invocation.sysfee = item.sysfee
      invocation.netfee = item.netfee
      invocation.block = item.block
      invocation.time = item.time
      invocation.vmstate = item.vmstate

      if (
        invocation.metadata.scripthash ===
        '0xd2a4cff31913016155e38e474a2c06d08be276cf'
      ) {
        invocation.metadata.amount /= 10 ** 8
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

    let data = { entries: [] }
    let parsedEntries = []

    if (chain === 'neo3') {
      const network = net === 'MainNet' ? 'mainnet' : 'testnet_rc4'
      data = await NeoRest.addressTXFull(address, page, network)
      parsedEntries = await handleNeoActivity(data, address, net)
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
