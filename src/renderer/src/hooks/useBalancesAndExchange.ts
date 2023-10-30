import { useMemo } from 'react'
import {
  UseBalanceExchangeResult,
  UseBalancesParams,
  UseMultipleBalanceAndExchangeResult,
  UseUniqueBalanceAndExchangeResult,
} from '@renderer/@types/query'

import { useBalances } from './useBalances'
import { useExchange } from './useExchange'

export function useBalancesAndExchange(params: UseBalancesParams): UseUniqueBalanceAndExchangeResult

export function useBalancesAndExchange(params: UseBalancesParams[]): UseMultipleBalanceAndExchangeResult

export function useBalancesAndExchange(params: UseBalancesParams | UseBalancesParams[]): UseBalanceExchangeResult

export function useBalancesAndExchange(params: UseBalancesParams | UseBalancesParams[]): UseBalanceExchangeResult {
  const balance = useBalances(params)
  const exchange = useExchange()

  const balanceExchangeResult = useMemo<UseBalanceExchangeResult>(() => {
    const isLoading = balance.isLoading || exchange.isLoading
    const isRefetchingByUser = balance.isRefetchingByUser || exchange.isRefetchingByUser

    const refetch = async () => {
      await Promise.all([balance.refetch(), exchange.refetch()])
    }

    const sharedResult = {
      isLoading,
      isRefetchingByUser,
      refetch,
      exchange,
    }

    if (balance.type === 'unique') {
      return {
        ...sharedResult,
        balance,
      }
    }

    const findByBalanceKey = (key: string) => {
      const uniqueBalance = balance.findByKey(key)

      if (!uniqueBalance) return

      return {
        ...sharedResult,
        balance: uniqueBalance,
      }
    }

    return {
      ...sharedResult,
      balance,
      findByBalanceKey,
    }
  }, [balance, exchange])

  return balanceExchangeResult
}
