import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { BalanceChart } from '@renderer/components/BalanceChart'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { AccountDetailsLayout } from '@renderer/layouts/AccountDetailsLayout'

export const AccountOverview = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'wallets' })
  const { address } = useParams()
  const { accounts } = useAccountsSelector()
  const account = useMemo(() => accounts.find(account => account.address === address), [accounts, address])

  const balanceExchange = useBalancesAndExchange(account ? [account] : [])

  const formattedTotalTokensBalances = useMemo(
    () =>
      FilterHelper.currency(
        BalanceHelper.calculateTotalBalances(balanceExchange.balance.data, balanceExchange.exchange.data)
      ),
    [balanceExchange.balance.data, balanceExchange.exchange.data]
  )

  return (
    <AccountDetailsLayout title={t('overview')} showButtons account={account}>
      <ul className="flex flex-col h-full items-center justify-center w-full">
        <div className="flex justify-between items-center w-full text-sm mb-3 px-2">
          <h1 className="text-gray-200">{t('holdings')}</h1>
          <div className="flex gap-2">
            <span className="text-gray-300">{t('balance')}</span>
            <span className=" text-white">{formattedTotalTokensBalances}</span>
          </div>
        </div>
        <BalanceChart balanceExchange={balanceExchange} />
      </ul>
    </AccountDetailsLayout>
  )
}
