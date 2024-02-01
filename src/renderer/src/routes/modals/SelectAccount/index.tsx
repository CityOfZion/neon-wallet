import { Fragment, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbStepOut } from 'react-icons/tb'
import { IAccountState, IWalletState } from '@renderer/@types/store'
import { AccountList } from '@renderer/components/AccountList'
import { Button } from '@renderer/components/Button'
import { WalletSelect } from '@renderer/components/WalletSelect'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocationState = {
  handleSelectAccount: (contact: IAccountState) => void
}

export const SelectAccount = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'selectAccount' })
  const { modalNavigate } = useModalNavigate()
  const { handleSelectAccount } = useModalState<TLocationState>()
  const { accounts } = useAccountsSelector()
  const balanceExchange = useBalancesAndExchange(accounts)
  const { wallets } = useWalletsSelector()
  const [selectedWallet, setSelectedWallet] = useState<IWalletState | undefined>(undefined)
  const [selectedAccount, setSelectedAccount] = useState<IAccountState | undefined>(undefined)

  const handleSelectWallet = wallet => {
    setSelectedWallet(wallet)
    setSelectedAccount(undefined)
  }

  const selectAccount = () => {
    if (!selectedAccount) {
      return
    }
    handleSelectAccount(selectedAccount)
    modalNavigate(-1)
  }

  const filteredWallets = useMemo(() => {
    return wallets.filter(wallet => wallet.walletType !== 'watch')
  }, [wallets])

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbStepOut />}>
      <WalletSelect
        balanceExchange={balanceExchange}
        wallets={filteredWallets}
        selected={selectedWallet}
        onSelect={handleSelectWallet}
        showCreateWalletButton={false}
        selectTriggerClassName={'bg-asphalt'}
        selectContentClassName={'w-[19.5rem]'}
      />

      {selectedWallet && (
        <Fragment>
          <section className="w-full flex flex-col h-full py-5 items-center">
            <h2 className="text-sm text-left w-full pl-[0.2em]">{t('yourAccounts')}</h2>
            <main className="w-full overflow-y-auto flex-grow my-3 flex flex-col basis-0">
              <AccountList
                selectedWallet={selectedWallet}
                balanceExchange={balanceExchange}
                isReordering={false}
                onSelect={setSelectedAccount}
                selectedAccount={selectedAccount}
                showFirstSeparator={false}
                showCheckOnSelected={true}
              />
            </main>

            <Button
              className="py-3 w-[16rem]"
              type="submit"
              label={t('selectSourceAccount')}
              disabled={selectedAccount ? false : true}
              onClick={selectAccount}
            />
          </section>
        </Fragment>
      )}
    </EndModalLayout>
  )
}
