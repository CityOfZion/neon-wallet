import { useCallback, useState } from 'react'
import { TokenPricesResponse } from '@cityofzion/blockchain-service'
import { MultiExchange, UseExchangeResult } from '@renderer/@types/query'
import { selectBsAggregator } from '@renderer/store/blockchain/SelectorBlockchain'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import lodash from 'lodash'

import { useAppSelector } from './useRedux'

type ExchangeInfoByKey = Record<string, TokenPricesResponse[]>

export function useExchange(
  queryOptions?: Omit<UseQueryOptions<MultiExchange, unknown, MultiExchange, string[]>, 'queryKey' | 'queryFn'>
): UseExchangeResult {
  const bsAggregator = useAppSelector(selectBsAggregator)

  const fetchExchanges = useCallback(async (): Promise<MultiExchange> => {
    const promises = bsAggregator.blockchainServices.map(
      async (service): Promise<ExchangeInfoByKey> => ({
        [service.blockchainName]: await service.exchangeDataService.getTokenPrices('USD'),
      })
    )

    const exchanges = await Promise.allSettled(promises)
    const exchangesFiltered = exchanges
      .filter((exchange): exchange is PromiseFulfilledResult<ExchangeInfoByKey> => exchange.status === 'fulfilled')
      .map(exchange => exchange.value)

    return lodash.merge({}, ...exchangesFiltered)
  }, [bsAggregator])

  const [isRefetchingByUser, setIsRefetchingByUser] = useState(false)

  const { refetch, ...rest } = useQuery({
    queryKey: ['exchange'],
    queryFn: () => fetchExchanges(),
    ...queryOptions,
  })

  const customRefetch = useCallback(async () => {
    setIsRefetchingByUser(true)

    try {
      await refetch()
    } finally {
      setIsRefetchingByUser(false)
    }
  }, [refetch])

  return {
    ...rest,
    refetch: customRefetch,
    isRefetchingByUser,
  }
}
