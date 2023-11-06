import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdAdd, MdMoreHoriz } from 'react-icons/md'
import { TbEyePlus, TbFileImport, TbMenuDeep, TbPencil, TbRefresh, TbRepeat } from 'react-icons/tb'
import { ActionPopover } from '@renderer/components/ActionPopover'
import { Button } from '@renderer/components/Button'
import { IconButton } from '@renderer/components/IconButton'
import { Separator } from '@renderer/components/Separator'
import { WalletCard } from '@renderer/components/WalletCard'
import { WalletSelect } from '@renderer/components/WalletSelect'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useAppSelector } from '@renderer/hooks/useRedux'
import { PortfolioLayout } from '@renderer/layouts/Portfolio'
import { selectAccounts } from '@renderer/store/account/SelectorAccount'
import { selectWallets } from '@renderer/store/wallet/SelectorWallet'
import { Wallet } from '@renderer/store/wallet/Wallet'

import { AccountList } from './AccountList'

export const WalletsPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'wallets' })
  const wallets = useAppSelector(selectWallets)
  const accounts = useAppSelector(selectAccounts)
  const balanceExchange = useBalancesAndExchange(accounts)
  const { modalNavigateWrapper } = useModalNavigate()

  const [selectedWallet, setSelectedWallet] = useState<Wallet | undefined>(wallets[0])

  return (
    <PortfolioLayout
      heading={
        <WalletSelect
          balanceExchange={balanceExchange}
          wallets={wallets}
          selected={selectedWallet}
          onSelect={setSelectedWallet}
        />
      }
      rightComponent={
        <div className="flex gap-x-2">
          <IconButton icon={<TbMenuDeep />} filled={false} size="md" text={t('manageButtonLabel')} disabled />
          <IconButton icon={<MdAdd />} size="md" text={t('newWalletButtonLabel')} disabled />
          <IconButton
            icon={<TbFileImport />}
            filled={false}
            size="md"
            text={t('importButtonLabel')}
            onClick={modalNavigateWrapper('import')}
          />
          <IconButton icon={<TbEyePlus />} filled={false} size="md" text={t('addWatchAccountButtonLabel')} disabled />
          <IconButton icon={<TbRefresh />} filled={false} size="md" text={t('buttonRefreshLabel')} disabled />
        </div>
      }
      headerClassName="pb-2"
      contentClassName="flex-row gap-x-2.5"
    >
      {selectedWallet && (
        <section className="bg-gray-800 flex-grow rounded drop-shadow-lg max-w-[11.625rem] flex flex-col">
          <header className="flex justify-between pl-4 pr-2 py-3 items-center h-fit gap-x-1">
            <h2 className="text-sm truncate">{selectedWallet.name}</h2>

            <ActionPopover
              actions={[
                { icon: <TbPencil />, iconFilled: false, label: t('editWalletButtonLabel') },
                { icon: <TbRepeat />, iconFilled: false, label: t('reorderAccountsButtonLabel') },
              ]}
            >
              <IconButton icon={<MdMoreHoriz />} size="md" />
            </ActionPopover>
          </header>

          <main className="flex-grow">
            <Separator />
            <WalletCard wallet={selectedWallet} alwaysActive iconWithAccounts balanceExchange={balanceExchange} />
            <AccountList selectedWallet={selectedWallet} balanceExchange={balanceExchange} />
          </main>

          <footer className="px-4 pb-6">
            <Button
              label={t('addAccountButtonLabel')}
              variant="outlined"
              className="w-full"
              flat
              disabled
              leftIcon={<MdAdd />}
            />
          </footer>
        </section>
      )}
    </PortfolioLayout>
  )
}
