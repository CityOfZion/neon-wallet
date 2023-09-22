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
  page: number,
  hasMore: boolean,
}

const DEFAULT_NFT_GALLERY_RESULTS = (previousResults?: NftGalleryItem[]) => ({
  results: previousResults ?? [],
  page: 0,
  hasMore: false,
})

export async function parseGhostMarketResults({
  address,
  page = 1,
  previousResults = [],
}: {
  address: string,
  page: number,
  previousResults: NftGalleryItem[],
}): Promise<NftGalleryResults> {
  try {
    const SIZE = 8

    const response = await axios.get(
      `https://api.ghostmarket.io/api/v2/assets?chain=n3&owners[]=${address}&size=${SIZE}&page=${page}&getTotal=true`,
    )

    const { assets, next } = response?.data

    if (!assets || !assets.length)
      return DEFAULT_NFT_GALLERY_RESULTS(previousResults)

    const results = assets.map(
      ({ metadata, collection, contract, tokenId }) => ({
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
      }),
    )

    return {
      results: previousResults.concat(results),
      page,
      hasMore: !!next && assets.length === SIZE,
    }
  } catch (e) {
    console.error('An error occurred fetching data for NFT gallery', { e })
    return DEFAULT_NFT_GALLERY_RESULTS(previousResults)
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
