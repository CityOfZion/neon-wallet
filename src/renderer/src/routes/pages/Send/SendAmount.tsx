import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TbChevronRight } from 'react-icons/tb'
import { VscCircleFilled } from 'react-icons/vsc'
import { TokenBalance } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TAmountParams = {
  selectedAccount?: IAccountState | null
  selectedToken?: TokenBalance | null
  selectedAmount: number
  onSelectAmount?: (amount: number) => void
  active: boolean
}

export const SendAmount = ({
  selectedAccount,
  selectedToken,
  selectedAmount,
  onSelectAmount,
  active,
}: TAmountParams) => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })
  const { modalNavigateWrapper } = useModalNavigate()
  const balanceExchange = useBalancesAndExchange(selectedAccount ? [selectedAccount] : [])

  const estimatedFee = useMemo(() => {
    if (!selectedToken || !selectedAmount) return FilterHelper.currency(0)

    const pricePerToken = BalanceHelper.getExchangeRatio(
      selectedToken.token.hash,
      selectedToken.blockchain,
      balanceExchange.exchange.data
    )

    return FilterHelper.currency(selectedAmount * pricePerToken)
  }, [selectedToken, selectedAmount, balanceExchange])

  return (
    <div>
      <div className="flex justify-between my-1">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center">
            <VscCircleFilled className="text-gray-300 w-2 h-2" />
          </div>

          <span
            className={StyleHelper.mergeStyles({
              'font-bold': active,
            })}
          >
            {t('amount')}
          </span>
        </div>
        <Button
          className="flex items-center"
          disabled={!selectedToken}
          onClick={modalNavigateWrapper('input-amount', {
            state: {
              balanceExchange: balanceExchange,
              selectedToken: selectedToken,
              onSelectAmount: onSelectAmount,
            },
          })}
          clickableProps={{
            className: 'text-sm pl-3 pr-1',
          }}
          variant="text"
          colorSchema={active ? 'neon' : 'white'}
          label={selectedAmount > 0 ? selectedAmount.toString() : t('inputAmount')}
          rightIcon={<TbChevronRight />}
          flat
        />
      </div>

      <div className="flex justify-between p-3 pt-0">
        <span className="text-gray-100 ml-5 italic">{t('fiatValue')}</span>
        <span className="text-gray-100 mr-5">{estimatedFee}</span>
      </div>
    </div>
  )
}
