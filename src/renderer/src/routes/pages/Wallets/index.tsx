import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdAdd, MdMoreHoriz } from 'react-icons/md'
import { TbEyePlus, TbFileImport, TbMenuDeep, TbPencil, TbRefresh, TbRepeat } from 'react-icons/tb'
import { IWalletState } from '@renderer/@types/store'
import { ActionPopover } from '@renderer/components/ActionPopover'
import { Button } from '@renderer/components/Button'
import { IconButton } from '@renderer/components/IconButton'
import { Separator } from '@renderer/components/Separator'
import { WalletCard } from '@renderer/components/WalletCard'
import { WalletSelect } from '@renderer/components/WalletSelect'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'
import { PortfolioLayout } from '@renderer/layouts/Portfolio'
import { accountReducerActions } from '@renderer/store/reducers/AccountReducer'

import { AccountList } from './AccountList'

export const WalletsPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'wallets' })
  const { wallets } = useWalletsSelector()
  const { accounts } = useAccountsSelector()
  const dispatch = useAppDispatch()
  const balanceExchange = useBalancesAndExchange(accounts)
  const { modalNavigateWrapper } = useModalNavigate()

  const [selectedWallet, setSelectedWallet] = useState<IWalletState | undefined>(wallets[0])
  const [isReordering, setIsReordering] = useState(false)

  const handleReorderSave = (accountsOrder: string[]) => {
    dispatch(accountReducerActions.reorderAccounts(accountsOrder))
    setIsReordering(false)
  }

  const handleReorderCancel = () => {
    setIsReordering(false)
  }

  return (
    <PortfolioLayout
      heading={
        <WalletSelect
          balanceExchange={balanceExchange}
          wallets={wallets}
          selected={selectedWallet}
          onSelect={setSelectedWallet}
          disabled={isReordering}
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
                {
                  icon: <TbRepeat />,
                  iconFilled: false,
                  label: t('reorderAccountsButtonLabel'),
                  onClick: () => setIsReordering(true),
                },
              ]}
            >
              <IconButton icon={<MdMoreHoriz />} size="md" disabled={isReordering} />
            </ActionPopover>
          </header>

          <main className="flex-grow">
            <Separator />
            <WalletCard wallet={selectedWallet} alwaysActive iconWithAccounts balanceExchange={balanceExchange} />
            <AccountList
              selectedWallet={selectedWallet}
              balanceExchange={balanceExchange}
              isReordering={isReordering}
              onReorderCancel={handleReorderCancel}
              onReorderSave={handleReorderSave}
            />
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
