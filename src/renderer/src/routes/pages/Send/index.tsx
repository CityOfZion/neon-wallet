import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbArrowDown, TbStepOut } from 'react-icons/tb'
import { TokenBalance } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBalancesAndExchange } from '@renderer/hooks/useBalancesAndExchange'
import { ContentLayout } from '@renderer/layouts/ContentLayout'

import { Recipient } from './Recipient'
import { SelectAccount } from './SelectAccount'
import { SelectToken } from './SelectToken'
import { SendAmount } from './SendAmount'
import { TokenBalanceList } from './TokenBalanceList'
import { TotalFee } from './TotalFee'

enum SendPageStep {
  SelectAccount = 1,
  SelectToken = 2,
  SelectAmount = 3,
  SelectContact = 4,
}

export const SendPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })
  const { accounts } = useAccountsSelector()
  const balanceExchange = useBalancesAndExchange(accounts[0])
  const [selectedAccount, setSelectedAccount] = useState<IAccountState>()
  const [selectedToken, setSelectedToken] = useState<TokenBalance | null>()
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<SendPageStep>(SendPageStep.SelectAccount)

  const handleSelectAccount = account => {
    setSelectedAccount(account)
    setSelectedToken(null)
    setCurrentStep(SendPageStep.SelectToken)
  }

  const handleSelectToken = token => {
    setSelectedToken(token)
    setCurrentStep(SendPageStep.SelectAmount)
  }

  const handleSelectAmount = amount => {
    setSelectedAmount(amount)
    setCurrentStep(SendPageStep.SelectContact)
  }

  const defineStepColor = (step: SendPageStep) => {
    if (currentStep < step) {
      return 'text-gray-100'
    }
    if (currentStep === step) {
      return 'text-neon'
    }
    return ''
  }

  return (
    <ContentLayout title={t('title')} titleIcon={<TbStepOut />}>
      <section className="bg-gray-800 h-full w-full flex rounded text-xs">
        <aside className="w-[25%] border-r border-gray-300/15 flex flex-col">
          <div className="px-4">
            <h1 className="text-white my-4">{t('leftSideTitle')}</h1>
            <Separator />
          </div>
          <TokenBalanceList balanceExchange={balanceExchange} />
        </aside>
        <div className="w-[75%] px-4 flex flex-col">
          <h1 className="text-white my-4">{t('rightSideTitle')}</h1>
          <Separator />
          <section className="overflow-y-auto flex flex-col basis-0 flex-grow items-center py-10">
            <div className="relative">
              <div className="bg-gray-300 bg-opacity-30 flex flex-col w-[30rem] rounded">
                <SelectAccount
                  selectedAccount={selectedAccount}
                  onSelectAccount={handleSelectAccount}
                  active={currentStep === SendPageStep.SelectAccount}
                />
                <SelectToken
                  selectedAccount={selectedAccount}
                  selectedToken={selectedToken}
                  onSelectToken={handleSelectToken}
                  active={currentStep === SendPageStep.SelectToken}
                  textColor={defineStepColor(SendPageStep.SelectToken)}
                />
                <SendAmount
                  selectedAccount={selectedAccount}
                  selectedToken={selectedToken}
                  selectedAmount={selectedAmount}
                  onSelectAmount={handleSelectAmount}
                  active={currentStep === SendPageStep.SelectAmount}
                />
              </div>
              <Recipient />
              <div
                className="
                  absolute top-1/2 left-1/2 
                  transform -translate-x-1/2 -translate-y-1/2 mt-6 
                  border-[0.5rem] border-gray-800 rounded-full
                "
              >
                <TbArrowDown className="w-5 h-5 p-[0.1rem] bg-gray-600 rounded-full" />
              </div>
            </div>
            <TotalFee />
            <Button className="mt-10 w-[16rem]" type="submit" label={t('sendNow')} leftIcon={<TbStepOut />} disabled />
          </section>
        </div>
      </section>
    </ContentLayout>
  )
}
