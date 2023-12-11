import { ChangeEventHandler, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbLink, TbPlug } from 'react-icons/tb'
import { TSessionProposal } from '@cityofzion/wallet-connect-sdk-wallet-core'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { SearchInput } from '@renderer/components/SearchInput'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'
import { EndModalLayout } from '@renderer/layouts/EndModal'

import { WalletAccordionList } from './WalletAccordionList'

type TState = {
  onSelectionFinish?: (account: IAccountState) => void
  proposal: TSessionProposal
}

export const DappConnectionAccountSelectionModal = () => {
  const { onSelectionFinish, proposal } = useModalState<TState>()
  const { modalNavigate } = useModalNavigate()
  const { t } = useTranslation('modals', { keyPrefix: 'dappConnectionAccountSelection' })

  const { wallets } = useWalletsSelector()
  const { accounts } = useAccountsSelector()
  const balanceExchange = useBalancesAndExchange(accounts)

  const [selectedAccount, setSelectedAccount] = useState<IAccountState>()
  const [search, setSearch] = useState<string>('')

  const filteredAccounts = useMemo(() => {
    if (search) {
      return accounts.filter(account => account.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }

    return accounts
  }, [search, accounts])

  const acceptedBlockchains = useMemo(() => {
    return Object.keys(proposal.params.requiredNamespaces) as TBlockchainServiceKey[]
  }, [proposal])

  const handleSelect = (account: IAccountState) => {
    setSelectedAccount(account)
  }

  const handleDeselect = () => {
    setSelectedAccount(undefined)
  }

  const handleClick = () => {
    if (!selectedAccount) return

    onSelectionFinish?.(selectedAccount)
    modalNavigate(-1)
  }

  const handleChangeSearch: ChangeEventHandler<HTMLInputElement> = event => {
    const value = event.target.value
    setSearch(value)
  }

  return (
    <EndModalLayout headingIcon={<TbPlug />} heading={t('title')} contentClassName="flex flex-col">
      <SearchInput compacted value={search} onChange={handleChangeSearch} />

      <div className="my-7 flex-grow flex flex-col">
        <p className="text-sm text-gray-100 mb-4">{t('description')}</p>

        <WalletAccordionList
          accounts={filteredAccounts}
          wallets={wallets}
          balanceExchange={balanceExchange}
          acceptedBlockchains={acceptedBlockchains}
          onSelect={handleSelect}
          onDeselect={handleDeselect}
          selectedAccounts={selectedAccount ? [selectedAccount] : []}
        />
      </div>

      <Button
        leftIcon={<TbLink />}
        label="Confirm connection"
        className="w-full px-6"
        flat
        onClick={handleClick}
        disabled={!selectedAccount}
      />
    </EndModalLayout>
  )
}
