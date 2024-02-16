import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Balance, TokenBalance, UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { SortIcon } from '../SortIcon'

type TProps = {
  onTokenSelected?: (token: TokenBalance | null) => void
  balanceExchange: UseMultipleBalanceAndExchangeResult
}

export const AdvancedTokenBalanceList = ({ onTokenSelected, balanceExchange }: TProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'portfolioTokenBalanceList' })
  const [selectedToken, setSelectedToken] = useState<TokenBalance | null>(null)
  const [sortTicker, setSortTicker] = useState<boolean | null>(null)
  const [sortToken, setSortToken] = useState<boolean | null>(null)
  const [sortHolding, setSortHolding] = useState<boolean | null>(null)
  const [sortPrice, setSortPrice] = useState<boolean | null>(null)
  const [sortValue, setSortValue] = useState<boolean | null>(null)

  const filteredTokenBalance = useMemo(() => {
    const groupedTokens = new Map()
    balanceExchange.balance.data.forEach((balance: Balance) => {
      balance.tokensBalances.forEach((token: TokenBalance) => {
        if (token.amountNumber > 0) {
          if (!groupedTokens.has(token.token.hash)) {
            groupedTokens.set(token.token.hash, token)
            groupedTokens.get(token.token.hash).exchangeRatio = BalanceHelper.getExchangeRatio(
              token.token.hash,
              token.blockchain,
              balanceExchange.exchange.data
            )
          } else {
            groupedTokens.get(token.token.hash).amountNumber += token.amountNumber
            groupedTokens.get(token.token.hash).amount = token.amountNumber.toFixed(token.token.decimals)
          }
          groupedTokens.get(token.token.hash).balanceConvertedAmount = BalanceHelper.convertBalanceToCurrency(
            token,
            balanceExchange.exchange.data
          )?.convertedAmount
        }
      })
    })
    if (sortTicker !== null) {
      return Array.from(groupedTokens.values()).sort((a, b) =>
        sortTicker ? a.token.symbol.localeCompare(b.token.symbol) : b.token.symbol.localeCompare(a.token.symbol)
      )
    }
    if (sortToken !== null) {
      return Array.from(groupedTokens.values()).sort((a, b) =>
        sortToken ? a.token.name.localeCompare(b.token.name) : b.token.name.localeCompare(a.token.name)
      )
    }
    if (sortHolding !== null) {
      return Array.from(groupedTokens.values()).sort((a, b) =>
        sortHolding ? a.amountNumber - b.amountNumber : b.amountNumber - a.amountNumber
      )
    }
    if (sortPrice !== null) {
      return Array.from(groupedTokens.values()).sort((a, b) =>
        sortPrice ? a.exchangeRatio - b.exchangeRatio : b.exchangeRatio - a.exchangeRatio
      )
    }
    if (sortValue !== null) {
      return Array.from(groupedTokens.values()).sort((a, b) =>
        sortValue
          ? a.balanceConvertedAmount - b.balanceConvertedAmount
          : b.balanceConvertedAmount - a.balanceConvertedAmount
      )
    }
    return Array.from(groupedTokens.values())
  }, [
    balanceExchange.balance.data,
    balanceExchange.exchange.data,
    sortHolding,
    sortPrice,
    sortTicker,
    sortToken,
    sortValue,
  ])

  const isTokenSelected = (tokenBalance: TokenBalance) => {
    if (!selectedToken) return

    return (
      selectedToken.blockchain === tokenBalance.blockchain &&
      selectedToken.amount === tokenBalance.amount &&
      selectedToken.token === tokenBalance.token
    )
  }

  const handleTokenSelect = (tokenBalance: TokenBalance) => {
    if (selectedToken && selectedToken === tokenBalance) {
      setSelectedToken(null)
    } else {
      setSelectedToken(tokenBalance)
    }
    if (onTokenSelected) {
      onTokenSelected(tokenBalance)
    }
  }

  const changeTickerSort = () => {
    setSortToken(null)
    setSortHolding(null)
    setSortPrice(null)
    setSortValue(null)

    if (sortTicker === null) {
      setSortTicker(true)
    } else if (sortTicker) {
      setSortTicker(false)
    } else {
      setSortTicker(null)
    }
  }

  const changeTokenSort = () => {
    setSortTicker(null)
    setSortHolding(null)
    setSortPrice(null)
    setSortValue(null)
    if (sortToken === null) {
      setSortToken(true)
    } else if (sortToken) {
      setSortToken(false)
    } else {
      setSortToken(null)
    }
  }

  const changeHoldingSort = () => {
    setSortTicker(null)
    setSortToken(null)
    setSortPrice(null)
    setSortValue(null)
    if (sortHolding === null) {
      setSortHolding(true)
    } else if (sortHolding) {
      setSortHolding(false)
    } else {
      setSortHolding(null)
    }
  }

  const changePriceSort = () => {
    setSortTicker(null)
    setSortToken(null)
    setSortHolding(null)
    setSortValue(null)
    if (sortPrice === null) {
      setSortPrice(true)
    } else if (sortPrice) {
      setSortPrice(false)
    } else {
      setSortPrice(null)
    }
  }

  const changeValueSort = () => {
    setSortTicker(null)
    setSortToken(null)
    setSortHolding(null)
    setSortPrice(null)
    if (sortValue === null) {
      setSortValue(true)
    } else if (sortValue) {
      setSortValue(false)
    } else {
      setSortValue(null)
    }
  }

  return (
    <section className="w-full overflow-y-auto flex flex-col basis-0 flex-grow text-xs">
      <table>
        <thead>
          <tr className="text-gray-100 text-left text-opacity-60 h-[2.2rem]">
            <th className="w-1/5 pl-5">
              <button className="flex items-center gap-2" type="button" onClick={() => changeTickerSort()}>
                {t('ticker')}
                <SortIcon selected={sortTicker} />
              </button>
            </th>
            <th className="w-1/5">
              <button className="flex items-center gap-2" type="button" onClick={() => changeTokenSort()}>
                {t('token')}
                <SortIcon selected={sortToken} />
              </button>
            </th>
            <th className="w-1/5">
              <button className="flex items-center gap-2" type="button" onClick={() => changeHoldingSort()}>
                {t('holdings')}
                <SortIcon selected={sortHolding} />
              </button>
            </th>
            <th className="w-1/5">
              <button className="flex items-center gap-2" type="button" onClick={() => changePriceSort()}>
                {t('price')}
                <SortIcon selected={sortPrice} />
              </button>
            </th>
            <th className="w-1/5">
              <button className="flex items-center gap-2" type="button" onClick={() => changeValueSort()}>
                {t('value')}
                <SortIcon selected={sortValue} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTokenBalance.map((tokenBalance, index) => {
            return (
              <tr
                key={index}
                onClick={() => handleTokenSelect(tokenBalance)}
                className={StyleHelper.mergeStyles(
                  'h-[2.2rem] border-l-4 border-transparent hover:cursor-pointer hover:bg-gray-900 hover:border-neon',
                  {
                    'bg-gray-300 bg-opacity-15': !isTokenSelected(tokenBalance) && index % 2 === 0,
                    'bg-gray-900 border-neon': isTokenSelected(tokenBalance),
                  }
                )}
              >
                <td>
                  <div className="flex pl-4">
                    <div className="rounded-lg bg-gray-300 w-4.5 h-4.5 flex justify-center items-center">
                      <BlockchainIcon blockchain={tokenBalance.blockchain} type="white" className="w-2.5 h-2.5" />
                    </div>
                    <span className="pl-2">{tokenBalance.token.symbol}</span>
                  </div>
                </td>
                <td>{tokenBalance.token.name}</td>
                <td>{tokenBalance.amount}</td>
                <td>{FilterHelper.currency(tokenBalance.exchangeRatio)}</td>
                <td>{FilterHelper.currency(tokenBalance.balanceConvertedAmount)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
