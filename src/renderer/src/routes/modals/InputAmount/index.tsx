import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbArrowBigDown, TbStepOut } from 'react-icons/tb'
import { TbAlertTriangle } from 'react-icons/tb'
import { TokenBalance, UseUniqueBalanceAndExchangeResult } from '@renderer/@types/query'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { BalanceHelper } from '@renderer/helpers/BalanceHelper'
import { FilterHelper } from '@renderer/helpers/FilterHelper'
import { StringHelper } from '@renderer/helpers/StringHelper'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TTokenState = {
  balanceExchange: UseUniqueBalanceAndExchangeResult
  selectedToken: TokenBalance
  onSelectAmount: (amount: number) => void
}

const parseNumberOrZero = (value: string): number => {
  return parseFloat(value) || 0
}

export const InputAmount = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'inputAmount' })
  const { modalNavigate } = useModalNavigate()
  const { balanceExchange, selectedToken, onSelectAmount } = useModalState<TTokenState>()
  const [inputTokenAmount, setInputTokenAmount] = useState<string>('')
  const [inputUsdAmount, setInputUsdAmount] = useState<string>('')
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const parsedInputTokenAmount = parseNumberOrZero(inputTokenAmount)
  const parsedInputUsdAmount = parseNumberOrZero(inputUsdAmount)
  const fiatEstimated =
    parsedInputTokenAmount *
    BalanceHelper.getExchangeRatio(selectedToken.token.hash, selectedToken.blockchain, balanceExchange.exchange.data)
  const tokenEstimated = parsedInputUsdAmount > 0 ? selectedAmount : 0
  const balanceAfterTransaction = selectedToken.amountNumber - selectedAmount

  const handleTokenAmountBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTokenAmount(event.target.value)
    setInputUsdAmount('')
    setSelectedAmount(parseNumberOrZero(event.target.value))
  }

  const handleUsdAmountBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUsdAmount(event.target.value)
    setInputTokenAmount('')
    const usdParsed = parseNumberOrZero(event.target.value)
    const tokenAmount =
      usdParsed /
      BalanceHelper.getExchangeRatio(selectedToken.token.hash, selectedToken.blockchain, balanceExchange.exchange.data)
    setSelectedAmount(tokenAmount)
  }

  const handleChangeTokenAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTokenAmount(event.target.value)
  }

  const handleUsdBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUsdAmount(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur()
    }
  }

  const selectAmount = () => {
    if (!selectedAmount) {
      return
    }
    onSelectAmount(selectedAmount)
    modalNavigate(-1)
  }

  const inputMaxAmount = () => {
    setInputTokenAmount(selectedToken.amount)
    setInputUsdAmount('')
    setSelectedAmount(selectedToken.amountNumber)
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbStepOut />}>
      <section className="w-full flex flex-col h-full items-center">
        <div className="flex w-full items-center justify-between bg-gray-900/50 rounded-full px-3 h-8">
          <div className="flex">
            <div className="rounded-lg bg-gray-300 w-4.5 h-4.5 flex justify-center items-center">
              <BlockchainIcon blockchain={selectedToken.blockchain} type="white" className="w-2.5 h-2.5" />
            </div>
            <span className="pl-2" title={selectedToken.token.symbol}>
              {StringHelper.truncateString(selectedToken.token.symbol, 4)}
            </span>
          </div>
          <span className="text-gray-100">{selectedToken.amount}</span>
        </div>
        <span className="w-full text-left text-gray-100 pt-5">{t('enterTokenAmount')}</span>
        <div className="w-full flex pt-3">
          <Input
            onBlur={handleTokenAmountBlur}
            onChange={handleChangeTokenAmount}
            onKeyDown={handleKeyDown}
            type="number"
            value={inputTokenAmount}
            placeholder={t('inputPlaceholder')}
            compacted
            className="w-full mx-auto rounded-e-none"
            clearable={true}
          />
          <Button
            clickableProps={{
              className: 'rounded-l-none',
            }}
            onClick={inputMaxAmount}
            colorSchema="gray"
            flat={true}
            type="submit"
            label={t('max')}
          />
        </div>
        <div className="w-full flex justify-between mt-4 italic">
          <span className="text-gray-300">{t('fiatValue')}</span>
          <span className="text-gray-100">{FilterHelper.currency(fiatEstimated)}</span>
        </div>
        <div className="w-full relative pt-10">
          <Separator />
          <span
            className="
                  absolute top-1/2 left-1/2 rounded-full w-11 h-11
                  transform -translate-x-1/2 -translate-y-1/2 mt-[1.2rem] 
                  items-center justify-center flex font-bold
                  border-[0.5rem] border-gray-800
                  bg-gray-100 text-gray-800"
          >
            {t('or')}
          </span>
        </div>
        <div className="w-full flex justify-between mt-10">
          <span className="text-gray-100">{t('enterUsdAmount')}</span>
          <div className="flex items-center text-neon">
            <TbArrowBigDown className="w-5 h-5" />
            <span className="leading-[0.2rem]">{t('roundDown')}</span>
          </div>
        </div>
        <div className="w-full mt-3">
          <Input
            onBlur={handleUsdAmountBlur}
            onChange={handleUsdBlur}
            onKeyDown={handleKeyDown}
            type="number"
            value={inputUsdAmount}
            placeholder={t('inputPlaceholder')}
            compacted
            className="w-full"
            clearable={true}
          />
        </div>
        <div className="w-full flex justify-between mt-4 italic">
          <span className="text-gray-300">{t('tokenValue')}</span>
          <span className="text-gray-100">
            <span className="mr-1">{tokenEstimated}</span>
            {StringHelper.truncateString(selectedToken.token.symbol, 4)}
          </span>
        </div>
        <div className="w-full relative pt-8">
          <Separator />
        </div>
        <div className="w-full flex justify-between mt-8">
          <span className="text-gray-300">{t('balanceAfterTransaction')}</span>
          <div className="text-gray-100 italic">
            <span>{balanceAfterTransaction}</span>
            <span className="ml-1">{StringHelper.truncateString(selectedToken.token.symbol, 4)}</span>
          </div>
        </div>
        {selectedToken.amountNumber < parsedInputTokenAmount && (
          <div className="w-full h-11 rounded flex items-center justify-center bg-magenta-700 mt-5">
            <TbAlertTriangle className="text-magenta w-6 h-6" />
            <span className="text-sm pl-4">{t('insufficientBalanceAvailable')}</span>
          </div>
        )}
        <Button
          className="w-[16rem] mt-8"
          type="submit"
          label={t('selectAmountSend')}
          onClick={selectAmount}
          disabled={selectedAmount === 0}
        />
      </section>
    </EndModalLayout>
  )
}
