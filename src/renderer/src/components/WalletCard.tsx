import { useMemo } from 'react'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IWalletState } from '@renderer/@types/store'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useAccountsByWalletIdSelector } from '@renderer/hooks/useAccountSelector'

import { WalletIcon } from './WalletIcon'

type TProps = {
  alwaysActive?: boolean
  balanceExchange: UseMultipleBalanceAndExchangeResult
  wallet: IWalletState
  iconWithAccounts?: boolean
}

export const WalletCard = ({ alwaysActive = false, balanceExchange, wallet, iconWithAccounts }: TProps) => {
  const { accountsByWalletId } = useAccountsByWalletIdSelector(wallet.id)

  const totalTokensBalances = useMemo(
    () =>
      BalanceHelper.calculateTotalBalances(
        balanceExchange.balance.data,
        balanceExchange.exchange.data,
        accountsByWalletId.map(account => account.address)
      ),
    [balanceExchange, accountsByWalletId]
  )

  const formattedTotalTokensBalances = useMemo(() => FilterHelper.currency(totalTokensBalances), [totalTokensBalances])

  return (
    <div
      className={StyleHelper.mergeStyles('flex items-center gap-x-1 text-on-surface py-2 pr-3 pl-2 border-l-4', {
        'border-l-neon bg-gray-900/50': alwaysActive,
        'transition-colors border-l-transparent hover:border-l-neon hover:bg-gray-900/50 cursor-pointer ':
          !alwaysActive,
      })}
    >
      <WalletIcon wallet={wallet} withAccounts={iconWithAccounts} />

      <div className="flex justify-between flex-grow">
        <div className="flex flex-col flex-grow">
          <p className="text-xs text-gray-100">{wallet.name}</p>
          <span className="text-sm text-white">{formattedTotalTokensBalances}</span>
        </div>

        <div className="flex flex-col justify-between">
          {/* TODO: REPLACE THE MOCKED DATA WHEN THERE IS A SOLUTION FOR BALANCE VARIATION. Task link: https://app.clickup.com/t/86a197p77 */}
          <p className="text-xs text-gray-100">24h</p>
          <span className="text-sm text-neon">+5%</span>
        </div>
      </div>
    </div>
  )
}
