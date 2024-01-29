import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbStepInto, TbUsers } from 'react-icons/tb'
import { TContactAddress } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

export const Recipient = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'send' })
  const { modalNavigateWrapper } = useModalNavigate()
  const [address, setAddress] = useState<string>()

  const handleSelectContact = (selectedAddress: TContactAddress) => {
    setAddress(selectedAddress.address)
  }

  const handleChangeAddres = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value)
  }

  return (
    <div className="bg-gray-300 bg-opacity-30 flex flex-col w-[30rem] rounded mt-2">
      <div className="flex justify-between h-11 p-3">
        <div className="flex items-center">
          <TbStepInto className="text-blue w-5 h-5 mr-3 ml-1" />
          <span>{t('recipientAddress')}</span>
        </div>
        <Button
          className="flex items-center"
          onClick={modalNavigateWrapper('select-contact', {
            state: {
              handleSelectContact: handleSelectContact,
            },
          })}
          variant="text"
          label={t('contacts')}
          leftIcon={<TbUsers />}
          flat
        />
      </div>
      <div className="px-3">
        <Separator />
      </div>
      <div className="py-4">
        <Input
          value={address}
          onChange={handleChangeAddres}
          compacted
          className="w-[24rem] mx-auto"
          placeholder={t('addressInputHint')}
          clearable={true}
        />
      </div>
    </div>
  )
}
