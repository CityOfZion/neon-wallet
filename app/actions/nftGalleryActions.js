// @flow
import axios from 'axios'
import { createActions } from 'spunky'

export const ID = 'nft-gallery'

const GHOST_MARKET = 'GHOST_MARKET'
const NFT_PROVIDER = GHOST_MARKET

// TODO: complete typings here
export type NftGalleryItem = {
  id: string,
}

export async function parseGhostMarketResults({
  address,
  page = 0,
  previousResults = [],
}: {
  address: string,
  page: number,
  previousResults: NftGalleryItem[],
}) {
  try {
    const test = 'NbCimJY3XWFLSbooaJ1jgdgNiuk7zcdD4o'
    const LIMIT = 9
    const OFFSET = LIMIT * page

    const response = await axios.get(
      `https://api.ghostmarket.io/api/v1/assets?chain=n3&owner=${address}&limit=9&offset=${OFFSET}&with_total=1`,
    )
    const items = response?.data?.assets ?? []
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

      return { results: previousResults.concat(results), page }
    }

    return { results: previousResults, page: 0 }
  } catch (e) {
    console.error('An error occurred fetching data for NFT gallery', { e })
    return { results: [], page: 0 }
  }
}

export default createActions(
  ID,
  ({ address, page, previousResults }) => async (): Promise<{
    results: NftGalleryItem[],
  }> => {
    switch (true) {
      case NFT_PROVIDER === GHOST_MARKET:
        return parseGhostMarketResults({ address, page, previousResults })

      default:
        return parseGhostMarketResults(address)
    }
  },
)
