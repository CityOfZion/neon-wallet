import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbPlus } from 'react-icons/tb'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { TContactAddress } from '@renderer/@types/store'
import { BlockchainSelection } from '@renderer/components/BlockchainSelection'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocationState = {
  contactName: string
  handleAddAddress: (address: TContactAddress) => void
}

export const AddAddressModalStep1 = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'addAddressStep1' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'general' })
  const { contactName, handleAddAddress } = useModalState<TLocationState>()
  const { modalNavigate } = useModalNavigate()

  const [selectedBlockchain, setSelectedBlockchain] = useState<TBlockchainServiceKey>()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    modalNavigate('add-address-step2', {
      state: {
        contactName: contactName,
        contactBlockchain: selectedBlockchain,
        handleAddAddress,
      },
    })
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbPlus />} withBackButton>
      <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-5">
          <div>
            <div className="text-gray-100 font-bold pb-2">{t('addToContact')}</div>
            <Input value={contactName} compacted readOnly />
          </div>

          <div>{t('selectBlockchain')}</div>

          <BlockchainSelection selected={selectedBlockchain} onSelect={setSelectedBlockchain} />
        </div>

        <Button label={commonT('next')} className="w-full" type="submit" disabled={!selectedBlockchain} flat />
      </form>
    </EndModalLayout>
  )
}
