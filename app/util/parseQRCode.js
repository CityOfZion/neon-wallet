// @flow
import { rpc as n3Rpc } from '@cityofzion/neon-js'
import { api, u, rpc, sc, wallet } from '@cityofzion/neon-js-legacy'

import hashToSymbol from './hashToSymbol'
import { getNode, getRPCEndpoint } from '../actions/nodeStorageActions'

const INVALID_FORMAT = 'Invalid format'
const INVALID_PROTOCOL = 'Invalid protocol'
const MISSING_ADDRESS = 'Missing recipient address'
const UNRECOGNIZED_ASSET = 'Unrecognized asset'

export type RecipientData = {
  address: string,
  asset: ?string,
  amount: ?string,
  reference: ?string,
}

const parseQRCode = async ({
  url,
  net,
  chain,
}: {
  url: string,
  net: string,
  chain: string,
}): Promise<RecipientData> => {
  let parsedData

  try {
    parsedData = new URL(url)
  } catch (err) {
    throw INVALID_FORMAT
  }

  const { protocol, pathname, searchParams } = parsedData

  if (protocol !== 'neo:') throw INVALID_PROTOCOL
  if (!pathname) throw MISSING_ADDRESS

  let asset = searchParams.get('asset')
  const assetIsHash = asset && asset !== 'NEO' && asset !== 'GAS'

  if (assetIsHash && chain === 'neo2') {
    asset = hashToSymbol(asset)
    if (!asset) throw UNRECOGNIZED_ASSET
  } else {
    let endpoint = await getNode(net)
    if (!endpoint) {
      endpoint = await getRPCEndpoint(net)
    }
    const tokenNameResponse = await new n3Rpc.RPCClient(endpoint)
      .invokeFunction(asset, 'symbol')
      .catch(e => {
        console.error({ e })
      })
    const symbol = atob(tokenNameResponse.stack[0].value)
    if (symbol) asset = symbol
    else {
      throw UNRECOGNIZED_ASSET
    }
  }

  return {
    address: pathname,
    asset,
    amount: searchParams.get('amount'),
    reference: searchParams.get('description'),
  }
}

export default parseQRCode
