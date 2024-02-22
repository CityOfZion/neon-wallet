import { useTranslation } from 'react-i18next'
import { TbRefresh } from 'react-icons/tb'
import { AccountBalancePanel } from '@renderer/components/AccountData/AccountBalancePanel'
import { AccountDataPanel } from '@renderer/components/AccountData/AccountDataPanel'
import { IconButton } from '@renderer/components/IconButton'
import { Separator } from '@renderer/components/Separator'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { MainLayout } from '@renderer/layouts/Main'

export const PortfolioPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'portfolio' })
  const { accounts } = useAccountsSelector()
  const balanceExchange = useBalancesAndExchange(accounts)

  return (
    <MainLayout
      heading={t('title')}
      rightComponent={<IconButton icon={<TbRefresh />} size="md" text={t('buttonRefreshLabel')} disabled />}
    >
      <div className="flex-grow flex flex-col gap-y-5">
        <AccountBalancePanel balanceExchange={balanceExchange} />
        <div className="w-full flex flex-col bg-gray-800 rounded flex-grow p-4">
          <h1 className="text-white pb-4">{t('allAccounts')}</h1>
          <Separator />
          <AccountDataPanel balanceExchange={balanceExchange} accounts={accounts} />
        </div>
      </div>
    </MainLayout>
  )
}
