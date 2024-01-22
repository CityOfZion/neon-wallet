import { Fragment } from 'react'
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

  const calculateEstimatedFiatValue = (amount: number) => {
    if (selectedToken) {
      const pricePerToken = BalanceHelper.getExchangeRatio(
        selectedToken.token.hash,
        selectedToken.blockchain,
        balanceExchange.exchange.data
      )

      return FilterHelper.currency(amount * pricePerToken)
    }
    return FilterHelper.currency(0)
  }

  return (
    <Fragment>
      <div className="flex justify-between h-6 pt-4 p-3">
        <div className="flex items-center">
          <VscCircleFilled className="text-gray-300 w-2 h-2 mr-[1.09rem] ml-[0.65rem]" />
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
            className: selectedToken
              ? 'hover:bg-gray-300/15 hover:rounded pr-1 pr-1 aria-[disabled=true]:text-gray-100'
              : 'pr-1 aria-[disabled=true]:text-gray-100',
          }}
          variant="text"
          colorSchema={selectedAmount > 0 ? 'white' : active ? 'neon' : 'gray'}
          label={selectedAmount > 0 ? selectedAmount.toString() : t('inputAmount')}
          rightIcon={<TbChevronRight />}
          flat
        />
      </div>
      <div className="flex justify-between h-11 p-3">
        <span className="text-gray-100 pl-9 italic">{t('fiatValue')}</span>
        <span className="text-gray-100 mr-8">{calculateEstimatedFiatValue(selectedAmount)}</span>
      </div>
    </Fragment>
  )
}
