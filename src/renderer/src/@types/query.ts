import { BalanceResponse, TokenPricesResponse } from '@cityofzion/blockchain-service'
import { QueryKey, UseQueryOptions } from '@tanstack/react-query'

import { TBlockchainServiceKey } from './blockchain'

type BaseResult = {
  isLoading: boolean
  isRefetchingByUser: boolean
  refetch: () => Promise<void>
}

export type BaseOptions<T = unknown> = Omit<UseQueryOptions<T, unknown, T, QueryKey>, 'queryKey' | 'queryFn'>

export type Exchange = TokenPricesResponse
export type MultiExchange = Record<TBlockchainServiceKey, Exchange[]>

export type TokenBalance = BalanceResponse & {
  blockchain: TBlockchainServiceKey
  amountNumber: number
}
export type Balance = {
  address: string
  tokensBalances: TokenBalance[]
}

export type UseExchangeResult = BaseResult & { data: MultiExchange | undefined }

export type UseBalancesParams = {
  address: string | null
  blockchain: TBlockchainServiceKey
}
export type UseUniqueBalancesResult = BaseResult & { data: Balance | undefined; type: 'unique' }
export type UseMultipleBalancesResult = BaseResult & {
  data: Balance[]
  findByKey: (key: string) => UseUniqueBalancesResult | undefined
  type: 'multiple'
}
export type UseBalancesResult = UseMultipleBalancesResult | UseUniqueBalancesResult

export type UseUniqueBalanceAndExchangeResult = BaseResult & {
  balance: UseUniqueBalancesResult
  exchange: UseExchangeResult
}
export type UseMultipleBalanceAndExchangeResult = BaseResult & {
  balance: UseMultipleBalancesResult
  exchange: UseExchangeResult
  findByBalanceKey: (key: string) => UseUniqueBalanceAndExchangeResult | undefined
}
export type UseBalanceExchangeResult = UseMultipleBalanceAndExchangeResult | UseUniqueBalanceAndExchangeResult
