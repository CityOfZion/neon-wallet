import { ComponentProps, ReactNode, useMemo } from 'react'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { AccountIcon } from './AccountIcon'
import { Tooltip } from './Tooltip'

type TProps = {
  rightComponent?: ReactNode
  balanceExchange: UseMultipleBalanceAndExchangeResult
  account: IAccountState
  noHover?: boolean
} & ComponentProps<'div'>

export const AccountCard = ({
  balanceExchange,
  account,
  noHover = false,
  className,
  rightComponent,
  ...props
}: TProps) => {
  const totalTokensBalances = useMemo(
    () =>
      BalanceHelper.calculateTotalBalances(balanceExchange.balance.data, balanceExchange.exchange.data, [
        account.address,
      ]),
    [balanceExchange, account]
  )

  const formattedTotalTokensBalances = useMemo(() => FilterHelper.currency(totalTokensBalances), [totalTokensBalances])

  return (
    <div
      className={StyleHelper.mergeStyles(
        'flex items-center gap-x-1 text-on-surface py-2 pr-3 pl-2 border-l-4 border-l-transparent cursor-pointer',
        {
          'transition-colors hover:border-l-neon hover:bg-gray-900/50': !noHover,
        },
        className
      )}
      {...props}
    >
      <AccountIcon account={account} />

      <div className="flex justify-between items-center flex-grow min-w-0 gap-x-1">
        <div className="flex flex-col flex-grow min-w-0">
          <p className="text-xs text-gray-100">{account.name}</p>

          <Tooltip title={formattedTotalTokensBalances}>
            <span className="block w-fit max-w-full text-sm text-white truncate">{formattedTotalTokensBalances}</span>
          </Tooltip>
        </div>
        {rightComponent ?? (
          <div className="flex flex-col justify-between">
            {/* TODO: REPLACE THE MOCKED DATA WHEN THERE IS A SOLUTION FOR BALANCE VARIATION. Task link:
            https://app.clickup.com/t/86a197p77 */}
            <p className="text-xs text-gray-100">24h</p>
            <span className="text-sm text-neon">+5%</span>
          </div>
        )}
      </div>
    </div>
  )
}
