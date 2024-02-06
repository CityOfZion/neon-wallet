import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TbLoader2 } from 'react-icons/tb'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { BalanceConvertedToExchange, BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'

type TProps = {
  balanceExchange: UseMultipleBalanceAndExchangeResult
}

type TBar = {
  color: string
  widthPercent: number
  name: string
  value: string
}

export const BalanceChart = ({ balanceExchange }: TProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'balanceChart' })

  const totalTokensBalances = useMemo(
    () => BalanceHelper.calculateTotalBalances(balanceExchange.balance.data, balanceExchange.exchange.data),
    [balanceExchange]
  )

  const bars = useMemo<TBar[]>(() => {
    const convertedBalances = BalanceHelper.convertBalancesToCurrency(
      balanceExchange.balance.data,
      balanceExchange.exchange.data
    )
    if (!totalTokensBalances || totalTokensBalances <= 0 || !convertedBalances)
      return [{ color: '#676767', name: t('noAssests'), value: FilterHelper.currency(0), widthPercent: 100 }]

    const filteredBalances = convertedBalances
      .filter(balance => balance.convertedAmount > 0)
      .reduce((acc, balance) => {
        const repeated = acc.find(item => item.token.hash === balance.token.hash)
        if (repeated) {
          repeated.amountNumber += balance.amountNumber
          repeated.convertedAmount += balance.convertedAmount
          repeated.amount = repeated.amountNumber.toFixed(repeated.token.decimals)
          return acc
        }

        acc.push(balance)
        return acc
      }, [] as BalanceConvertedToExchange[])
      .sort((token1, token2) => token2.convertedAmount - token1.convertedAmount)

    const firstFourBars = filteredBalances.slice(0, 4).map<TBar>(balance => {
      const color = UtilsHelper.getRandomTokenColor(balance.token.symbol)
      const widthPercent = (balance.convertedAmount * 100) / totalTokensBalances
      return {
        name: balance.token.name,
        value: FilterHelper.currency(balance.convertedAmount),
        color,
        widthPercent,
      }
    })

    if (filteredBalances.length <= 4) {
      return firstFourBars
    }

    const othersAmount = filteredBalances.slice(4).reduce((acc, balance) => acc + balance.convertedAmount, 0)
    const otherBar: TBar = {
      color: '#47BEFF',
      value: FilterHelper.currency(othersAmount),
      name: t('tokenName.others'),
      widthPercent: (othersAmount * 100) / totalTokensBalances,
    }

    return [...firstFourBars, otherBar]
  }, [balanceExchange.balance.data, balanceExchange.exchange.data, t, totalTokensBalances])

  return (
    <div className="flex w-full justify-center">
      {balanceExchange.isLoading ? (
        <div className="flex justify-center w-full">
          <TbLoader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : (
        bars.map(bar => (
          <div
            key={bar.name}
            className="flex flex-col mx-2 min-w-[5rem]"
            style={{
              width: `${bar.widthPercent}%`,
            }}
          >
            <div
              className="h-2 w-full rounded-full drop-shadow-lg bg-white"
              style={{
                backgroundImage: `linear-gradient(0deg, ${bar.color} 0%, ${bar.color}80 100%)`,
              }}
            ></div>
            <div className="flex items-start mt-5">
              <div
                className="w-2 h-2 rounded-full mt-1"
                style={{
                  backgroundColor: bar.color,
                }}
              ></div>
              <div className="flex flex-col pl-2">
                <span className="text-white text-xs font-normal">{bar.name}</span>
                <span className="text-gray-300 text-sm">{bar.value}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
