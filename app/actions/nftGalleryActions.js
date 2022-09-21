// @flow
import axios from 'axios'
import { createActions } from 'spunky'

export const ID = 'nft-gallery'

const GHOST_MARKET = 'GHOST_MARKET'
const NFT_PROVIDER = GHOST_MARKET

// TODO: complete typings here
export type NftGalleryItem = {
  metadata: any,
  series: any,
  tokenId: any,
  contract: any,
  collection: any,
}

export type NftGalleryResults = {
  results: NftGalleryItem[],
  count: number,
  page: number,
}

const DEFAULT_NFT_GALLERY_RESULTS = { results: [], page: 0, count: 0 }

export async function parseGhostMarketResults({
  address,
  page = 0,
  previousResults = [],
}: {
  address: string,
  page: number,
  previousResults: NftGalleryItem[],
}): Promise<NftGalleryResults> {
  try {
    const test = 'NbCimJY3XWFLSbooaJ1jgdgNiuk7zcdD4o'
    const LIMIT = 9
    const OFFSET = LIMIT * page

    const response = await axios.get(
      `https://api.ghostmarket.io/api/v1/assets?chain=n3&owner=${test}&limit=9&offset=${OFFSET}&with_total=1`,
    )

    const items = response?.data?.assets ?? []
    const count = response?.data?.total_results ?? 0
    if (items.length) {
      const results = items.map(asset => {
        const parsed = {
          metadata: asset.nft.nft_metadata,
          series: asset.nft.series,
          tokenId: asset.nft.token_id,
          contract: asset.nft.contract,
          collection: asset.nft.collection,
        }
        return parsed
      })

      return { results: previousResults.concat(results), page, count: 1 }
    }

    return { results: previousResults, page: 0, count }
  } catch (e) {
    console.error('An error occurred fetching data for NFT gallery', { e })
    return DEFAULT_NFT_GALLERY_RESULTS
  }
}

export default createActions(
  ID,
  ({ address, page, previousResults }) => async (): Promise<
    NftGalleryResults,
  > => {
    switch (true) {
      case NFT_PROVIDER === GHOST_MARKET:
        return parseGhostMarketResults({ address, page, previousResults })

      default:
        return parseGhostMarketResults(address)
    }
  },
)
