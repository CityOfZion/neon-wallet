import hashToSymbol from './hashToSymbol'

const INVALID_FORMAT = 'Invalid format'
const INVALID_PROTOCOL = 'Invalid protocol'
const MISSING_ADDRESS = 'Missing recipient address'
const UNRECOGNIZED_ASSET = 'Unrecognized asset'

const parseQRCode = data => {
  let parsedData

  try {
    parsedData = new URL(data)
  } catch (err) {
    throw INVALID_FORMAT
  }

  const { protocol, pathname, searchParams } = parsedData

  if (protocol !== 'neo:') throw INVALID_PROTOCOL
  if (!pathname) throw MISSING_ADDRESS

  let asset = searchParams.get('asset')
  const assetIsHash = asset && asset !== 'NEO' && asset !== 'GAS'

  if (assetIsHash) {
    asset = hashToSymbol(asset)
    if (!asset) throw UNRECOGNIZED_ASSET
  }

  return {
    address: pathname,
    asset,
    amount: searchParams.get('amount'),
    reference: searchParams.get('description')
  }
}

export default parseQRCode
