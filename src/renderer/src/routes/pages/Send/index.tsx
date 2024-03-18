import { Fragment, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbArrowDown, TbEye, TbStepOut } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'
import { Account, BlockchainService, hasNameService, isCalculableFee } from '@cityofzion/blockchain-service'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { TokenBalance } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Separator } from '@renderer/components/Separator'
import { DoraHelper } from '@renderer/helpers/DoraHelper'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useEncryptedPasswordSelector, useNetworkTypeSelector } from '@renderer/hooks/useSettingsSelector'
import { ContentLayout } from '@renderer/layouts/ContentLayout'
import debounce from 'lodash/debounce'

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
  const { bsAggregator } = useBsAggregator()
  const { encryptedPasswordRef } = useEncryptedPasswordSelector()
  const { modalNavigate } = useModalNavigate()
  const { networkType } = useNetworkTypeSelector()
  const { state } = useLocation()

  const [selectedAccount, setSelectedAccount] = useState<IAccountState>(state?.account)
  const [selectedToken, setSelectedToken] = useState<TokenBalance | null>()
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [selectedRecipient, setSelectedRecipient] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<number>(SendPageStep.SelectAccount)
  const [totalFee, setTotalFee] = useState<string>('0.00')
  const [validating, setValidating] = useState(false)
  const [nsAddress, setNsAddress] = useState<string | undefined>()
  const [isAddressValid, setIsAddressValid] = useState<boolean | undefined>()

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
    setIsAddressValid(undefined)
    setNsAddress(undefined)

    validateAddressOrNSS(recipientAddress, selectedAccount.blockchain)
    setSelectedRecipient(recipientAddress)

    if (recipientAddress === '') {
      setCurrentStep(SendPageStep.SelectContact)
    } else {
      setCurrentStep(SendPageStep.Send)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateAddressOrNSS = useCallback(
    debounce(async (recipientAddress: string, blockchain?: TBlockchainServiceKey) => {
      if (!blockchain) return

      setValidating(true)
      let isValid = false

      try {
        const blockchainService = bsAggregator.getBlockchainByName(blockchain)
        isValid = blockchainService.validateAddress(recipientAddress)

        if (
          !isValid &&
          hasNameService(blockchainService) &&
          blockchainService.validateNameServiceDomainFormat(recipientAddress)
        ) {
          const nnsAddress = await blockchainService.resolveNameServiceDomain(recipientAddress)

          if (nnsAddress) {
            isValid = true
            setNsAddress(nnsAddress)
            setIsAddressValid(true)
          } else {
            setIsAddressValid(false)
          }
        } else {
          setIsAddressValid(isValid)
        }
      } catch {
        // empty block
      } finally {
        setValidating(false)
      }
    }, 1000),
    [bsAggregator]
  )

  const getSendService = useCallback(async (): Promise<TSendServiceResult | null> => {
    if (!selectedAccount || !selectedToken || !selectedAmount || !selectedRecipient || !selectedAccount.encryptedKey) {
      return null
    }

    const service = bsAggregator.getBlockchainByName(selectedAccount.blockchain)

    const key = await window.api.decryptBasedEncryptedSecret(selectedAccount.encryptedKey, encryptedPasswordRef.current)
    if (!key) throw new Error(t('error.decryptKey'))
    const serviceAccount = service.generateAccountFromKey(key)
    return {
      serviceAccount: serviceAccount,
      service: service,
      token: selectedToken,
    }
  }, [bsAggregator, encryptedPasswordRef, selectedAccount, selectedAmount, selectedRecipient, selectedToken, t])

  const populateTotalFee = useCallback(async () => {
    if (validating || !isAddressValid) return

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
        receiverAddress: nsAddress || selectedRecipient,
        tokenHash: sendService.token.token.hash,
        amount: selectedAmount.toString(),
        tokenDecimals: sendService.token.token.decimals,
      },
    })
    setTotalFee(fee)
  }, [getSendService, selectedAmount, selectedRecipient, nsAddress, validating, isAddressValid])

  const showTransactionStatus = (hash: string) => {
    window.open(DoraHelper.buildTransactionUrl(hash, networkType), '_blank')
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
          receiverAddress: nsAddress || selectedRecipient,
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
      <section className="bg-gray-800 h-full w-full flex flex-col px-4 rounded text-sm items-center">
        <h2 className="text-white text-left w-full  mt-4 mb-3">{t('rightSideTitle')}</h2>

        <Separator />

        <div className="max-w-[32rem] w-full flex flex-col items-center py-10">
          <div className="bg-gray-700/60 flex flex-col rounded px-3 w-full">
            <SelectAccount
              selectedAccount={selectedAccount}
              onSelectAccount={handleSelectAccount}
              active={currentStep === SendPageStep.SelectAccount}
              title={t('sourceAccount')}
              modalTitle={t('selectAccountModal.title')}
              buttonLabel={t('selectAccountModal.selectSourceAccount')}
              leftIcon={<TbStepOut />}
            />

            <Separator />

            <SelectToken
              selectedAccount={selectedAccount}
              selectedToken={selectedToken}
              onSelectToken={handleSelectToken}
              active={currentStep === SendPageStep.SelectToken}
            />

            <Separator />

            <SendAmount
              selectedAccount={selectedAccount}
              selectedToken={selectedToken}
              selectedAmount={selectedAmount}
              onSelectAmount={handleSelectAmount}
              active={currentStep === SendPageStep.SelectAmount}
            />
          </div>

          <div className="relative">
            <TbArrowDown className="w-5 h-5 p-1 bg-gray-600 rounded-full border-8 border-gray-800 box-content absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          <div className="bg-gray-700/60 flex flex-col rounded px-3 w-full mt-2">
            <Recipient
              selectedToken={selectedToken}
              selectedAddress={selectedRecipient}
              active={currentStep === SendPageStep.SelectContact || currentStep === SendPageStep.Send}
              onSelectRecipient={handleSelectRecipientAddress}
              validating={validating}
              nsAddress={nsAddress}
              isAddressValid={isAddressValid}
            />
          </div>

          <div className="bg-gray-700/60 flex flex-col rounded px-3 w-full mt-2">
            <TotalFee totalFee={totalFee} />
          </div>

          <Button
            className="mt-10 w-[16rem]"
            iconsOnEdge={false}
            onClick={handleSendToken}
            label={t('sendNow')}
            leftIcon={<TbStepOut />}
            disabled={currentStep === SendPageStep.Send && isAddressValid && !validating ? false : true}
          />
        </div>
      </section>
    </ContentLayout>
  )
}
