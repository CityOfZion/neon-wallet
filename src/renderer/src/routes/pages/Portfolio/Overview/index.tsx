import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BalanceChart } from '@renderer/components/BalanceChart'
import { Separator } from '@renderer/components/Separator'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'

export const PortfolioOverviewPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'portfolio.portfolioOverview' })
  const { accounts } = useAccountsSelector()
  const { wallets } = useWalletsSelector()
  const balanceExchange = useBalancesAndExchange(accounts)

  const formattedTotalTokensBalances = useMemo(
    () =>
      FilterHelper.currency(
        BalanceHelper.calculateTotalBalances(balanceExchange.balance.data, balanceExchange.exchange.data)
      ),
    [balanceExchange.balance.data, balanceExchange.exchange.data]
  )
  return (
    <section className="w-full flex flex-col bg-gray-800 rounded shadow-lg py-3 h-full px-4 min-w-0">
      <div className="flex justify-between text-sm mb-3">
        <h1 className="text-white">{t('overview')}</h1>

        {wallets && accounts && (
          <span className="text-gray-300">
            {t('walletsAndAccounts', { wallets: wallets.length, accounts: accounts.length })}
          </span>
        )}
      </div>

      <Separator />

      <div className="w-full flex justify-end">
        <div className="flex gap-2 pt-7 text-xl ml-2">
          <span className="text-gray-300">{t('balance')}</span>
          <span className=" text-white">{formattedTotalTokensBalances}</span>
        </div>
      </div>

      <ul className="flex h-full items-center px-20">
        <BalanceChart balanceExchange={balanceExchange} />
      </ul>
    </section>
  )
}
