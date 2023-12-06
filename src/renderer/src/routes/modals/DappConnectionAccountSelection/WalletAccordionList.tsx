import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdAccountBalanceWallet, MdExpandMore } from 'react-icons/md'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IAccountState, IWalletState } from '@renderer/@types/store'
import { Checkbox } from '@renderer/components/Checkbox'
import { IconButton } from '@renderer/components/IconButton'
import { Separator } from '@renderer/components/Separator'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'

type TWalletAccordionListProps = {
  wallets: IWalletState[]
  accounts: IAccountState[]
  balanceExchange: UseMultipleBalanceAndExchangeResult
  onSelect?(account: IAccountState): void
  onDeselect?(account: IAccountState): void
  acceptedBlockchains?: TBlockchainServiceKey[]
  selectedAccounts: IAccountState[]
}

type TWalletAccordionProps = {
  wallet: IWalletState
  accounts: IAccountState[]
  balanceExchange: UseMultipleBalanceAndExchangeResult
  onSelect?(account: IAccountState): void
  onDeselect?(account: IAccountState): void
  acceptedBlockchains?: TBlockchainServiceKey[]
  selectedAccounts: IAccountState[]
}

type TWalletAccordionAccountProps = {
  account: IAccountState
  balanceExchange: UseMultipleBalanceAndExchangeResult
  onSelect?(): void
  onDeselect?(): void
  acceptedBlockchains?: TBlockchainServiceKey[]
  isSelected?: boolean
}

const WalletAccordionAccount = ({
  account,
  balanceExchange,
  onSelect,
  onDeselect,
  acceptedBlockchains,
  isSelected = false,
}: TWalletAccordionAccountProps) => {
  const totalTokensBalances = useMemo(
    () =>
      BalanceHelper.calculateTotalBalances(balanceExchange.balance.data, balanceExchange.exchange.data, [
        account.address,
      ]),
    [balanceExchange, account]
  )

  const formattedTotalTokensBalances = useMemo(() => FilterHelper.currency(totalTokensBalances), [totalTokensBalances])

  const handleClick = () => {
    if (isSelected) {
      onDeselect?.()
      return
    }

    onSelect?.()
  }

  return (
    <li className="flex justify-between px-1.5 py-3">
      <div className="flex gap-x-2.5">
        <div className="w-6 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gray-300/30" />
        </div>

        <span className="text-white">{account.name}</span>
      </div>

      <div className="flex gap-x-2.5 mr-1">
        <span className="mr-1">{formattedTotalTokensBalances}</span>

        <Checkbox
          checked={isSelected}
          onClick={handleClick}
          disabled={acceptedBlockchains ? !acceptedBlockchains.includes(account.blockchain) : false}
        />
      </div>
    </li>
  )
}

const WalletAccordion = ({
  accounts,
  balanceExchange,
  wallet,
  onSelect,
  acceptedBlockchains,
  selectedAccounts,
  onDeselect,
}: TWalletAccordionProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'walletAccordionList' })
  const totalTokensBalances = useMemo(
    () =>
      BalanceHelper.calculateTotalBalances(
        balanceExchange.balance.data,
        balanceExchange.exchange.data,
        accounts.map(account => account.address)
      ),
    [balanceExchange, accounts]
  )

  const formattedTotalTokensBalances = useMemo(() => FilterHelper.currency(totalTokensBalances), [totalTokensBalances])

  return (
    <RadixAccordion.Item className="text-sm text-gray-300 w-full" value={wallet.id}>
      <div className="flex justify-between  p-1.5 bg-gray-900 rounded">
        <div className="flex gap-x-2.5 items-center">
          <MdAccountBalanceWallet className="w-6 h-6 fill-blue" />

          <span>{wallet.name}</span>
        </div>

        <div className="flex items-center gap-x-2.5">
          <span>{formattedTotalTokensBalances}</span>

          <RadixAccordion.Trigger asChild>
            <IconButton
              className="px-0.5 py-0.5 group"
              icon={<MdExpandMore className="group-data-[state=open]:rotate-180 transition-transform" />}
              size="md"
            />
          </RadixAccordion.Trigger>
        </div>
      </div>

      <RadixAccordion.Content asChild>
        <ul className="w-full">
          {accounts.length > 0 ? (
            accounts.map((account, index) => (
              <Fragment key={account.address}>
                <WalletAccordionAccount
                  account={account}
                  balanceExchange={balanceExchange}
                  onSelect={() => onSelect?.(account)}
                  acceptedBlockchains={acceptedBlockchains}
                  isSelected={selectedAccounts.some(selectedAccount => selectedAccount.address === account.address)}
                  onDeselect={() => onDeselect?.(account)}
                />

                {accounts.length !== index + 1 && <Separator />}
              </Fragment>
            ))
          ) : (
            <span className="text-center w-full block py-3">{t('noAccounts')}</span>
          )}
        </ul>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  )
}

export const WalletAccordionList = ({
  accounts,
  balanceExchange,
  wallets,
  onSelect,
  acceptedBlockchains,
  selectedAccounts,
  onDeselect,
}: TWalletAccordionListProps) => {
  const [maxHeight, setMaxHeight] = useState<number>()

  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) return

    const { height } = ref.current.getBoundingClientRect()
    setMaxHeight(height)
  }, [])

  return (
    <RadixAccordion.Root
      ref={ref}
      className="w-full h-full overflow-y-auto flex flex-col gap-y-2.5"
      style={{
        maxHeight,
      }}
      type="multiple"
    >
      {wallets.map(wallet => (
        <WalletAccordion
          key={wallet.id}
          wallet={wallet}
          accounts={accounts.filter(account => account.idWallet === wallet.id)}
          balanceExchange={balanceExchange}
          onSelect={onSelect}
          acceptedBlockchains={acceptedBlockchains}
          selectedAccounts={selectedAccounts}
          onDeselect={onDeselect}
        />
      ))}
    </RadixAccordion.Root>
  )
}
