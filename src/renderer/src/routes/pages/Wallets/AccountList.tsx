import { Fragment, useMemo } from 'react'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IAccountState, IWalletState } from '@renderer/@types/store'
import { AccountIcon } from '@renderer/components/AccountIcon'
import { Separator } from '@renderer/components/Separator'
import { Tooltip } from '@renderer/components/Tooltip'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useAccountsByWalletIdSelector } from '@renderer/hooks/useAccountSelector'

type TProps = {
  onSelect: (account: IAccountState) => void
  selectedAccount?: IAccountState | undefined
  selectedWallet: IWalletState
  balanceExchange: UseMultipleBalanceAndExchangeResult
}

type TAccountItemProps = {
  account: IAccountState
  balanceExchange: UseMultipleBalanceAndExchangeResult
  active?: boolean
  onClick?: () => void
}

const AccountItem = ({ account, balanceExchange, onClick, active }: TAccountItemProps) => {
  const totalTokensBalances = useMemo(
    () =>
      BalanceHelper.calculateTotalBalances(balanceExchange.balance.data, balanceExchange.exchange.data, [
        account.address,
      ]),
    [balanceExchange, account]
  )

  const formattedTotalTokensBalances = useMemo(() => FilterHelper.currency(totalTokensBalances), [totalTokensBalances])

  return (
    <li>
      <button
        onClick={onClick}
        aria-selected={active}
        className={
          'flex w-full min-w-0 items-center gap-x-1 py-2 pr-3 pl-2 border-l-4 border-l-transparent cursor-pointer transition-colors hover:border-l-neon hover:bg-gray-900/50 aria-selected:border-l-neon aria-selected:bg-gray-900/50'
        }
      >
        <AccountIcon account={account} />

        <div className="flex flex-col flex-grow  min-w-0 gap-x-2">
          <p className="text-xs text-white truncate text-left">{account.name}</p>

          <Tooltip title={formattedTotalTokensBalances}>
            <span className="block text-xs text-gray-100 text-left truncate">{formattedTotalTokensBalances}</span>
          </Tooltip>
        </div>
      </button>
    </li>
  )
}

export const AccountList = ({ selectedWallet, selectedAccount, balanceExchange, onSelect }: TProps) => {
  const { accountsByWalletId } = useAccountsByWalletIdSelector(selectedWallet.id)

  const orderedAccounts = UtilsHelper.orderBy(accountsByWalletId, 'order', 'asc')

  return (
    <ul className="flex flex-grow flex-col min-h-0 min-w-0 w-full overflow-y-auto">
      {orderedAccounts.map((account, index) => (
        <Fragment key={account?.address}>
          <AccountItem
            onClick={() => onSelect(account)}
            account={account}
            balanceExchange={balanceExchange}
            active={account?.address === selectedAccount?.address}
          />

          {index + 1 !== orderedAccounts.length && <Separator />}
        </Fragment>
      ))}
    </ul>
  )
}
