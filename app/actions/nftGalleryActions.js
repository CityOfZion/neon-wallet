// @flow
import axios from 'axios'
import { createActions } from 'spunky'

export const ID = 'nft-gallery'

const GHOST_MARKET = 'GHOST_MARKET'
const NFT_PROVIDER = GHOST_MARKET

export type NftGalleryItem = {
  metadata: {
    description: string,
    mediaUri: string,
    mediaType: string,
    name: string,
  },
  tokenId: string,
  contract: string,
  collection: {
    name: string,
  },
}

export type NftGalleryResults = {
  results: NftGalleryItem[],
  cursor?: string,
  hasMore: boolean,
}

function buildGhostMaketUrl(address: string, size: number, cursor?: string) {
  const resultCursor = cursor ? `&cursor=${cursor}` : ''
  const url = `https://api.ghostmarket.io/api/v2/assets?chain=n3&owners[]=${address}&size=${size}${resultCursor}`
  return url
}

const DEFAULT_NFT_GALLERY_RESULTS = (previousResults?: NftGalleryItem[]) => ({
  results: previousResults ?? [],
  hasMore: false,
})

export async function parseGhostMarketResults({
  address,
  previousResults = [],
  cursor,
}: {
  address: string,
  cursor?: string,
  previousResults: NftGalleryItem[],
}): Promise<NftGalleryResults> {
  try {
    const size = 6

    const response = await axios.get(buildGhostMaketUrl(address, size, cursor))

    const { assets, next } = response?.data
    if (!assets || !assets.length)
      return DEFAULT_NFT_GALLERY_RESULTS(previousResults)

    const results = assets
      .map(({ metadata, collection, contract, tokenId }) => ({
        metadata: {
          description: metadata.description,
          mediaUri: metadata.mediaUri,
          mediaType: metadata.mediaType,
          name: metadata.name,
        },
        tokenId,
        contract: contract.hash,
        collection: {
          name: collection.name,
        },
      }))
      .filter(asset => !asset.metadata.mediaType.includes('webp'))

    return {
      results: previousResults.concat(results),
      next,
      hasMore: !!next && assets.length === size,
    }
  } catch (e) {
    console.error('An error occurred fetching data for NFT gallery', { e })
    return DEFAULT_NFT_GALLERY_RESULTS(previousResults)
  }
}

export default createActions(
  ID,
  ({ address, cursor, previousResults }) => async (): Promise<
    NftGalleryResults,
  > => {
    switch (true) {
      case NFT_PROVIDER === GHOST_MARKET:
        return parseGhostMarketResults({ address, cursor, previousResults })

      default:
        return parseGhostMarketResults(address)
    }
  },
)
