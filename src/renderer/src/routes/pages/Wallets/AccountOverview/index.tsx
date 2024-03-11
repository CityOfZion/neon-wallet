import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TbStepInto, TbStepOut } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import { BalanceChart } from '@renderer/components/BalanceChartPanel/BalanceChart'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'

export const AccountOverview = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'wallets' })
  const navigate = useNavigate()
  const { address } = useParams()
  const { accounts } = useAccountsSelector()
  const account = useMemo(() => accounts.find(account => account.address === address), [accounts, address])

  const balanceExchange = useBalancesAndExchange(account ? [account] : [])

  const formattedTotalTokensBalances = useMemo(
    () =>
      FilterHelper.currency(
        BalanceHelper.calculateTotalBalances(balanceExchange.balance.data, balanceExchange.exchange.data)
      ),
    [balanceExchange.balance.data, balanceExchange.exchange.data]
  )

  return (
    <div className="w-full flex flex-col h-full py-3 min-h-[12.5rem] px-4 min-w-0">
      <div className="flex justify-between items-center text-sm mb-3 h-11">
        <h1 className="text-white text-sm">{t('accountOverview')}</h1>

        {account && account?.accountType !== 'watch' && (
          <div>
            <Button
              leftIcon={<TbStepInto className="text-neon w-5 h-5" />}
              label={t('receive')}
              className="w-fit h-9"
              variant="text"
              colorSchema="neon"
              clickableProps={{ className: 'text-xs' }}
              onClick={() => navigate('/receive', { state: { account: account } })}
            />
            <Button
              leftIcon={<TbStepOut className="text-neon w-5 h-5" />}
              label={t('send')}
              className="w-fit h-9"
              variant="text"
              colorSchema="neon"
              clickableProps={{ className: 'text-xs' }}
              onClick={() => navigate('/send', { state: { account: account } })}
            />
          </div>
        )}
      </div>

      <Separator />

      <ul className="flex flex-col h-full items-center justify-center w-full">
        <div className="flex justify-between items-center w-full text-sm mb-3 px-2">
          <h1 className="text-gray-200">{t('holdings')}</h1>
          <div className="flex gap-2">
            <span className="text-gray-300">{t('balance')}</span>
            <span className=" text-white">{formattedTotalTokensBalances}</span>
          </div>
        </div>
        <BalanceChart balanceExchange={balanceExchange} />
      </ul>
    </div>
  )
}
