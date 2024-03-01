import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IAccountState, IWalletState } from '@renderer/@types/store'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'

import { Separator } from '../Separator'

import { BalanceChart } from './BalanceChart'

type TProps = {
  balanceExchange: UseMultipleBalanceAndExchangeResult
  accounts?: IAccountState[]
  wallets?: IWalletState[]
  hideWalletAccountsLength?: boolean
}

export const BalanceChartPanel = ({ balanceExchange, accounts, wallets }: TProps): JSX.Element => {
  const { t } = useTranslation('components', { keyPrefix: 'balanceChartPanel' })

  const formattedTotalTokensBalances = useMemo(
    () =>
      FilterHelper.currency(
        BalanceHelper.calculateTotalBalances(balanceExchange.balance.data, balanceExchange.exchange.data)
      ),
    [balanceExchange.balance.data, balanceExchange.exchange.data]
  )
  return (
    <div className="w-full flex flex-col h-min bg-gray-800 rounded shadow-lg py-3 min-h-[12.5rem] px-4 min-w-0">
      <div className="flex justify-between text-sm mb-3">
        <div className="flex gap-5">
          <h1 className="text-white">{t('holdings')}</h1>

          {wallets && accounts && (
            <span className="text-gray-300">
              {t('walletsAndAccounts', { wallets: wallets.length, accounts: accounts.length })}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <span className="text-gray-300">{t('totalValue')}</span>
          <span className=" text-white">{formattedTotalTokensBalances}</span>
        </div>
      </div>

      <Separator />

      <ul className="flex h-full items-center px-20">
        <BalanceChart balanceExchange={balanceExchange} />
      </ul>
    </div>
  )
}
