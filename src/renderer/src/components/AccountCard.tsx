import { ComponentProps, ReactNode, useMemo } from 'react'
import { TbCheck } from 'react-icons/tb'
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
  active?: boolean
  showCheckOnSelected: boolean
} & ComponentProps<'div'>

export const AccountCard = ({
  balanceExchange,
  account,
  noHover = false,
  className,
  rightComponent,
  active = false,
  showCheckOnSelected,
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
          'transition-colors border-l-neon bg-gray-900/50': active,
        },
        className
      )}
      {...props}
    >
      <AccountIcon account={account} />

      <div className="flex justify-between items-center flex-grow min-w-0 gap-x-2">
        <div className="flex flex-col flex-grow min-w-0">
          <p className="text-xs text-gray-100 truncate">{account.name}</p>

          <Tooltip title={formattedTotalTokensBalances}>
            <span className="block w-fit max-w-full text-sm text-white truncate">{formattedTotalTokensBalances}</span>
          </Tooltip>
        </div>
        {(!showCheckOnSelected && rightComponent) ?? (
          <div className="flex flex-col justify-between">
            {/* TODO: REPLACE THE MOCKED DATA WHEN THERE IS A SOLUTION FOR BALANCE VARIATION. Task link:
            https://app.clickup.com/t/86a197p77 */}
            <p className="text-xs text-gray-100">24h</p>
            <span className="text-sm text-neon">+5%</span>
          </div>
        )}
        {showCheckOnSelected && active && <TbCheck className="text-neon h-4 w-4 mr-3" />}
      </div>
    </div>
  )
}
