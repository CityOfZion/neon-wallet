import { useMemo } from 'react'
import { Pie } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IWalletState } from '@renderer/@types/store'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useAccountsByWalletIdSelector } from '@renderer/hooks/useAccountSelector'
import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'

Chart.register(CategoryScale)

type DataChart = {
  labels?: string[]
  datasets: DataChartItem[]
}

type DataChartItem = {
  label: string
  data: number[]
  backgroundColor: string[]
  borderColor?: string
  borderWidth: number
}

type TProps = {
  balanceExchange: UseMultipleBalanceAndExchangeResult
  wallets: IWalletState[]
  selectedWallet: IWalletState | undefined
}

export const BalanceRingChart = ({ balanceExchange, wallets, selectedWallet }: TProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'wallets' })

  const { accountsByWalletId } = useAccountsByWalletIdSelector(selectedWallet?.id || wallets[0].id)

  const totalTokensBalances = useMemo(
    () =>
      BalanceHelper.calculateTotalBalances(
        balanceExchange.balance.data,
        balanceExchange.exchange.data,
        accountsByWalletId.map(account => account.address)
      ),
    [balanceExchange, accountsByWalletId]
  )

  const filteredTokenBalance = useMemo<DataChart>(() => {
    const tokensBalances = BalanceHelper.getTokensBalance(
      balanceExchange.balance.data,
      accountsByWalletId.map(account => account.address)
    )
    const backgroundColor: string[] = []
    const dataResult =
      tokensBalances
        .filter(token => token.amountNumber > 0)
        .map(tokenBalance => {
          backgroundColor.push(UtilsHelper.getRandomTokenColor(tokenBalance.token.symbol))
          return tokenBalance.amountNumber
        }) ?? []

    return {
      datasets: [
        {
          label: 'Balance ',
          data: dataResult,
          backgroundColor,
          borderColor: 'transparent',
          borderWidth: 2,
        },
      ],
    }
  }, [accountsByWalletId, balanceExchange.balance.data])

  const formattedTotalTokensBalances = useMemo(() => FilterHelper.currency(totalTokensBalances), [totalTokensBalances])

  return (
    <div className="flex justify-center items-center h-[144px] w-[144px] relative mb-5">
      <div className="h-[140px] w-[140px] top-[7px] rounded-full bg-asphalt absolute"></div>
      <Pie
        className="z-20"
        width={133}
        height={133}
        data={filteredTokenBalance}
        options={{
          plugins: {
            title: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          cutout: 63,
          animation: false,
        }}
      />
      <div className="bg-gradient-to-t from-gray-800 to-gray-600 absolute z-10 h-[130px] w-[130px] top-3 rounded-full">
        <div className="flex flex-col w-full h-full justify-center items-center">
          <span className="text-gray-100 uppercase text-xs font-bold">{t('balance')}</span>
          <span className="text-lg">{formattedTotalTokensBalances}</span>
          <span className="text-gray-100 uppercase text-xs">{t('changeIn24hrs')}</span>
          <span className="text-sm text-neon">+5%</span>
        </div>
      </div>
    </div>
  )
}
