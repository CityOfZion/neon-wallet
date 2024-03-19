import { useMemo } from 'react'
import { hasNft } from '@cityofzion/blockchain-service'
import { IAccountState } from '@renderer/@types/store'
import { useInfiniteQuery } from '@tanstack/react-query'

import { useBsAggregator } from './useBsAggregator'
import { useNetworkTypeSelector } from './useSettingsSelector'

export const useNfts = (account: IAccountState) => {
  const { networkType } = useNetworkTypeSelector()
  const { bsAggregator } = useBsAggregator()

  const query = useInfiniteQuery({
    queryKey: ['nfts', account.address, networkType],
    queryFn: async ({ pageParam }) => {
      const blockchainService = bsAggregator.blockchainServicesByName[account.blockchain]
      if (!hasNft(blockchainService)) return { items: [] }

      const response = await blockchainService.nftDataService.getNftsByAddress({
        address: account.address,
        cursor: pageParam,
      })

      return response
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: lastPage => lastPage.nextCursor,
  })

  const aggregatedData = useMemo(() => {
    return query.data?.pages.flatMap(page => page.items) ?? []
  }, [query.data])

  return { aggregatedData, ...query }
}
