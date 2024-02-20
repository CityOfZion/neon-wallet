import { useTranslation } from 'react-i18next'
import { TbStepInto } from 'react-icons/tb'
import { IAccountState } from '@renderer/@types/store'

import { SelectAccount } from '../Send/SelectAccount'

import { SelectYourReceivingAddress } from './SelectYourReceivingAddress'

type TProps = {
  selectedAccount?: IAccountState
  onSelectAccount: (contact: IAccountState) => void
}

export const YourAddressTabContent = ({ onSelectAccount, selectedAccount }: TProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'receive' })

  return (
    <section className="overflow-y-auto flex flex-col basis-0 flex-grow items-center pt-9">
      <div className="relative">
        <div className="bg-gray-700 bg-opacity-60 flex flex-col w-[30rem] rounded">
          <SelectAccount
            selectedAccount={selectedAccount}
            onSelectAccount={onSelectAccount}
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
  )
}
