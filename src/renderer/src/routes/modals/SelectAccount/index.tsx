import { Fragment, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdCheck } from 'react-icons/md'
import { IAccountState, IWalletState } from '@renderer/@types/store'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { Select } from '@renderer/components/Select'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocationState = {
  onSelectAccount: (contact: IAccountState) => void
  title: string
  buttonLabel: string
  leftIcon: JSX.Element
}

export const SelectAccount = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'selectAccount' })
  const { onSelectAccount, leftIcon, title, buttonLabel } = useModalState<TLocationState>()
  const { modalNavigate } = useModalNavigate()
  const { accounts } = useAccountsSelector()
  const { wallets } = useWalletsSelector()

  const [selectedWallet, setSelectedWallet] = useState<IWalletState | undefined>(undefined)
  const [selectedAccount, setSelectedAccount] = useState<IAccountState | undefined>(undefined)

  const walletAccounts = useMemo(() => {
    if (!selectedWallet) {
      return []
    }
    return accounts.filter(account => account.idWallet === selectedWallet.id)
  }, [selectedWallet, accounts])

  const handleSelectWallet = (id: string) => {
    const wallet = wallets.find(wallet => wallet.id === id)
    if (!wallet) return

    setSelectedWallet(wallet)
    setSelectedAccount(undefined)
  }

  const handleSelectAccount = (account: IAccountState) => {
    setSelectedAccount(account)
  }

  const handleSelectFinish = () => {
    if (!selectedAccount) {
      return
    }
    onSelectAccount(selectedAccount)
    modalNavigate(-1)
  }

  const filteredWallets = useMemo(() => {
    return wallets.filter(wallet => wallet.walletType !== 'watch')
  }, [wallets])

  return (
    <EndModalLayout heading={title} headingIcon={leftIcon} contentClassName="flex flex-col min-h-0">
      <Select.Root value={selectedWallet?.id} onValueChange={handleSelectWallet}>
        <Select.Trigger
          className={StyleHelper.mergeStyles('bg-asphalt', {
            'text-gray-300': !selectedWallet,
          })}
        >
          <Select.Value placeholder={t('placeholder')} />

          <Select.Icon className="text-neon" />
        </Select.Trigger>

        <Select.Content>
          {filteredWallets.map((wallet, index) => (
            <Fragment key={wallet.id}>
              <Select.Item
                value={wallet.id}
                className="hover:bg-gray-300/15 flex gap-x-2 items-center cursor-pointer justify-start text-gray-100 text-sm"
              >
                <Select.ItemText>{wallet.name}</Select.ItemText>
              </Select.Item>

              {index + 1 !== filteredWallets.length && <Select.Separator />}
            </Fragment>
          ))}
        </Select.Content>
      </Select.Root>

      {selectedWallet && (
        <section className="w-full flex flex-col flex-grow min-h-0 mt-5 items-center text-sm">
          <p className="text-left w-full pl-[0.2em]">{t('yourAccounts')}</p>

          <ul className="w-full mt-2 mb-5 h-full overflow-y-auto flex flex-col min-h-0">
            {walletAccounts.length <= 0 ? (
              <p className="mt-5 text-gray-300">{t('noAccounts')}</p>
            ) : (
              walletAccounts.map((account, index) => (
                <li key={account.address}>
                  <button
                    aria-selected={selectedAccount?.address === account.address}
                    className="flex items-center justify-between gap-x-4 p-2.5 pl-4 border-l-2 border-transparent cursor-pointer hover:border-l-neon hover:bg-asphalt aria-selected:bg-asphalt aria-selected:border-l-neon transition-colors w-full"
                    onClick={handleSelectAccount.bind(null, account)}
                  >
                    <div className="flex min-w-0 items-center gap-x-4">
                      <BlockchainIcon
                        blockchain={account.blockchain}
                        type="gray"
                        className="min-h-[1rem] min-w-[1rem]"
                      />
                      <span className="text-sm text-white truncate">{account.name}</span>
                    </div>

                    {selectedAccount?.address === account.address && (
                      <MdCheck className="text-neon w-5 h-5 min-h-[1.25rem] min-w-[1.25rem]" />
                    )}
                  </button>

                  {index + 1 !== walletAccounts.length && <Separator />}
                </li>
              ))
            )}
          </ul>

          <Button
            className="w-full px-5"
            type="submit"
            label={buttonLabel}
            disabled={!selectedAccount}
            onClick={handleSelectFinish}
          />
        </section>
      )}
    </EndModalLayout>
  )
}
