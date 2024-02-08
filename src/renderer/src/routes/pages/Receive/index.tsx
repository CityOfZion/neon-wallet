import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbStepInto } from 'react-icons/tb'
import { IAccountState } from '@renderer/@types/store'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { ContentLayout } from '@renderer/layouts/ContentLayout'

import { SelectAccount } from '../Send/SelectAccount'

import { SelectYourReceivingAddress } from './SelectYourReceivingAddress'

enum ETabbarOption {
  YOUR_ADDRESS = 1,
  REQUEST_TOKENS = 2,
}

export const ReceiveYourAddress = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'receive' })
  const [selectedTabbarOption, setSelectedTabbarOption] = useState(ETabbarOption.YOUR_ADDRESS)
  const [selectedAccount, setSelectedAccount] = useState<IAccountState>()

  return (
    <ContentLayout title={t('title')} titleIcon={<TbStepInto />}>
      <section className="bg-gray-800 h-full w-full flex rounded text-xs">
        <div className="w-full px-4 flex flex-col items-center">
          <div className="flex flex-row justify-between h-15 w-fit text-1xs">
            <button
              className={StyleHelper.mergeStyles('w-44 border-b', {
                'border-b-2': selectedTabbarOption === ETabbarOption.YOUR_ADDRESS,
              })}
              onClick={() => setSelectedTabbarOption(ETabbarOption.YOUR_ADDRESS)}
            >
              {t('yourAddressTabTitle')}
            </button>
            <button
              className={StyleHelper.mergeStyles('w-44 border-b', {
                'border-b-2': selectedTabbarOption === ETabbarOption.REQUEST_TOKENS,
              })}
              onClick={() => setSelectedTabbarOption(ETabbarOption.REQUEST_TOKENS)}
              disabled
            >
              {t('requestTokenTabTitle')}
            </button>
          </div>
          <Separator />
          <section className="overflow-y-auto flex flex-col basis-0 flex-grow items-center py-10">
            <div className="relative">
              <div className="bg-gray-700 bg-opacity-60 flex flex-col w-[30rem] rounded">
                <SelectAccount
                  selectedAccount={selectedAccount}
                  onSelectAccount={setSelectedAccount}
                  active
                  title={t('receivingAccountTitle')}
                  modalTitle={t('selectAccountModal.title')}
                  buttonLabel={t('selectAccountModal.selectReceivingAccount')}
                  leftIcon={<TbStepInto />}
                />
              </div>
              <SelectYourReceivingAddress account={selectedAccount} />
            </div>
          </section>
        </div>
      </section>
    </ContentLayout>
  )
}
