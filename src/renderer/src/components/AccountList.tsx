import { Fragment, useEffect, useMemo, useState } from 'react'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IAccountState, IWalletState } from '@renderer/@types/store'
import { AccountCard } from '@renderer/components/AccountCard'
import { Separator } from '@renderer/components/Separator'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useAccountsByWalletIdSelector } from '@renderer/hooks/useAccountSelector'

type TProps = {
  onSelect: (account: IAccountState) => void
  selectedAccount?: IAccountState | undefined
  selectedWallet: IWalletState
  balanceExchange: UseMultipleBalanceAndExchangeResult
  showFirstSeparator?: boolean
  showCheckOnSelected?: boolean
  className?: string
}

type TAccountItemProps = {
  account: IAccountState
  balanceExchange: UseMultipleBalanceAndExchangeResult
  active?: boolean
  onClick?: () => void
  showSeparator: boolean
  showCheckOnSelected: boolean
}

const AccountItem = ({
  account,
  balanceExchange,
  onClick,
  active,
  showSeparator,
  showCheckOnSelected,
}: TAccountItemProps) => {
  return (
    <Fragment>
      {showSeparator && <Separator className="min-h-[0.0625rem]" />}
      <li>
        <AccountCard
          account={account}
          balanceExchange={balanceExchange}
          onClick={onClick}
          active={active}
          showCheckOnSelected={showCheckOnSelected}
        />
      </li>
    </Fragment>
  )
}

export const AccountList = ({
  selectedWallet,
  selectedAccount,
  balanceExchange,
  onSelect,
  showFirstSeparator = true,
  showCheckOnSelected = false,
  className,
}: TProps) => {
  const { accountsByWalletId } = useAccountsByWalletIdSelector(selectedWallet.id)
  const orderedAccountsAddresses = useMemo(() => {
    return UtilsHelper.orderBy(accountsByWalletId, 'order', 'asc').map(account => account.address)
  }, [accountsByWalletId])

  const [items, setItems] = useState<string[]>([])
  const itemsAccounts = useMemo(() => {
    return UtilsHelper.mapFiltered(items, item => accountsByWalletId.find(account => account.address === item))
  }, [accountsByWalletId, items])

  useEffect(() => {
    setItems(orderedAccountsAddresses)
  }, [orderedAccountsAddresses])

  return (
    <ul className={className}>
      {itemsAccounts.map((account, index) => (
        <AccountItem
          key={account?.address}
          onClick={() => onSelect(account)}
          account={account}
          balanceExchange={balanceExchange}
          active={account?.address === selectedAccount?.address}
          showSeparator={showFirstSeparator || index !== 0}
          showCheckOnSelected={showCheckOnSelected}
        />
      ))}
    </ul>
  )
}
