import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { StringHelper } from '@renderer/helpers/StringHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'

export const TokenBalanceList = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })
  const { accounts } = useAccountsSelector()
  const balanceExchange = useBalancesAndExchange(accounts)
  let rowCount = 0

  return (
    <section className="overflow-y-auto flex flex-col basis-0 flex-grow">
      <table className="text-left my-2">
        <thead>
          <tr className="text-gray-100 text-opacity-60">
            <th className="w-1/3 pl-4 py-2">{t('token')}</th>
            <th className="w-1/3">{t('quantity')}</th>
            <th className="w-1/3">{t('price')}</th>
          </tr>
        </thead>
        <tbody>
          {balanceExchange.balance.data.map(balance => {
            return (
              <Fragment key={balance.address}>
                {balance.tokensBalances.map((tokenBalance, innerIndex) => {
                  if (tokenBalance.amountNumber > 0) {
                    const isGrayBackground = rowCount % 2 !== 0
                    rowCount++
                    return (
                      <tr
                        key={innerIndex}
                        className={(() => {
                          return StyleHelper.mergeStyles('h-[2.2rem]', {
                            'bg-gray-300 bg-opacity-15': isGrayBackground,
                          })
                        })()}
                      >
                        <td>
                          <div className="flex pl-4">
                            <div className="rounded-lg bg-gray-300 w-4.5 h-4.5 flex justify-center items-center">
                              <BlockchainIcon
                                blockchain={tokenBalance.blockchain}
                                type="white"
                                className="w-2.5 h-2.5"
                              />
                            </div>
                            <span className="pl-2" title={tokenBalance.token.symbol}>
                              {StringHelper.truncateString(tokenBalance.token.symbol, 4)}
                            </span>
                          </div>
                        </td>
                        <td>
                          <span title={tokenBalance.amount}>{StringHelper.truncateString(tokenBalance.amount, 8)}</span>
                        </td>
                        <td>
                          {StringHelper.formatPrice(
                            BalanceHelper.convertBalanceToCurrency(tokenBalance, balanceExchange.exchange.data)
                              ?.convertedAmount
                          )}
                        </td>
                      </tr>
                    )
                  }
                  return null
                })}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
