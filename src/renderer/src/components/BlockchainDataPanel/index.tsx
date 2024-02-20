import { useTranslation } from 'react-i18next'
import { TabsContent } from '@radix-ui/react-tabs'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'

import { Separator } from '../Separator'
import { Tabs } from '../Tabs'

import { NftViewer } from './NftViewer'
import { TokensTable } from './TokensTable'
import { TransactionsTable } from './TransactionsTable'

enum EAccountTabOption {
  TOKENS = 'TOKENS',
  NFTS = 'NFTS',
  TRANSACTIONS = 'TRANSACTIONS',
}

type TProps = {
  accounts: IAccountState[]
  balanceExchange: UseMultipleBalanceAndExchangeResult
}

export const BlockchainDataPanel = ({ accounts, balanceExchange }: TProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'blockchainDataPanel' })

  return (
    <div className="w-full flex flex-col bg-gray-800 rounded shadow-lg flex-grow px-4 py-3 min-h-0">
      <h1 className="text-white mb-3 text-sm">{t('title')}</h1>

      <Separator />

      <Tabs.Root defaultValue={EAccountTabOption.TOKENS} className="flex flex-col min-h-0 flex-grow min-w-0">
        <Tabs.List>
          <Tabs.Trigger value={EAccountTabOption.TOKENS}>{t('tabs.tokens')}</Tabs.Trigger>
          <Tabs.Trigger value={EAccountTabOption.NFTS}>{t('tabs.nfts')}</Tabs.Trigger>
          <Tabs.Trigger value={EAccountTabOption.TRANSACTIONS}>{t('tabs.transactions')}</Tabs.Trigger>
        </Tabs.List>

        <TabsContent value={EAccountTabOption.TOKENS} asChild>
          <TokensTable balanceExchange={balanceExchange} />
        </TabsContent>
        <TabsContent value={EAccountTabOption.NFTS} asChild>
          <NftViewer accounts={accounts} />
        </TabsContent>
        <TabsContent value={EAccountTabOption.TRANSACTIONS} asChild>
          <TransactionsTable accounts={accounts} />
        </TabsContent>
      </Tabs.Root>
    </div>
  )
}
