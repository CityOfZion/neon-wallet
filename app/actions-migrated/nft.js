// @flow
import create from 'zustand'
import axios from 'axios'
import { rpc } from '@cityofzion/neon-js-legacy'
import { rpc as n3Rpc } from '@cityofzion/neon-js'

import { getSettings } from '../context/settings/SettingsContext'
import { getNode, getRPCEndpoint } from '../actions/nodeStorageActions'

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
  count: number,
  page: number,
}

const DEFAULT_NFT_GALLERY_RESULTS = (previousResults?: NftGalleryItem[]) => ({
  results: previousResults ?? [],
  page: 0,
  count: 0,
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

    const { assets, total: count } = response?.data

    if (!assets || !assets.length || !count)
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

    return { results: previousResults.concat(results), page, count }
  } catch (e) {
    console.error('An error occurred fetching data for NFT gallery', { e })
    return DEFAULT_NFT_GALLERY_RESULTS(previousResults)
  }
}

export const useNFTStore = create((set, get) => ({
  nfts: [],
  loading: false,
  error: null,
  galleryResults: DEFAULT_NFT_GALLERY_RESULTS(),

  async fetchNFTs(net, address) {
    const { chain } = await getSettings()
    if (chain !== 'neo3') return set({ nfts: [], loading: false, error: null })
    set({ loading: true })
    try {
      let endpoint = await getNode(net)
      if (!endpoint) {
        endpoint = await getRPCEndpoint(net)
      }

      const rpcClient = new rpc.RPCClient(endpoint, '2.3.3')

      const { result } = await rpcClient.execute(
        new rpc.Query({
          method: 'getnep11balances',
          params: [address],
        }),
      )

      const results = []

      if (result && result.balance && result.balance.length) {
        for (const nft of result.balance) {
          const tokenNameResponse = await new n3Rpc.RPCClient(endpoint)
            .invokeFunction(nft.assethash, 'symbol')
            .catch(e => {
              console.error({ e })
            })

          const symbol = atob(tokenNameResponse.stack[0].value)

          const API_URL = `https://dora.coz.io/api/v1/neo3/${
            net === 'TestNet' ? 'testnet' : 'mainnet'
          }/contract/${nft.assethash}`

          const { data } = await axios.get(API_URL)

          const collectedData = {
            name: data.manifest.name || 'N/A',
            symbol,
            count: nft.tokens.length,
          }

          results.push(collectedData)
        }
      }
      return set({ nfts: results, loading: false, error: null })
    } catch (error) {
      return set({ nfts: [], loading: false, error })
    }
  },

  async fetchGalleryResults(address, page) {
    set({ loading: true })

    try {
      const galleryResults = await parseGhostMarketResults({
        address,
        page,
        previousResults: get().galleryResults.results,
      })

      return set({ galleryResults, loading: false, error: null })
    } catch (error) {
      return set({
        galleryResults: DEFAULT_NFT_GALLERY_RESULTS(),
        loading: false,
        error,
      })
    }
  },
}))
