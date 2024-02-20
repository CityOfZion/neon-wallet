import { useTranslation } from 'react-i18next'
import { TbRefresh } from 'react-icons/tb'
import { BalanceChartPanel } from '@renderer/components/BalanceChartPanel'
import { BlockchainDataPanel } from '@renderer/components/BlockchainDataPanel'
import { IconButton } from '@renderer/components/IconButton'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'
import { MainLayout } from '@renderer/layouts/Main'

export const PortfolioPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'portfolio' })
  const { accounts } = useAccountsSelector()
  const { wallets } = useWalletsSelector()
  const balanceExchange = useBalancesAndExchange(accounts)

  return (
    <MainLayout
      heading={t('title')}
      rightComponent={<IconButton icon={<TbRefresh />} size="md" text={t('buttonRefreshLabel')} disabled />}
      contentClassName="gap-y-3"
    >
      <BalanceChartPanel balanceExchange={balanceExchange} accounts={accounts} wallets={wallets} />
      <BlockchainDataPanel balanceExchange={balanceExchange} accounts={accounts} />
    </MainLayout>
  )
}
