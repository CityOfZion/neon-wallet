import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { TokensTable } from '@renderer/components/TokensTable'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { AccountDetailsLayout } from '@renderer/layouts/AccountDetailsLayout'

import { CommonAccountActions } from '../CommonAccountActions'

export const AccountTokensList = () => {
  const { accounts } = useAccountsSelector()
  const { address } = useParams()
  const { t } = useTranslation('pages', { keyPrefix: 'wallets.accountTokensList' })

  const account = useMemo(() => accounts.find(account => account.address === address)!, [accounts, address])

  const balanceExchange = useBalancesAndExchange(account ? [account] : [])

  const formattedTotalTokensBalances = useMemo(
    () =>
      FilterHelper.currency(
        BalanceHelper.calculateTotalBalances(balanceExchange.balance.data, balanceExchange.exchange.data)
      ),
    [balanceExchange.balance.data, balanceExchange.exchange.data]
  )

  return (
    <AccountDetailsLayout title={t('title')} actions={<CommonAccountActions account={account} />}>
      <div className="text-right pt-4">
        <span className="text-gray-300">{t('balance')}</span> {formattedTotalTokensBalances}
      </div>
      <TokensTable balanceExchange={balanceExchange} />
    </AccountDetailsLayout>
  )
}
