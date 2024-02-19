import { Fragment, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbArrowDown, TbEye, TbStepOut } from 'react-icons/tb'
import { Account, BlockchainService, isCalculableFee } from '@cityofzion/blockchain-service'
import { TokenBalance } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { DoraHelper } from '@renderer/helpers/DoraHelper'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useEncryptedPasswordSelector } from '@renderer/hooks/useSettingsSelector'
import { ContentLayout } from '@renderer/layouts/ContentLayout'

import { Recipient } from './Recipient'
import { SelectAccount } from './SelectAccount'
import { SelectToken } from './SelectToken'
import { SendAmount } from './SendAmount'
import { TotalFee } from './TotalFee'

enum SendPageStep {
  SelectAccount = 1,
  SelectToken = 2,
  SelectAmount = 3,
  SelectContact = 4,
  Send = 5,
}

type TSendServiceResult = {
  serviceAccount: Account
  service: BlockchainService
  token: TokenBalance
}

export const SendPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })
  const { bsAggregatorRef } = useBsAggregatorSelector()
  const { encryptedPasswordRef } = useEncryptedPasswordSelector()
  const { modalNavigate } = useModalNavigate()

  const [selectedAccount, setSelectedAccount] = useState<IAccountState>()
  const [selectedToken, setSelectedToken] = useState<TokenBalance | null>()
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [selectedRecipient, setSelectedRecipient] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<number>(SendPageStep.SelectAccount)
  const [totalFee, setTotalFee] = useState<string>('0.00')

  const handleSelectAccount = (account: IAccountState) => {
    setSelectedAccount(account)
    setSelectedToken(null)
    setSelectedAmount(0)
    setSelectedRecipient('')
    setCurrentStep(SendPageStep.SelectToken)
  }

  const handleSelectToken = (token: TokenBalance) => {
    setSelectedToken(token)
    setSelectedAmount(0)
    setSelectedRecipient('')
    setCurrentStep(SendPageStep.SelectAmount)
  }

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount)
    setSelectedRecipient('')
    setCurrentStep(SendPageStep.SelectContact)
  }

  const handleSelectRecipientAddress = (recipientAddress: string) => {
    setSelectedRecipient(recipientAddress)
    if (recipientAddress === '') {
      setCurrentStep(SendPageStep.SelectContact)
    } else {
      setCurrentStep(SendPageStep.Send)
    }
  }

  const getSendService = useCallback(async (): Promise<TSendServiceResult | null> => {
    if (!selectedAccount || !selectedToken || !selectedAmount || !selectedRecipient || !selectedAccount.encryptedKey) {
      return null
    }

    const service = bsAggregatorRef.current.getBlockchainByName(selectedAccount.blockchain)

    const key = await window.api.decryptBasedEncryptedSecret(selectedAccount.encryptedKey, encryptedPasswordRef.current)
    if (!key) throw new Error(t('error.decryptKey'))
    const serviceAccount = service.generateAccountFromKey(key)
    return {
      serviceAccount: serviceAccount,
      service: service,
      token: selectedToken,
    }
  }, [bsAggregatorRef, encryptedPasswordRef, selectedAccount, selectedAmount, selectedRecipient, selectedToken, t])

  const populateTotalFee = useCallback(async () => {
    const sendService = await getSendService()
    if (!sendService) {
      return
    }
    if (!isCalculableFee(sendService.service)) {
      return
    }
    const fee = await sendService.service.calculateTransferFee({
      senderAccount: sendService.serviceAccount,
      intent: {
        receiverAddress: selectedRecipient,
        tokenHash: sendService.token.token.hash,
        amount: selectedAmount.toString(),
        tokenDecimals: sendService.token.token.decimals,
      },
    })
    setTotalFee(fee)
  }, [getSendService, selectedAmount, selectedRecipient])

  const showTransactionStatus = (hash: string) => {
    window.open(DoraHelper.buildTransactionUrl(hash), '_blank')
  }

  const handleSendToken = async () => {
    const sendService = await getSendService()
    if (!sendService) {
      return
    }
    if (!isCalculableFee(sendService.service)) {
      return
    }
    try {
      const transactionHash = await sendService.service.transfer({
        senderAccount: sendService.serviceAccount,
        intent: {
          receiverAddress: selectedRecipient,
          tokenHash: sendService.token.token.hash,
          amount: selectedAmount.toString(),
          tokenDecimals: sendService.token.token.decimals,
        },
      })
      if (!transactionHash) {
        showErrorModal()
      } else {
        showSuccessModal(transactionHash)
      }
    } catch {
      showErrorModal()
    }
  }

  const showSuccessModal = (transactionHash: string) => {
    modalNavigate('success', {
      state: {
        heading: t('title'),
        headingIcon: <TbStepOut />,
        subtitle: t('sendSuccess.title'),
        content: (
          <Fragment>
            <div className="flex w-full justify-center mt-16">
              <Button
                className="w-[11rem]"
                type="submit"
                label={t('viewStatus')}
                leftIcon={<TbEye />}
                onClick={() => {
                  showTransactionStatus(transactionHash)
                }}
              />
            </div>
          </Fragment>
        ),
      },
    })
  }

  const showErrorModal = () => {
    modalNavigate('error', {
      state: {
        heading: t('title'),
        headingIcon: <TbStepOut />,
        subtitle: t('sendFail.title'),
        description: t('sendFail.subtitle'),
      },
    })
  }

  useEffect(() => {
    populateTotalFee()
  }, [populateTotalFee])

  return (
    <ContentLayout title={t('title')} titleIcon={<TbStepOut />}>
      <section className="bg-gray-800 h-full w-full flex flex-col px-4 rounded text-xs">
        <h1 className="text-white my-4">{t('rightSideTitle')}</h1>
        <Separator />
        <section className="flex flex-col items-center py-10">
          <div className="relative">
            <div className="bg-gray-300 bg-opacity-30 flex flex-col w-[30rem] rounded">
              <SelectAccount
                selectedAccount={selectedAccount}
                onSelectAccount={handleSelectAccount}
                active={currentStep === SendPageStep.SelectAccount}
                title={t('sourceAccount')}
                modalTitle={t('selectAccountModal.title')}
                buttonLabel={t('selectAccountModal.selectSourceAccount')}
                leftIcon={<TbStepOut />}
              />
              <div className="px-3">
                <Separator />
              </div>
              <SelectToken
                selectedAccount={selectedAccount}
                selectedToken={selectedToken}
                onSelectToken={handleSelectToken}
                active={currentStep === SendPageStep.SelectToken}
              />
              <SendAmount
                selectedAccount={selectedAccount}
                selectedToken={selectedToken}
                selectedAmount={selectedAmount}
                onSelectAmount={handleSelectAmount}
                active={currentStep === SendPageStep.SelectAmount}
              />
            </div>
            <Recipient
              selectedToken={selectedToken}
              selectedAddress={selectedRecipient}
              active={currentStep === SendPageStep.SelectContact || currentStep === SendPageStep.Send}
              onSelectRecipient={handleSelectRecipientAddress}
            />
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
          <TotalFee totalFee={totalFee} />
          <Button
            className="mt-10 w-[16rem]"
            onClick={handleSendToken}
            label={t('sendNow')}
            leftIcon={<TbStepOut />}
            disabled={currentStep === SendPageStep.Send ? false : true}
          />
        </section>
      </section>
    </ContentLayout>
  )
}
