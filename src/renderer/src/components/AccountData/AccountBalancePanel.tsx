import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { BalanceChart } from '@renderer/components/BalanceChart'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'

import { Separator } from '../Separator'

type TAccountBalancePanelProps = {
  balanceExchange: UseMultipleBalanceAndExchangeResult
  hideWalletAccountsLength?: boolean
}

export const AccountBalancePanel = ({
  balanceExchange,
  hideWalletAccountsLength,
}: TAccountBalancePanelProps): JSX.Element => {
  const { t } = useTranslation('components', { keyPrefix: 'accountBalancePanel' })
  const { wallets } = useWalletsSelector()
  const { accounts } = useAccountsSelector()

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
    <div className="w-full flex bg-gray-800 rounded flex-grow flex-col drop-shadow-lg pb-4 pr-7">
      <div className="flex justify-between">
        <div className="flex items-end">
          <h1 className="flex items-end text-white m-4">{t('holdings')}</h1>
          {!hideWalletAccountsLength && (
            <span className="m-4 text-gray-300 text-sm">
              {t('walletsAndAccounts', { wallets: wallets.length, accounts: accounts.length })}
            </span>
          )}
        </div>
        <div className="flex items-end">
          <span className="my-4 text-gray-300 text-sm font-normal mr-3">{t('totalValue')}</span>
          <h1 className="flex items-end text-white text-sm font-normal my-4 mr-4">{formattedTotalTokensBalances}</h1>
        </div>
      </div>
      <Separator className="mx-4" />
      <div className="flex w-full justify-center">
        <div className="flex flex-col mx-20 w-full items-center mt-4">
          <BalanceChart balanceExchange={balanceExchange} />
        </div>
      </div>
    </div>
  )
}
